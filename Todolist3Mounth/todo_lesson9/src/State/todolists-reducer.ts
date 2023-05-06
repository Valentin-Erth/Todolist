import {v1} from "uuid";
import {todolistAPI, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";


export type RemoveTodolistAT = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type  AddTodolistAT = {
    type: "ADD-TODOLIST"
    todolist: TodolistType
}
export type ChangeTodolistTitle = {
    type: "CHANGE-TODOLIST-TITLE"
    title: string
    id: string
}
export type ChangeTodolistFiler = {
    type: "CHANGE-TODOLIST-FILTER"
    filter: FilterValuesType
    id: string
}
export type SetTodoListType = ReturnType<typeof setTodolistAC>
// const reducer=(currentState,action)=>nextState
//const action={type:"...", payload: ...}
export type ActionType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistTitle | ChangeTodolistFiler | SetTodoListType
export type FilterValuesType = "all" | "active" | "completed"
export type TodoListDomainType = TodolistType & {
    filter: FilterValuesType
}
const initialState: Array<TodoListDomainType> = []
export const todolistsReducer = (todolists: Array<TodoListDomainType> = initialState, action: ActionType): Array<TodoListDomainType> => {
    // debugger
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            // const newTodoList: TodoListDomainType = {
            //     id: action.todolistId,
            //     title: action.title,
            //     filter: "all",
            //     addedDate: "",
            //     order: 0
            // }
            const newTodoList:TodoListDomainType={...action.todolist,filter: "all"}
            return [...todolists, newTodoList]
        case "CHANGE-TODOLIST-TITLE":
            return todolists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return todolists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case "SET_TODOLISTS":
            // debugger
            return action.todoLists.map(el => ({...el, filter: "all"}))

        default:
            return todolists
    }
}

export const RemoveTodolistAC = (id: string): RemoveTodolistAT => ({type: "REMOVE-TODOLIST", id,})
export const AddTodolistAC = (todolist: TodolistType): AddTodolistAT => ({type: "ADD-TODOLIST", todolist})
export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitle => ({
    type: "CHANGE-TODOLIST-TITLE", id, title
})
export const ChangeTodolistFilerAC = (id: string, filter: FilterValuesType): ChangeTodolistFiler => ({
    type: "CHANGE-TODOLIST-FILTER",
    id,
    filter
})

type _SetTodoListType = {
    type: "SET_TODOLISTS"
    todoLists: TodolistType[]
}
//создали action для полученных todoLists с сервера
export const setTodolistAC = (todoLists: TodolistType[]) => {
    return {
        type: "SET_TODOLISTS",
        todoLists
    } as const// защищает свой-ва объекта от изменений, мутаций. жесткая типизация не сможем перезаписать. readonly-только для чтения
}
export const getTodolistTC = () => (dispatch: Dispatch) => {
    // внутри санки можно делать побочные эффекты (запросы на сервер)
    todolistAPI.getTodolists()
        .then((res) => {
            // и диспатчить экшены (action) или другие санки (thunk)
            dispatch(setTodolistAC(res.data))
        })
}
export const removeTodolistTC = (todolistId:string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTodolist(todolistId)
        .then((res) => {
            dispatch(RemoveTodolistAC(todolistId))
        })
}
export const createTodolistTC = (title:string) => (dispatch: Dispatch) => {
    todolistAPI.createTodolist(title)
        .then((res) => {
            dispatch(AddTodolistAC(res.data.data.item))
        })
}
export const ChangeTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI.updateTodolist(id, title)
        .then((res) => {
            dispatch(ChangeTodolistTitleAC(id,title))
        })
}