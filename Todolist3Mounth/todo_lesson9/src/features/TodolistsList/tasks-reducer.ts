import {TasksStateType} from "../../App/App";
import {AddTodolistAT, clearTodosDataAT, RemoveTodolistAT, SetTodoListAT} from "./todolists-reducer";
import {
    ResultCode,
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistAPI,
    UpdateTaskModelType
} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {AppActoinsType, AppRootStateType, AppThunk} from "../../AppWithRedux/Store";
import {RequestStatusType, setAppStatusAC, setErrorAC} from "../../AppWithRedux/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

// reducer
export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType) => {
    // debugger
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id != action.taskId)}
        case "ADD_TASK":
            // const newTask: TaskType = {
            //     id: v1(), title: action.title, status: TaskStatuses.New, todoListId: action.todolistId, startDate: "",
            //     deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: ""
            // }
            return {...state, [action.todolistId]: [action.task, ...state[action.todolistId]]}
        case "UPDATE_TASK":
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
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
            return {...state, [action.todolist.id]: []}
        case "REMOVE-TODOLIST":
            // const copyState = {...state}
            // delete copyState[action.id]
            const {[action.id]: [], ...rest} = {...state}
            return rest
        case "SET_TODOLISTS":
            const copyState = {...state}// пробегаемся по массиву и создаем новое свой-во(это todoid) и значение пустой[]
            action.todoLists.forEach((td) => {
                copyState[td.id] = []
            })
            return copyState
        case "SET-TASKS":
            return {...state, [action.todoId]: action.tasks}
        case "CHANGE-TASK-ENTITY-STATUS":
            return {...state, [action.todoId]: state[action.todoId].map(t=>t.id===action.taskId?{...t,entityStatus:action.status}:t)}
        case "CLEAR-DATA":
            return {}
        default:
            return state
    }
}
// actions
export const removeTaskAC = (taskId: string, todolistId: string) => ({type: "REMOVE-TASK", taskId, todolistId} as const)
export const addTaskAC = (todolistId: string, task: TaskType) => ({type: "ADD_TASK", task, todolistId} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => ({
    type: "UPDATE_TASK",
    taskId,
    model,
    todolistId
} as const)
export const changeTaskTitleAC = (taskId: string, newTitle: string, todoListId: string) => ({
    type: "CHANGE_TASK_TITLE",
    taskId,
    newTitle,
    todoListId
} as const)
export const setTasksAC = (todoId: string, tasks: TaskType[]) => ({
    type: "SET-TASKS",
    tasks,
    todoId
} as const)
export const changeTaskEntityStatusAC=(todoId: string,taskId: string,status:RequestStatusType)=>({type:"CHANGE-TASK-ENTITY-STATUS",todoId,taskId,status}as const)
// thunks
export const getTasksTC = (todoId: string): AppThunk => (dispatch) => {
    // внутри санки можно делать побочные эффекты (запросы на сервер)
    dispatch(setAppStatusAC("loading"))
    todolistAPI.getTasks(todoId)
        .then((res) => {
            // и диспатчить экшены (action) или другие санки (thunk)
            const tasks = res.data.items
            dispatch(setTasksAC(todoId, tasks))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error)
        })
}
export const removeTasksTC = (taskId: string, todoId: string) => (dispatch: Dispatch<AppActoinsType>) => {
    dispatch(setAppStatusAC("loading"))
    dispatch(changeTaskEntityStatusAC(todoId,taskId,"loading"))
    todolistAPI.deleteTask(todoId, taskId)
        .then((res) => {
            if (res.data.resultCode === ResultCode.OK) {
                dispatch(removeTaskAC(taskId, todoId))
                dispatch(setAppStatusAC('succeeded'))
            }else  {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error)
        })
}
export const creatTasksTC = (todoId: string, title: string) => (dispatch: Dispatch<AppActoinsType>) => {
    dispatch(setAppStatusAC("loading"))
    todolistAPI.createTask(todoId, title)
        .then((res) => {
            // console.log(res.data.data)
            if (res.data.resultCode === ResultCode.OK) {
                dispatch(addTaskAC(todoId, res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {handleServerAppError(dispatch, res.data)
            }
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error)
        })
}
export const updateTasksTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todoListId: string) =>
    (dispatch: Dispatch<AppActoinsType>, getState: () => AppRootStateType) => {
        dispatch(setAppStatusAC("loading"))
        const state = getState()
        const task = state.tasks[todoListId].find(t => t.id === taskId)
        if (!task) {
            //throw new Error("task not found in the state")
            console.warn("task not found in the state")
            return
        }
        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            title: task.title,
            startDate: task.startDate,
            status: task.status,
            entityStatus:task.entityStatus,
            ...domainModel
        }
        todolistAPI.updateTask(todoListId, taskId, apiModel)
            .then((res) => {
                if (res.data.resultCode === ResultCode.OK) {
                    const action = updateTaskAC(taskId, domainModel, todoListId)
                    dispatch(action)
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(dispatch, res.data)
                }
            })
            .catch((error) => {
                handleServerNetworkError(dispatch, error)
            })

    }

// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
    entityStatus?:RequestStatusType
}
export type RemoveTasksActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type SetTasksType = ReturnType<typeof setTasksAC>
export type changeTaskEntityStatusAT=ReturnType<typeof changeTaskEntityStatusAC>
// const reducer=(currentState,action)=>nextState
// const action={type:"...", payload: ...}
export type TasksActionsType =
    RemoveTasksActionType
    | AddTaskActionType
    | UpdateTaskActionType
    | ChangeTaskTitleActionType
    | AddTodolistAT
    | RemoveTodolistAT
    | SetTodoListAT
    | SetTasksType
    | changeTaskEntityStatusAT
    | clearTodosDataAT
const initialState: TasksStateType = {}