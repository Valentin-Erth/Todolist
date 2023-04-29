import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolists-api";


export default {
    title: 'API'
}
const setting = {
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
        todolistAPI.getTodolists()
            .then((res) => {
                // debugger
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = "Codewars"
        todolistAPI.createTodolist(title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId = "2467b4ee-720e-4d94-84fb-cecdb0ab0f24"
        todolistAPI.deleteTodolist(todoId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId = "1923c4e0-33b2-4cf5-880f-b9024d6ef717";
        const title = "Promise"
        todolistAPI.updateTodolist(todoId, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")

    const getTask=()=>{
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }
        return <div>{JSON.stringify(state)}
            <div>
                <input placeholder={"todolistId"} value={todolistId} onChange={(e)=>{setTodolistId(e.currentTarget.value)}}/>
                <button onClick={getTask}>get task</button>
            </div>
    </div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>("")
    const [todolistId, setTodolistId] = useState<string>("")
    const deleteTask=() => {
         todolistAPI.deleteTask(todolistId,taskId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
    <div>
        <input placeholder={"todolistId"} value={todolistId} onChange={(e)=>{setTodolistId(e.currentTarget.value)}}/>
        <input placeholder={"taskId"} value={taskId} onChange={(e)=>{setTaskId(e.currentTarget.value)}}/>
        <button onClick={deleteTask}>delete task</button>
    </div>
    </div>
    }
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const createTask = () => {
        todolistAPI.createTask(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input placeholder={"title"} value={title} onChange={(e)=>{setTitle(e.currentTarget.value)}}/>
            <button onClick={createTask}>creat task</button>
        </div>
    </div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const [taskId, setTaskId] = useState<string>("")
    const [title, setTitle] = useState<string>("")

    const [descripton, setDescripton] = useState<string>("")
    const [priority, setPiority] = useState<number>(0)
    const [status, setStatus] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>("")
    const [deadline, setDeadline] = useState<string>("")

    const updateTask = () => {
        todolistAPI.updateTask(todolistId, taskId, {
            deadline: "",
            description: descripton,
            priority: priority,
            startDate: "",
            status: status,
            title:title
        })
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input placeholder={"taskId"} value={taskId} onChange={(e)=>{setTaskId(e.currentTarget.value)}}/>
            <input placeholder={"title"} value={title} onChange={(e)=>{setTitle(e.currentTarget.value)}}/>
            <input placeholder={"Descripton"} value={descripton} onChange={(e)=>{setDescripton(e.currentTarget.value)}}/>
            <input placeholder={"status"} type={"number"} value={status} onChange={(e)=>{setStatus(+e.currentTarget.value)}}/>
            <input placeholder={"priority"} type={"number"} value={priority} onChange={(e)=>{setPiority(+e.currentTarget.value)}}/>
            <button onClick={updateTask}>update task</button>
        </div>
    </div>
}