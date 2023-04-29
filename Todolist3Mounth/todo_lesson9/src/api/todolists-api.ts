import axios from 'axios'
import {CreateTodolist, DeleteTodolist, GetTodolists} from "../stories/todolists-api.stories";

const settings = {
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': 'b09776ce-1fd6-481a-b2de-4833a22beba2',
    },
}
const instance=axios.create({
    baseURL:'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true
})
export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(
            `todo-lists/${todolistId}`,{title})
    },
    getTodolists(){
        return instance.get<GetTodolistType[]>("todo-lists")
    },
    createTodolist(title:string){
        return instance.post<ResponseType<{item: GetTodolistType}>>("todo-lists", {title})
    },
    deleteTodolist(todolistId:string){
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    getTasks(todolistId:string){
        return instance.get<GetTasksType>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId:string, taskId: string){
        return instance.delete<ResponseType>(`todo-lists/${todolistId}//tasks/${taskId}`)
    },
    updateTask(todolistId:string, taskId: string, model:UpdateTaskModelType){
return instance.put<ResponseType>(
            `todo-lists/${todolistId}/tasks/${taskId}`,model)
    },
    createTask(todolistId:string,taskTitle:string){
        return instance.post<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks`, {title:  taskTitle})
    }
}

export type TaskType={
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskModelType={
    title: string
    description: string
    completed: boolean
    status:number
    priority:number
    startDate: string
    deadline: string|null
}
type GetTasksType={
    errror:string|null
    totalCount: number
    items: TaskType[]
}
type ResponseType<T={}>={
    resultCode: number
    messages: string[]
    data: T//сделали динамическую дата
}
type GetTodolistType={
    "id": string
    "title": string
    "addedDate": Date
    "order": number
}
