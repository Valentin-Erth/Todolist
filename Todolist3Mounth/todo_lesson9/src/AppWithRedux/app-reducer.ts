
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null|string
}
export type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: LoaderActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
}
export const setAppStatusAC=(status:RequestStatusType)=>({type:"APP/SET-STATUS",status}as const)
export type setAppStatusAT=ReturnType<typeof setAppStatusAC>

export const setErrorAC=(error:string|null)=>({type:'APP/SET-ERROR',error}as const)
export type setAppErrorAT=ReturnType<typeof setErrorAC>
export type LoaderActionsType = setAppStatusAT|setAppErrorAT
