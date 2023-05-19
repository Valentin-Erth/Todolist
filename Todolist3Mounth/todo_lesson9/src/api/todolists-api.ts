import axios from 'axios';
import {RequestStatusType} from "../AppWithRedux/app-reducer";

// const settings = {
//     withCredentials: true,
//     headers: {
//         // Не забываем заменить API-KEY на собственный
//         'API-KEY': 'b09776ce-1fd6-481a-b2de-4833a22beba2',
//     }
// }
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true// это поле говорит что с каждым запросом цепляй куку, бэк проверяет кто я в системе
})

// api
export const todolistAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>("todo-lists")
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(
            `todo-lists/${todolistId}`, {title})
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>("todo-lists", {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksType>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}//tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<{ item: TaskType }>>(
            `todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
    createTask(todolistId: string, taskTitle: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title: taskTitle})
    }
}
export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<ResponseType<{ userId?: number }>>("auth/login", data)
    },
    me() {
        return instance.get<ResponseType<UserType>>("/auth/me")
    },
    logout() {
        return instance.delete<ResponseType>("/auth/login")
    }
}

// types
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
export enum TaskStatuses {//перечисление
    New,
    InProgress,
    Completed,
    Draft
}
export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgenty,
    Later
}
export enum ResultCode {
    OK,
    ERROR,
    ERROR_CAPTCHA
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
    entityStatus: RequestStatusType
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
type GetTasksType = {
    errror: string | null
    totalCount: number
    items: TaskType[]
}
export type ResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: []
    data: T//сделали динамическую дата
}
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
type UserType = {
    id: number
    email: string
    login: string
}