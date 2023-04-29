import React, {Reducer, useCallback, useReducer, useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
    ActionType, AddTodolistAC,
    ChangeTodolistFilerAC,
    ChangeTodolistTitleAC, FilterValuesType,
    RemoveTodolistAC, TodoListDomainType,
    todolistsReducer
} from "./State/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./State/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./State/Store";
import {TaskStatuses, TaskType} from "./api/todolists-api";


// CRUD
// R - filter, sort, search

export type TasksStateType = {
    [key: string]: Array<TaskType>
}



function AppWithRedux(): JSX.Element {
    console.log("App is called")
    //BLL:
   const todoLists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const removeTask = useCallback((taskId: string, todoListId: string) => {
        dispatch(removeTaskAC(taskId, todoListId))
    },[dispatch])
    const addTask = useCallback((title: string, todoListId: string) => {
       dispatch(addTaskAC(title, todoListId))
    },[dispatch])
    const changeTaskStatus = useCallback((taskId: string, status:TaskStatuses, todoListId: string) => {
        dispatch(changeTaskStatusAC(taskId, status, todoListId))
    },[dispatch])
    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todoListId: string) => {
        dispatch(changeTaskTitleAC(taskId, newTitle, todoListId))
    },[dispatch])


    const changeTodoListFilter = useCallback((filter: FilterValuesType, todoListId: string) => {
        dispatch(ChangeTodolistFilerAC(todoListId, filter))
    },[dispatch])
    const changeTodoListTitle = useCallback((title: string, todoListId: string) => {
        dispatch(ChangeTodolistTitleAC(todoListId, title))
    },[dispatch])
    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(RemoveTodolistAC(todoListId))
    },[dispatch])
    const addTodoList = useCallback((title: string) => {
       // debugger
        dispatch(AddTodolistAC(title))

    },[dispatch])

    const todoListsComponents = todoLists.map(tl => {
        // const filteredTasks: Array<TaskType> = getFilteredTasks(tasks[tl.id], tl
        //     .filter)
        let allTodolistTasks=tasks[tl.id]
        let tasksForTodolist=allTodolistTasks
        return (
            <Grid item key={tl.id}>
                <Paper style={{padding: "10px"}} elevation={3}>
                    <TodoList
                        
                        todoListId={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
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
