import { fetchBaseQuery } from "@reduxjs/toolkit/query"

const serverUrl = import.meta.env.VITE_SERVER_URL as string

export const apiBaseQuery = fetchBaseQuery({
  baseUrl: `${serverUrl}/api/v1`,
})
