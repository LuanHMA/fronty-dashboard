/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from 'next/headers'
import Cookies from 'js-cookie'

interface RequestOptions {
  body?: any
  headers?: Record<string, string>
  next?: NextFetchRequestConfig
  [key: string]: any
}

export async function api(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  options: RequestOptions = {},
) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL
  const { body, headers, next, ...fetchOptions } = options

  let token = (await cookies()).get('user-token')?.value

  const response = await fetch(`${baseUrl}/${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'x-forwarded-host': process.env.NEXT_PUBLIC_FORWADED_HOST as string,
      authorization: token ? `Bearer ${token}` : '',
      ...headers,
    },
    body: body ? JSON.stringify(body) : null,
    next,
    ...fetchOptions,
  })

  // Handle unauthorized responses
  if (response.status === 401) {
    const refreshToken = (await cookies()).get('refresh-token')?.value
    if (refreshToken) {
      const newTokens = await refreshAccessToken(
        `${baseUrl}/auth/refresh`,
        refreshToken,
      )

      if (newTokens) {
        token = newTokens.accessToken

        // Retry the original request with the new token
        return fetchWithToken(`${baseUrl}/${url}`, method, {
          body: body ? JSON.stringify(body) : null,
          headers: {
            'x-forwarded-host': process.env.NEXT_PUBLIC_FORWADED_HOST as string,
            'Content-Type': 'application/json',
            authorization: token ? `Bearer ${token}` : '',
            ...headers,
          },
          next,
          ...fetchOptions,
        })
      }
    }
  }

  if (!response.ok) {
    throw new Error(`Failed to ${method} data from ${url}`)
  }

  // DELETE requests should return a success object
  if (method === 'DELETE') {
    return { success: true }
  }

  // Check if the response contains JSON
  const contentType = response.headers.get('content-type')
  if (contentType && contentType.includes('application/json')) {
    try {
      return await response.json()
    } catch (error) {
      console.error('Error parsing JSON response:', error)
    }
  }

  // If response is not JSON, return a success object
  return {
    success: true,
    status: response.status,
    statusText: response.statusText,
  }
}

async function fetchWithToken(
  url: string,
  method: string,
  options: RequestOptions,
) {
  const response = await fetch(url, {
    method,
    ...options,
  })

  const contentType = response.headers.get('content-type')
  if (contentType && contentType.includes('application/json')) {
    try {
      return await response.json()
    } catch (error) {
      console.error('Error parsing JSON response:', error)
    }
  }

  return {
    success: true,
    status: response.status,
    statusText: response.statusText,
  }
}

async function refreshAccessToken(
  url: string,
  refreshToken: string,
): Promise<{ accessToken: string } | null> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'x-forwarded-host': process.env.NEXT_PUBLIC_FORWADED_HOST as string,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    })

    if (!response.ok) {
      throw new Error('Failed to refresh token')
    }

    const data = await response.json()
    const { accessToken } = data

    Cookies.set('user-token', accessToken) // expires in 15 minutes

    return { accessToken }
  } catch (error) {
    console.error('Refresh token error:', error)
    return null
  }
}
