import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistAPI} from "../api/api";


export default {
    title: 'API'
}
const setting={
    withCredentials: true,
    headers: {
        'API-KEY': 'b09776ce-1fd6-481a-b2de-4833a22beba2'
    }
}
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistAPI.getTodolists().then((res)=>{
            // debugger
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title= "React"

        todolistAPI.createTodolist(title)
            .then((res)=>{
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId="b659e8f3-7ad5-4cdd-a7f5-7eb18f9de4c9"
        todolistAPI.deleteTodolist(todoId)
            .then((res)=>{
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId="2467b4ee-720e-4d94-84fb-cecdb0ab0f24";
        const title= "REDUX"

        todolistAPI.updateTodolist(todoId,title)
            .then((res)=>{
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

