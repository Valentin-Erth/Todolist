import {v1} from 'uuid';
import {FilterValuesType, TodolistType} from "../App";


export type AddTodolistActionType = ReturnType<typeof addTodolistAC>




type ActionsType = AddTodolistActionType

const initialState: Array<TodolistType> =  []

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionsType): Array<TodolistType> => {
    debugger
    switch (action.type) {
        case 'ADD-TODOLIST': {
            debugger
            return [...state, {
                id: action.todolistId,
                title: action.title,
                filter: 'all'
            }]
        }
        default:
            debugger
            return state;
    }

}


export const addTodolistAC = (title: string) => (
    { type: 'ADD-TODOLIST', title: title, todolistId: v1()}
) as const


