import {tasksReducer} from './tasks-reducer';
import {todolistsReducer} from './todolists-reducer';
import {combineReducers, compose, legacy_createStore, AnyAction, createStore, applyMiddleware} from 'redux';
import thunkMiddleware, {ThunkDispatch} from "redux-thunk"
import {useDispatch} from "react-redux";
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
export  type AppDispatchType=ThunkDispatch<AppRootStateType,any,AnyAction>
export const useAppDispatch=()=>useDispatch<AppDispatchType>()//создали свой кастомный хук useDispatch и используем его в APP по проекту
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// непосредственно создаём store

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));//composeEnhancers()
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

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