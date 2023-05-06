import {TasksStateType} from "../App/App";
import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT, setTodolistAC, SetTodoListType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI} from "../api/todolists-api";
import {Dispatch} from "redux";


export type RemoveTasksActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type SetTasksType=ReturnType<typeof setTasksAC>
// const reducer=(currentState,action)=>nextState
//const action={type:"...", payload: ...}
export type ActionType =
    RemoveTasksActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistAT
    | RemoveTodolistAT | SetTodoListType| SetTasksType
const initialState: TasksStateType = {}
export const tasksReducer = (state: TasksStateType = initialState, action: ActionType) => {
    // debugger
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id != action.taskId)}
        case "ADD_TASK":
            // const newTask: TaskType = {
            //     id: v1(), title: action.title, status: TaskStatuses.New, todoListId: action.todolistId, startDate: "",
            //     deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: ""
           // }
            return {...state, [action.todolistId]: [action.task,
                    ...state[action.todolistId]]}
        case "CHANGE_TASK_STATUS":
            // debugger
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, status: action.status} : t)
            }
        case "CHANGE_TASK_TITLE":
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.newTitle
                } : t)
            }
        case "ADD-TODOLIST":
            return {...state, [action.todolistId]: []}
        case "REMOVE-TODOLIST":
            // const copyState = {...state}
            // delete copyState[action.id]
            const {[action.id]: [], ...rest} = {...state}
            return rest
        case "SET_TODOLISTS":
            // debugger
            const copyState={...state}// пробегаемся по массиву и создаем новое свой-во(это todoid) и значение пустой[]
            action.todoLists.forEach((td)=>{
                copyState[td.id]=[]
            })
            return copyState
        case "SET-TASKS":
            return {...state,[action.todoId]: action.tasks }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => ({type: "REMOVE-TASK", taskId, todolistId}) as const
export const addTaskAC = ( todolistId: string,task: TaskType) => ({type: "ADD_TASK", task, todolistId}) as const
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) => ({
    type: "CHANGE_TASK_STATUS",
    taskId,
    status,
    todolistId
}) as const
export const changeTaskTitleAC = (taskId: string, newTitle: string, todoListId: string) => ({
    type: "CHANGE_TASK_TITLE",
    taskId,
    newTitle,
    todoListId
}) as const


export const setTasksAC = (todoId:string, tasks:TaskType[]) => ({
    type: "SET-TASKS",
    tasks,
    todoId
    }) as const
export const getTasksTC =(todoId:string)=> (dispatch:Dispatch) => {
    // внутри санки можно делать побочные эффекты (запросы на сервер)
    todolistAPI.getTasks(todoId)
        .then((res) => {
            // и диспатчить экшены (action) или другие санки (thunk)
dispatch(setTasksAC(todoId, res.data.items))
        })
}
export const deleteTasksTC =(todoId:string,taskId:string)=> (dispatch:Dispatch) => {
    todolistAPI.deleteTask(todoId,taskId )
        .then((res) => {
            debugger
            dispatch(removeTaskAC(taskId,todoId))
        })
}
export const creatTasksTC =(todoId:string,title:string)=> (dispatch:Dispatch) => {
    todolistAPI.createTask(todoId,title )
        .then((res) => {
            console.log(res.data.data.item)
            dispatch(addTaskAC(todoId,res.data.data.item))
        })
}