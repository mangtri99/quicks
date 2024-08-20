import { ofetch } from 'ofetch'

export const useApi = ofetch.create({ baseURL: import.meta.env.VITE_API_URL })
