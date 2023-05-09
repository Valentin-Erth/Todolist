import React from 'react';
import './App.css';
import ButtonAppBar from "../ButtonAppBar";
import Container from '@mui/material/Container';
import {TaskType} from "../api/todolists-api";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";

// CRUD
// R - filter, sort, search
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux(): JSX.Element {
    console.log("App is called")
    return (
        <div className="App">
            <ButtonAppBar/>
            <Container>
                <TodolistsList/>
            </Container>
        </div>
    );
}

export default AppWithRedux;

