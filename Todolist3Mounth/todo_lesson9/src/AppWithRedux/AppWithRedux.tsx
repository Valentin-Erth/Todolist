import React, {useEffect} from 'react';
import '../App.css';
import TodoList from "../TodoList";
import {AddItemForm} from "../AdditemForm/AddItemForm";
import ButtonAppBar from "../ButtonAppBar";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {getTodolistTC} from "../State/todolists-reducer";
import {useAppDispatch} from "../State/Store";
import {TaskType} from "../api/todolists-api";
import {useAppWithRedux} from "./hooks/useAppWithRedux";

// CRUD
// R - filter, sort, search
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux(): JSX.Element {
    console.log("App is called")
    //const dispatch = useDispatch()
    const dispatch=useAppDispatch()
    //BLL:
    const {
        todoLists,
        tasks,
        removeTodoList,
        addTodoList,
        addTask,
        changeTodoListFilter,
        changeTodoListTitle,
        changeTaskTitle,
        removeTask,
        changeTaskStatus
    } = useAppWithRedux()

    useEffect(() => {
        dispatch(getTodolistTC())
    }, [])
    const todoListsComponents = todoLists.map(tl => {
        // const filteredTasks: Array<TaskType> = getFilteredTasks(tasks[tl.id], tl
        //     .filter)

        let allTodolistTasks = tasks[tl.id]
        // debugger
        console.log("tasks", tasks[tl.id])
        let tasksForTodolist = allTodolistTasks
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
