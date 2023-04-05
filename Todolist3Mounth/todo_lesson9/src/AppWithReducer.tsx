import React, {Reducer, useReducer, useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
    ActionType, AddTodolistAC,
    ChangeTodolistFilerAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./State/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./State/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./State/Store";


// CRUD
// R - filter, sort, search

export type FilterValuesType = "all" | "active" | "completed"
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

type TodoListsStateType = Array<TodoListType>

function AppWithRedux(): JSX.Element {
    //BLL:
    const todoListId_1 = v1()
    const todoListId_2 = v1()
    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const removeTask = (taskId: string, todoListId: string) => {
        dispatch(removeTaskAC(taskId, todoListId))
    }
    const addTask = (title: string, todoListId: string) => {
       dispatch(addTaskAC(title, todoListId))
    }
    const changeTaskStatus = (taskId: string, newIsDone: boolean, todoListId: string) => {
        dispatch(changeTaskStatusAC(taskId, newIsDone, todoListId))
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
        dispatch(changeTaskTitleAC(taskId, newTitle, todoListId))
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
        dispatch(ChangeTodolistFilerAC(todoListId, filter))
    }
    const changeTodoListTitle = (title: string, todoListId: string) => {
        dispatch(ChangeTodolistTitleAC(todoListId, title))
    }
    const removeTodoList = (todoListId: string) => {
        dispatch(RemoveTodolistAC(todoListId))
    }
    const addTodoList = (title: string) => {
        dispatch(AddTodolistAC(title))

    }

    const todoListsComponents = todoLists.map(tl => {
        const filteredTasks: Array<TaskType> = getFilteredTasks(tasks[tl.id], tl
            .filter)
        return (
            <Grid item>
                <Paper style={{padding: "10px"}} elevation={3}>
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
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm maxLengthUserMessage={15} addNewItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoListsComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
