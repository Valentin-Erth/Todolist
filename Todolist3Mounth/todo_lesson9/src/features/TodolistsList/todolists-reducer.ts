import {v1} from "uuid";
import {todolistAPI, TodolistType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {AppActoinsType} from "../../AppWithRedux/Store";

export const todolistsReducer = (todolists: Array<TodoListDomainType> = initialState, action: AppActoinsType): Array<TodoListDomainType> => {
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
            const newTodoList: TodoListDomainType = {...action.todolist, filter: "all"}
            return [...todolists, newTodoList]
        case "CHANGE-TODOLIST-TITLE":
            return todolists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return todolists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case "SET_TODOLISTS":
            return action.todoLists.map(el => ({...el, filter: "all"}))

        default:
            return todolists
    }
}

//actions
export const RemoveTodolistAC = (id: string) => ({type: "REMOVE-TODOLIST", id,} as const)
export const AddTodolistAC = (todolist: TodolistType) => ({type: "ADD-TODOLIST", todolist} as const)
export const ChangeTodolistTitleAC = (id: string, title: string) => ({
    type: "CHANGE-TODOLIST-TITLE",
    id,
    title
} as const)
export const ChangeTodolistFilerAC = (id: string, filter: FilterValuesType) => ({
    type: "CHANGE-TODOLIST-FILTER",
    id,
    filter
} as const)
//action для полученных todoLists с сервера
export const setTodolistAC = (todoLists: TodolistType[]) => ({type: "SET_TODOLISTS", todoLists} as const)// защищает свой-ва объекта от изменений, мутаций. жесткая типизация не сможем перезаписать. readonly-только для чтения

//thunks
export const getTodolistTC = () => (dispatch: Dispatch<AppActoinsType>) => {
    // внутри санки можно делать побочные эффекты (запросы на сервер)
    todolistAPI.getTodolists()
        .then((res) => {
            // и диспатчить экшены (action) или другие санки (thunk)
            dispatch(setTodolistAC(res.data))
        })
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch<AppActoinsType>) => {
    todolistAPI.deleteTodolist(todolistId)
        .then((res) => {
            dispatch(RemoveTodolistAC(todolistId))
        })
}
export const createTodolistTC = (title: string) => (dispatch: Dispatch<AppActoinsType>) => {
    todolistAPI.createTodolist(title)
        .then((res) => {
            dispatch(AddTodolistAC(res.data.data.item))
        })
}
export const ChangeTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch<AppActoinsType>) => {
    todolistAPI.updateTodolist(id, title)
        .then((res) => {
            dispatch(ChangeTodolistTitleAC(id, title))
        })
}

// types
export type RemoveTodolistAT = ReturnType<typeof RemoveTodolistAC>
export type  AddTodolistAT = ReturnType<typeof AddTodolistAC>
export type ChangeTodolistTitleAT = ReturnType<typeof ChangeTodolistTitleAC>
export type ChangeTodolistFilerAT = ReturnType<typeof ChangeTodolistFilerAC>
export type SetTodoListAT = ReturnType<typeof setTodolistAC>
export type TodolistActionsType =
    RemoveTodolistAT
    | AddTodolistAT
    | ChangeTodolistTitleAT
    | ChangeTodolistFilerAT
    | SetTodoListAT
export type FilterValuesType = "all" | "active" | "completed"
export type TodoListDomainType = TodolistType & {
    filter: FilterValuesType
}
const initialState: Array<TodoListDomainType> = []