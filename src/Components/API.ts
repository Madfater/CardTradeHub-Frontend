import axios, { AxiosRequestConfig } from "axios"

const api = axios.create({
	baseURL: "https://cardshop.sub.jeff3.win/api",
  timeout: 5000,
})

export default api;