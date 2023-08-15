import React, {useEffect} from 'react';
import './App.css';
import ButtonAppBar from "../ButtonAppBar";
import Container from '@mui/material/Container';
import {TaskType} from "../api/todolists-api";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {BrowserRouter, Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {initializeAppTC} from "./app-reducer";
import {useAppDispatch, useAppSelector} from "./Store";
import CircularProgress from "@mui/material/CircularProgress";

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
    // const navigate=useNavigate()
    const dispatch = useAppDispatch()
    const isInitialized=useAppSelector<boolean>(state => state.app.isInitialized)
    useEffect(()=>{
        dispatch(initializeAppTC())
    },[])
if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress size={100}/>
        </div>
    }

    return (
        <BrowserRouter>
        <div className="App">
            <ErrorSnackbar/>
            <ButtonAppBar/>
            <Container>
                <Routes>
                    <Route path={"/"} element={<TodolistsList demo={demo}/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={'/404'} element={<h1>404: PAGE NOT FOUND</h1>} />
                    <Route path={"*"} element={<Navigate to={"/404"}/>}/>
                </Routes>
            </Container>
        </div>
            </BrowserRouter>
    );
}

export default AppWithRedux;

