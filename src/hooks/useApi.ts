import { api } from '@/lib/api/fetch-api'

export const useApi = () => {
  const execute = async (
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any,
  ) => {
    return await api(url, method, {
      body: data,
    })
  }

  return {
    execute,
  }
}
