import {Dispatch} from "redux";
import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    //true когда приложениепроинициализировалиось(проверили пользовател)
    isInitialized: false
}
export type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: LoaderActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        case "APP/SET-IS-INITIALIZED":
        return {...state, isInitialized: action.value}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({type: "APP/SET-STATUS", status} as const)
export const setErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppInitializedAC = (value: boolean) => ({type: "APP/SET-IS-INITIALIZED", value} as const)
export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
        // debugger
        if (res.data.resultCode === 0) {
            dispatch(setAppInitializedAC(true))
            dispatch(setIsLoggedInAC(true));
        } else {
        }
    })
}


export type setAppInitializedAT=ReturnType<typeof setAppInitializedAC>
export type setAppStatusAT = ReturnType<typeof setAppStatusAC>
export type setAppErrorAT = ReturnType<typeof setErrorAC>
export type LoaderActionsType = setAppStatusAT | setAppErrorAT| setAppInitializedAT


