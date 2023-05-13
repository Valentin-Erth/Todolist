import React from 'react';
import './App.css';
import ButtonAppBar from "../ButtonAppBar";
import Container from '@mui/material/Container';
import {TaskType} from "../api/todolists-api";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import LinearProgress from "@mui/material/LinearProgress";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";

// CRUD
// R - filter, sort, search
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
type PropsType={
    demo?:boolean
}
function AppWithRedux({demo=false}:PropsType): JSX.Element {
    console.log("App is called")
    return (
        <div className="App">
            <ErrorSnackbar/>
            <ButtonAppBar/>
            <Container>
                <TodolistsList demo={demo}/>
            </Container>
        </div>
    );
}

export default AppWithRedux;

