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
            `todo-lists/${todolistId}`,{ title: title })
    },
    getTodolists(){
        return instance.get<GetTodolistType[]>("todo-lists")
    },
    createTodolist(title:string){
        return instance.post<ResponseType<{item: GetTodolistType}>>("todo-lists", {title})
    },
    deleteTodolist(todolistId:string){
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    }
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
