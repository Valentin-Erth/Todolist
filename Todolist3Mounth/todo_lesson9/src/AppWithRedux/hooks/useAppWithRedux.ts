import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../State/Store";
import {
    AddTodolistAC,
    ChangeTodolistFilerAC,
    ChangeTodolistTitleAC, createTodolistTC,
    FilterValuesType, RemoveTodolistAC, removeTodolistTC,
    TodoListDomainType
} from "../../State/todolists-reducer";
import {useCallback} from "react";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    creatTasksTC,
    removeTaskAC, removeTasksTC
} from "../../State/tasks-reducer";
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
        dispatch(changeTaskStatusAC(taskId, status, todoListId))
    }, [dispatch])
    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todoListId: string) => {
        dispatch(changeTaskTitleAC(taskId, newTitle, todoListId))
    }, [dispatch])


    const changeTodoListFilter = useCallback((filter: FilterValuesType, todoListId: string) => {
        dispatch(ChangeTodolistFilerAC(todoListId, filter))
    }, [dispatch])
    const changeTodoListTitle = useCallback((title: string, todoListId: string) => {
        dispatch(ChangeTodolistTitleAC(todoListId, title))
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