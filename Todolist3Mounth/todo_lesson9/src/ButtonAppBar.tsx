import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LinearProgress from "@mui/material/LinearProgress";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch, useAppSelector} from "./AppWithRedux/Store";
import {RequestStatusType} from "./AppWithRedux/app-reducer";
import {useCallback} from "react";
import {logoutTC} from "./features/Login/auth-reducer";

export default function ButtonAppBar() {
    const dispatch = useAppDispatch()
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isLoggedIn = useAppSelector<boolean>(state => state.login.isLoggedIn)
    const LogoutHandler=useCallback(()=>{
        dispatch(logoutTC())
    },[])
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    {isLoggedIn && <Button color="inherit" onClick={LogoutHandler}>Log out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress color={"secondary"}/>}
            </AppBar>
        </Box>
    );
}