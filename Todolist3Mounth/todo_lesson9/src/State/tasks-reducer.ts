import {TasksStateType} from "../App/App";
import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT, SetTodoListType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolists-api";


export type RemoveTasksActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
// const reducer=(currentState,action)=>nextState
//const action={type:"...", payload: ...}
export type ActionType =
    RemoveTasksActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistAT
    | RemoveTodolistAT | SetTodoListType
const initialState: TasksStateType = {}
export const tasksReducer = (state: TasksStateType = initialState, action: ActionType) => {
    // debugger
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id != action.taskId)}
        case "ADD_TASK":
            const newTask: TaskType = {
                id: v1(), title: action.title, status: TaskStatuses.New, todoListId: action.todolistId, startDate: "",
                deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: ""
            }
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        case "CHANGE_TASK_STATUS":
            // debugger
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, status: action.status} : t)
            }
        case "CHANGE_TASK_TITLE":
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.newTitle
                } : t)
            }
        case "ADD-TODOLIST":
            return {...state, [action.todolistId]: []}
        case "REMOVE-TODOLIST":
            // const copyState = {...state}
            // delete copyState[action.id]
            const {[action.id]: [], ...rest} = {...state}
            return rest
        case "SET_TODOS":
            // debugger
            const copyState={...state}
            action.todoLists.forEach((td)=>{
                copyState[td.id]=[]
            })
            return copyState
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => ({type: "REMOVE-TASK", taskId, todolistId}) as const
export const addTaskAC = (title: string, todolistId: string) => ({type: "ADD_TASK", title, todolistId}) as const
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) => ({
    type: "CHANGE_TASK_STATUS",
    taskId,
    status,
    todolistId
}) as const
export const changeTaskTitleAC = (taskId: string, newTitle: string, todoListId: string) => ({
    type: "CHANGE_TASK_TITLE",
    taskId,
    newTitle,
    todoListId
}) as const