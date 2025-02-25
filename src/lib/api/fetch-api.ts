/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from 'js-cookie'

interface RequestOptions {
  body?: any
  headers?: Record<string, string>
  next?: NextFetchRequestConfig
  [key: string]: any
}

export async function api(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET',
  options: RequestOptions = {},
) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL
  const { body, headers, next, ...fetchOptions } = options

  let token = Cookies.get('user-token')

  const response = await fetch(`${baseUrl}/${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      authorization: token ? `Bearer ${token}` : '',
      'x-forwarded-host': process.env.NEXT_PUBLIC_FORWADED_HOST as string,
      ...headers,
    },
    body: body ? JSON.stringify(body) : null,
    next,
    ...fetchOptions,
  })


  if (response.status === 401) {
    // Attempt to refresh the token
    const refreshToken = Cookies.get('refresh-token')
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
            'Content-Type': 'application/json',
            authorization: token ? `Bearer ${token}` : '',
            'x-forwarded-host': process.env.NEXT_PUBLIC_FORWADED_HOST as string,
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

  // Tenta processar como JSON, mas evita erro se a resposta não for JSON
  try {
    return await response.json()
  } catch {
    return { success: true }
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

  try {
    return await response.json()
  } catch {
    return { success: true }
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
        'Content-Type': 'application/json',
        'x-forwarded-host': process.env.NEXT_PUBLIC_FORWADED_HOST as string,
      },
      body: JSON.stringify({ refreshToken }),
    })

    if (!response.ok) {
      throw new Error('Failed to refresh token')
    }

    const data = await response.json()
    const { accessToken } = data

    // Update the refresh token as well
    Cookies.set('user-token', accessToken) // expires in 15 minutes

    return { accessToken }
  } catch (error) {
    console.error('Refresh token error:', error)
    return null
  }
}
