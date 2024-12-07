import axios, { AxiosError, AxiosResponse } from "axios"

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH"

export const commonAPI = async<T>(
    httpMethod: HttpMethod,
    url: string,
    reqBody?: T,
    reqHeader?: Record<string, string>): Promise<AxiosResponse | AxiosError> => {

    const reqConfig = {
        method:httpMethod,
        url,
        data:reqBody,
        headers:reqHeader?reqHeader:{'Content-Type':'application/json'}
    }

    return await axios(reqConfig).then((res)=>{
        return res
    }).catch((err)=>{
        return err
    })
}