import {setAppErrorAT, setAppStatusAC, setAppStatusAT, setErrorAC} from "../AppWithRedux/app-reducer";
import {ResponseType} from "../api/todolists-api";
import {Dispatch} from "redux";

type ErrorUtilsDispatchType = setAppStatusAT | setAppErrorAT
// generic function
export const handleServerAppError = <T>(dispatch: Dispatch<ErrorUtilsDispatchType>, data: ResponseType<T>) => {
    if (data.messages.length) {
        dispatch(setErrorAC(data.messages[0]))
    } else {
        dispatch(setErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}
export const handleServerNetworkError = (dispatch: Dispatch<ErrorUtilsDispatchType>, error: {message:string}) => {
    dispatch(setErrorAC(error.message?error.message:"Some error occurred"))
    dispatch(setAppStatusAC('failed'))
    }

// const user = {
//     name: "Den",
//     age: 3
// }
// type User = {
//     name: string,
//     age: number
// }
//
// const testFunc = (param: string | number | Array<string> | Array<number> | User|Array<User>):string | number | Array<string> | Array<number> | User|Array<User> => {
//     return param
// }
// const result = testFunc(1)
// const result2 = testFunc(user)
// function identity<T>(arg:T):T{
//     return arg
// }
// const result3=identity(user)
// result3.name
// const result4=identity([user])
// // result4.map(el=>el)