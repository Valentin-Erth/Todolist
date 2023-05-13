import React, {useEffect} from "react";
import {useAppDispatch} from "../../AppWithRedux/Store";
import {useAppWithRedux} from "../../AppWithRedux/hooks/useAppWithRedux";
import {getTodolistTC} from "./todolists-reducer";
import Grid from "@mui/material/Grid";
import {AddItemForm} from "../../components/AdditemForm/AddItemForm";
import Paper from "@mui/material/Paper";
import TodoList from "./Todolist/TodoList";

type TodolistsListPropsType = {
    demo?:boolean
}
export const TodolistsList: React.FC<TodolistsListPropsType> = ({demo=false}) => {
    const dispatch = useAppDispatch()
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
        if(demo){
            return
        }else{
            dispatch(getTodolistTC())
        }

    }, [])
    return (
        <>
            <Grid container style={{padding: "20px"}}>
                <AddItemForm maxLengthUserMessage={15} addNewItem={addTodoList} block={false}/>
            </Grid>
            <Grid container spacing={3}>
                {todoLists.map(tl => {
                    let tasksForTodolist = tasks[tl.id]
                    return (
                        <Grid item key={tl.id}>
                            <Paper style={{padding: "10px"}} elevation={3}>
                                <TodoList
                                    entityStatus={tl.entityStatus}
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
                                    demo={demo}
                                />
                            </Paper>
                        </Grid>
                    )
                })
                }
            </Grid>
        </>
    )
}