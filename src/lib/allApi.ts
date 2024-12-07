import { baseUrl } from "./baseUrl"
import { commonAPI } from "./commonAPI"

export interface QuestionBody {
    question: string,
    optionA: string,
    optionB: string,
    optionC: string,
    optionD: string,
    answer: string,
    category: string
}

export interface RegisterReqBody{
    email:string,
    password:string
}

export interface ReqHeader {
    [key: string]: string; 
}

export const registerAPI = async (reqBody: RegisterReqBody) => {
    return await commonAPI('POST', `${baseUrl}/register`, reqBody)
}

export const loginAPI = async (reqBody: RegisterReqBody) => {
    return await commonAPI('POST', `${baseUrl}/login`, reqBody)
}

export const addQuestionAPI = async (reqBody: QuestionBody,reqHeader:ReqHeader) => {
    return await commonAPI('POST', `${baseUrl}/add-question`, reqBody,reqHeader)
}

export const getQuestionsAPI = async (reqBody: { selectedCategory: string }) => {
    return await commonAPI('POST', `${baseUrl}/get-questions`, reqBody)
}