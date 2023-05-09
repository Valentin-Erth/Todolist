import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../Store";
import {
    ChangeTodolistFilerAC,
    ChangeTodolistTitleTC, createTodolistTC,
    FilterValuesType, removeTodolistTC,
    TodoListDomainType
} from "../../features/TodolistsList/todolists-reducer";
import {useCallback} from "react";
import {
    creatTasksTC,
    removeTasksTC, updateTasksTC
} from "../../features/TodolistsList/tasks-reducer";
import {TaskStatuses} from "../../api/todolists-api";
import {TasksStateType} from "../AppWithRedux";

export const useAppWithRedux = () => {
    const todoLists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    //const dispatch = useDispatch()
    const dispatch = useAppDispatch()

    const removeTask = useCallback((taskId: string, todoListId: string) => {
        // debugger
        dispatch(removeTasksTC(taskId, todoListId))
    }, [dispatch])
    const addTask = useCallback((title: string, todoListId: string) => {
        const thunk = creatTasksTC(todoListId, title)
        dispatch(thunk)
    }, [dispatch])
    const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses, todoListId: string) => {
        const thunk=updateTasksTC(taskId, {status},todoListId)
        dispatch(thunk)
    }, [dispatch])
    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todoListId: string) => {
        const thunk=updateTasksTC(taskId,{title:newTitle},todoListId)
        dispatch(thunk)
    }, [dispatch])


    const changeTodoListFilter = useCallback((filter: FilterValuesType, todoListId: string) => {
        dispatch(ChangeTodolistFilerAC(todoListId, filter))
    }, [dispatch])
    const changeTodoListTitle = useCallback((title: string, todoListId: string) => {
        const thunk =ChangeTodolistTitleTC(todoListId, title)
        dispatch(thunk)
    }, [dispatch])
    const removeTodoList = useCallback((todoListId: string) => {
        const thunk = removeTodolistTC(todoListId)
        dispatch(thunk)
    }, [dispatch])
    const addTodoList = useCallback((title: string) => {
        const thunk = createTodolistTC(title)
        dispatch(thunk)

    }, [dispatch])
    return {
        todoLists,
        tasks,
        removeTask,
        addTask,
        changeTaskStatus,
        changeTaskTitle,
        changeTodoListFilter,
        changeTodoListTitle,
        removeTodoList,
        addTodoList
    }
}