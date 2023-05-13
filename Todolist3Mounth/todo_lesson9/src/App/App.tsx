import React from 'react';
import '../AppWithRedux/App.css';
import TodoList from "../features/TodolistsList/Todolist/TodoList";
import {v1} from "uuid";
import {AddItemForm} from "../components/AdditemForm/AddItemForm";
import ButtonAppBar from "../ButtonAppBar";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolists-api";
import {FilterValuesType, TodoListDomainType} from "../features/TodolistsList/todolists-reducer";
import {useTodolist} from "./hooks/useTodolist";
import {useTasks} from "./hooks/useTasks";

// CRUD
// R - filter, sort, search
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App(): JSX.Element {
    //BLL:
    let {tasks,
        getFilteredTasks,
        changeTaskTitle,
        changeTaskStatus,addTask,
        removeTask,
        completelyremoveTaskForTodolist,
        addStateForNewTodolist}=useTasks()// кастомный хук, через деструктуризацию достаем из объекта нужную логику

    let {todoLists,
        changeTodoListFilter,
        removeTodoList,
        changeTodoListTitle,
        addTodoList}=useTodolist(completelyremoveTaskForTodolist,addStateForNewTodolist)

    const todoListsComponents = todoLists.map(tl => {
        const filteredTasks: Array<TaskType> = getFilteredTasks(tasks[tl.id], tl
            .filter)
        return (
            <Grid item>
                <Paper style={{padding: "10px"}} elevation={3}>
                    <TodoList
                        entityStatus={tl.entityStatus}
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
                    <AddItemForm maxLengthUserMessage={15} addNewItem={addTodoList} block={false}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoListsComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default App;

