import {useState} from "react";
import {todoListId_1, todoListId_2} from "../id-utils";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses, TaskType} from "../../api/todolists-api";
import {TasksStateType} from "../App";
import {FilterValuesType} from "../../features/TodolistsList/todolists-reducer";
//Вынесли логику в кастомный хук, возвращаем из него объект с функциями для возможности использовать их  в App
export function useTasks() {
    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId_1]: [
            {
                id: v1(), title: "HTML & CSS", status: TaskStatuses.Completed, todoListId: todoListId_1, startDate: "",
                deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "",entityStatus:"idle"
            },
            {
                id: v1(), title: "ES6 & TS", status: TaskStatuses.Completed, todoListId: todoListId_1, startDate: "",
                deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "",entityStatus:"idle"
            },
            // {id: v1(), title: "REACT & REDUX", isDone: false},
        ],
        [todoListId_2]: [
            {
                id: v1(), title: "MILK", status: TaskStatuses.Completed, todoListId: todoListId_2, startDate: "",
                deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "",entityStatus:"idle"
            },
            {
                id: v1(), title: "BREAD", status: TaskStatuses.Completed, todoListId: todoListId_2, startDate: "",
                deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "",entityStatus:"idle"
            },
            {
                id: v1(), title: "MEAT", status: TaskStatuses.New, todoListId: todoListId_2, startDate: "",
                deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "",entityStatus:"idle"
            },
        ]
    })
    const removeTask = (taskId: string, todoListId: string) => {
        //1. Get next state
        // const tasksForUpdate = tasks[todoListId]
        // const updatedTasks = tasksForUpdate.filter(t => t.id !== taskId)
        // const copyTasks = {...tasks}
        // copyTasks[todoListId] = updatedTasks
        // setTasks(copyTasks)
        //2. Set next state
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)})

    }
    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            status: TaskStatuses.New, todoListId: todoListId, startDate: "",
            deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "",entityStatus:"idle"
        }
        // const tasksForUpdate: Array<TaskType> = tasks[todoListId] // 3 tasks
        // const updatedTasks = [newTask, ...tasksForUpdate]  // 4 tasks
        // const copyTasks = {...tasks}
        // copyTasks[todoListId] = updatedTasks
        // setTasks(copyTasks)
        //
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }
    const changeTaskStatus = (taskId: string, status: TaskStatuses, todoListId: string) => {
        // const tasksForUpdate: Array<TaskType> = tasks[todoListId]
        // const updatedTasks = tasksForUpdate.map(t => t.id === taskId ? {...t, isDone: newIsDone} : t)
        // const copyTasks = {...tasks}
        // copyTasks[todoListId] = updatedTasks
        // setTasks(copyTasks)
        //
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, status: status} : t)})
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, title: newTitle} : t)})
    }
    const getFilteredTasks = (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
        switch (filter) {
            case "active":
                return tasks.filter(t => t.status === TaskStatuses.New)
            case "completed":
                return tasks.filter(t => t.status === TaskStatuses.Completed)
            default:
                return tasks
        }
    }
    const completelyremoveTaskForTodolist=(todoListId: string)=>{
        const copyTasks = {...tasks}
        delete copyTasks[todoListId]
        setTasks(copyTasks)
    }
    const addStateForNewTodolist=(newTodoListId: string)=>{
        setTasks({...tasks, [newTodoListId]: []})
    }
    return {
        tasks,
        removeTask,
        addTask,
        changeTaskStatus,
        changeTaskTitle,
        getFilteredTasks,
        completelyremoveTaskForTodolist,
        addStateForNewTodolist
    }
}