import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistAT = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodolistAT = {
    type: "ADD-TODOLIST"
    title: string
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
// const reducer=(currentState,action)=>nextState
//const action={type:"...", payload: ...}
export type ActionType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistTitle | ChangeTodolistFiler

export const todolistsReducer = (todolists: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            const NewTodoListId = v1()
            const newTodoList: TodoListType = {
                id: NewTodoListId,
                title: action.title,
                filter: "all"
            }
            return [...todolists, newTodoList]
        case "CHANGE-TODOLIST-TITLE":
            return todolists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return todolists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default:
            return todolists
    }
}

export const RemoveTodolistAC=(id:string):RemoveTodolistAT=>({type:"REMOVE-TODOLIST", id})
export const AddTodolistAC=(title: string):AddTodolistAT=>({type: "ADD-TODOLIST", title})
export const ChangeTodolistTitleAC=(id:string, title:string):ChangeTodolistTitle=>({
    type: "CHANGE-TODOLIST-TITLE",id, title})
export const ChangeTodolistFilerAC=(id:string, filter:FilterValuesType):ChangeTodolistFiler=>({type:"CHANGE-TODOLIST-FILTER",id, filter})