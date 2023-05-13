import {v1} from "uuid";
import {ResultCode, todolistAPI, TodolistType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {AppActoinsType, AppThunk} from "../../AppWithRedux/Store";
import {RequestStatusType, setAppStatusAC, setErrorAC} from "../../AppWithRedux/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

export const todolistsReducer = (todolists: Array<TodoListDomainType> = initialState, action: TodolistActionsType): Array<TodoListDomainType> => {
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
            const newTodoList: TodoListDomainType = {...action.todolist, filter: "all",entityStatus:"idle"}
            return [...todolists, newTodoList]
        case "CHANGE-TODOLIST-TITLE":
            return todolists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return todolists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case "SET_TODOLISTS":
            return action.todoLists.map(el => ({...el, filter: "all",entityStatus:"idle"}))
        case "CHANGE-TODOLIST-ENTITY-STATUS":
            return todolists.map(tl=>tl.id === action.id?{...tl,entityStatus:action.status}:tl)
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
export const changeTodolistEntityStatusAC=(id: string,status:RequestStatusType)=>({type:"CHANGE-TODOLIST-ENTITY-STATUS",id,status}as const)

//thunks
//через async/await
export const getTodolistTC = (): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC("loading"))
        const res = await todolistAPI.getTodolists()
        dispatch(setTodolistAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e:any) {
        throw new Error(e)
    }
}
//через then
export const _getTodolistTC = () => (dispatch: Dispatch<AppActoinsType>) => {
    // внутри санки можно делать побочные эффекты (запросы на сервер)
    todolistAPI.getTodolists()
        .then((res) => {
            // и диспатчить экшены (action) или другие санки (thunk)
            // debugger
            dispatch(setTodolistAC(res.data))
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error)
        })
}

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch<AppActoinsType>) => {
    dispatch(setAppStatusAC("loading"))
    dispatch(changeTodolistEntityStatusAC(todolistId,"loading"))
    todolistAPI.deleteTodolist(todolistId)
        .then((res) => {
            if (res.data.resultCode === ResultCode.OK) {
                dispatch(RemoveTodolistAC(todolistId))
                dispatch(setAppStatusAC('succeeded'))
            }else{
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((error)=>{
            handleServerNetworkError(dispatch, error)
        })
}
export const createTodolistTC = (title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    todolistAPI.createTodolist(title)
        .then((res) => {
            // debugger
            if (res.data.resultCode === ResultCode.OK) {
                // dispatch(getTodolistTC())
                dispatch(AddTodolistAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            }else{
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((error)=>{
            handleServerNetworkError(dispatch, error)
        })
}
export const ChangeTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch<AppActoinsType>) => {
    dispatch(setAppStatusAC("loading"))
    todolistAPI.updateTodolist(id, title)
        .then((res) => {
            if (res.data.resultCode === ResultCode.OK) {
                dispatch(ChangeTodolistTitleAC(id, title))
                dispatch(setAppStatusAC("loading"))
            }else{
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((error)=>{
            handleServerNetworkError(dispatch, error)
        })
}

// types
export type RemoveTodolistAT = ReturnType<typeof RemoveTodolistAC>
export type  AddTodolistAT = ReturnType<typeof AddTodolistAC>
export type ChangeTodolistTitleAT = ReturnType<typeof ChangeTodolistTitleAC>
export type ChangeTodolistFilerAT = ReturnType<typeof ChangeTodolistFilerAC>
export type SetTodoListAT = ReturnType<typeof setTodolistAC>
export type changeTodolistEntityStatusAT=ReturnType<typeof changeTodolistEntityStatusAC>
export type TodolistActionsType =
    RemoveTodolistAT
    | AddTodolistAT
    | ChangeTodolistTitleAT
    | ChangeTodolistFilerAT
    | SetTodoListAT
    |changeTodolistEntityStatusAT
export type FilterValuesType = "all" | "active" | "completed"
export type TodoListDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
const initialState: Array<TodoListDomainType> = []