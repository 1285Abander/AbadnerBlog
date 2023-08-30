import axios, { InternalAxiosRequestConfig, AxiosResponse, Method, RawAxiosRequestHeaders } from "axios";

axios.defaults.baseURL = "http://localhost:8888/"
/* axios.defaults.baseURL = "http://120.26.44.158:8888/" */
axios.defaults.timeout = 6000

axios.interceptors.request.use((config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    (window as any).changeLoading("open")
    return config
}, (err: any) => {
    Promise.reject("拦截失败")
})

axios.interceptors.response.use((data: AxiosResponse): AxiosResponse => {
    (window as any).changeLoading("close")
    return data
})

let http: HttpType.MyHttpFun<Method, HttpType.MyHttpData, RawAxiosRequestHeaders> = (url, method = "get", data, headers) => {
    return axios({
        url,
        method,
        data: method !== "get" ? data : null,
        params: method === "get" ? data : null,
        headers
    })
}

export default http;