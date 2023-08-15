import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';


// CRUD
// R - filter, sort, search

export type FilterValuesType = "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

type TodoListsStateType = Array<TodoListType>

function App(): JSX.Element {
    //BLL:
    const todoListId_1 = v1()
    const todoListId_2 = v1()
    const [todoLists, setTodoLists] = useState<TodoListsStateType>([
        {id: todoListId_1, title: "What to learn", filter: "all"},
        {id: todoListId_2, title: "What to buy", filter: "all"},
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId_1]: [
            {id: v1(), title: "HTML & CSS", isDone: true},
            {id: v1(), title: "ES6 & TS", isDone: true},
            // {id: v1(), title: "REACT & REDUX", isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: "MILK", isDone: true},
            {id: v1(), title: "BREAD", isDone: true},
            {id: v1(), title: "MEAT", isDone: false},
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
            isDone: false
        }
        // const tasksForUpdate: Array<TaskType> = tasks[todoListId] // 3 tasks
        // const updatedTasks = [newTask, ...tasksForUpdate]  // 4 tasks
        // const copyTasks = {...tasks}
        // copyTasks[todoListId] = updatedTasks
        // setTasks(copyTasks)
        //
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }
    const changeTaskStatus = (taskId: string, newIsDone: boolean, todoListId: string) => {
        // const tasksForUpdate: Array<TaskType> = tasks[todoListId]
        // const updatedTasks = tasksForUpdate.map(t => t.id === taskId ? {...t, isDone: newIsDone} : t)
        // const copyTasks = {...tasks}
        // copyTasks[todoListId] = updatedTasks
        // setTasks(copyTasks)
        //
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, isDone: newIsDone} : t)})
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, title: newTitle} : t)})
    }
    const getFilteredTasks = (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
        switch (filter) {
            case "active":
                return tasks.filter(t => t.isDone === false)
            case "completed":
                return tasks.filter(t => t.isDone === true)
            default:
                return tasks
        }
    }

    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: filter} : tl))
    }
    const changeTodoListTitle = (title: string, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, title: title} : tl))
    }
    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))  // 2 tl
        //delete tasks[todoListId]
        const copyTasks = {...tasks}
        delete copyTasks[todoListId]
        setTasks(copyTasks)
    }
    const addTodoList = (title: string) => {
        const NewTodoListId = v1()
        const newTodoList: TodoListType = {
            id: NewTodoListId,
            title: title,
            filter: "all"
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [NewTodoListId]: []})
    }


    const todoListsComponents = todoLists.map(tl => {
        const filteredTasks: Array<TaskType> = getFilteredTasks(tasks[tl.id], tl
            .filter)
        return (
            <Grid item>
                <Paper style={{padding:"10px"}} elevation={3}>
            <TodoList
                key={tl.id}
                todoListId={tl.id}
                title={tl.title}
                tasks={filteredTasks}
                filter={tl.filter}

                addTask={addTask}
                removeTask={removeTask}
                changeTaskTitle={changeTaskTitle}
                changeTaskStatus={changeTaskStatus}

                changeTodoListTitle={changeTodoListTitle}
                changeTodoListFilter={changeTodoListFilter}
                removeTodoList={removeTodoList}
            />
                </Paper>
            </Grid>
        )
    })
    //UI:
    return (
        <div className="App">
            <ButtonAppBar/>
            <Container>
                <Grid container style={{padding:"20px"}}>
                    <AddItemForm maxLengthUserMessage={15} addNewItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoListsComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
