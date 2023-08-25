declare namespace HttpType {
    interface MyHttpData {
        [key: string]: any
    }
    type MyHttpFun<T, U, I> = (url: string, method?: T, data?: U, headers?: I) => Promise<any>
}
type ContentType = 'text/html' | 'text/plain' | 'multipart/form-data' | 'application/json' | 'application/x-www-form-urlencoded' | 'application/octet-stream'