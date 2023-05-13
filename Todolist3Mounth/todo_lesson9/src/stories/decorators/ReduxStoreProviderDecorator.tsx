import React from "react";
import {Provider} from "react-redux";
import {AppRootStateType, store} from "../../AppWithRedux/Store";
import {combineReducers, createStore, legacy_createStore} from "redux";
import {tasksReducer} from "../../features/TodolistsList/tasks-reducer";
import {todolistsReducer} from "../../features/TodolistsList/todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";
import {appReducer} from "../../AppWithRedux/app-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app:appReducer
})

const initialGlobalState:AppRootStateType = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all',addedDate: "",order: 0},
        {id: 'todolistId2', title: 'What to buy', filter: 'all',addedDate: "",order: 0}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed,todoListId: "todolistId1" ,startDate:"",
                deadline:"",addedDate:"",order:0,priority: TaskPriorities.Low, description:""},
            {id: v1(), title: 'JS',status: TaskStatuses.Completed,todoListId: "todolistId1",startDate:"",
                deadline:"",addedDate:"",order:0,priority: TaskPriorities.Low, description:""}
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Milk', status: TaskStatuses.Completed,todoListId: "todolistId2",startDate:"",
                deadline:"",addedDate:"",order:0,priority: TaskPriorities.Low, description:""},
            {id: v1(), title: 'React Book', status: TaskStatuses.Completed,todoListId: "todolistId2",startDate:"",
                deadline:"",addedDate:"",order:0,priority: TaskPriorities.Low, description:""}
        ]
    },
    app:{
        status: 'loading',
        error: "Error"
    }
}
export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState)
export const ReduxStoreProviderDecorator=(storyFn:any)=>{
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}