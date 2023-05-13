import {TasksActionsType, tasksReducer} from '../features/TodolistsList/tasks-reducer';
import {TodolistActionsType, todolistsReducer} from '../features/TodolistsList/todolists-reducer';
import {combineReducers, compose, legacy_createStore, AnyAction, applyMiddleware} from 'redux';
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk"
import {useDispatch} from "react-redux";
import {appReducer, LoaderActionsType} from "./app-reducer";
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app:appReducer
})
//создали свой кастомный хук useDispatch и используем его в APP по проекту
export  type AppDispatchType=ThunkDispatch<AppRootStateType,any,AnyAction>
export const useAppDispatch=()=>useDispatch<AppDispatchType>()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// непосредственно создаём store

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));//composeEnhancers()
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
//все типы экшенов для всего app
export type AppActoinsType=TodolistActionsType|TasksActionsType|LoaderActionsType
//Универсальная типизация thunks
export type AppThunk<ReturneType=void>=ThunkAction<ReturneType, AppRootStateType, unknown, AppActoinsType>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
// {
//     state: {
//         tasks:{},
//         todolist:[]
//     },
//     getState,
//      dispatch,
//     subscribe
// }