import React, {ChangeEvent, FC, RefObject, useRef, useState, KeyboardEvent} from 'react';
import TasksList from "./TasksList";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

type TodoListPropsType = {
    todoListId: string
    title: string
    filter: FilterValuesType
    tasks: TaskType[]

    removeTask: (taskId: string, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) =>
        void

    changeTodoListTitle: (title: string, todoListId: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: FC<TodoListPropsType> = (props) => {

    const addTask = (title: string) => {
        props.addTask(title, props.todoListId)
    }
    const handlerCreator = (filter: FilterValuesType) => () => props.changeTodoListFilter(filter, props.todoListId)
    const removeTodoList = () => props.removeTodoList(props.todoListId)
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListId)
    return (
        <div className={"todolist"}>
            <h3><EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton aria-label="delete" onClick={removeTodoList}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm maxLengthUserMessage={15} addNewItem={addTask}/>
            <TasksList
                todoListId={props.todoListId}
                tasks={props.tasks}
                removeTask={props.removeTask}
                changeTaskStatus={props.changeTaskStatus}
                changeTaskTitle={props.changeTaskTitle}
            />
            <div className="filter-btn-container">
                <Button variant={props.filter === "all" ?"outlined":"contained"} color="success" onClick={handlerCreator('all')}>All</Button>
                <Button variant={props.filter === "active" ?"outlined":"contained"} color="error" onClick={handlerCreator("active")}>Active</Button>
                <Button variant={props.filter === "completed" ?"outlined":"contained"} color="secondary" onClick={handlerCreator("completed")}>Completed</Button>
                {/*<button*/}
                {/*    className={props.filter === "all" ? "active-filter-btn" : "filter-btn"}*/}
                {/*    onClick={handlerCreator('all')}*/}
                {/*>All*/}
                {/*</button>*/}
                {/*<button*/}
                {/*    className={props.filter === "active" ? "active-filter-btn" : "filter-btn"}*/}
                {/*    onClick={handlerCreator("active")}*/}
                {/*>Active*/}
                {/*</button>*/}
                {/*<button*/}
                {/*    className={props.filter === "completed" ? "active-filter-btn" : "filter-btn"}*/}
                {/*    onClick={handlerCreator("completed")}*/}
                {/*>Completed*/}
                {/*</button>*/}
            </div>
        </div>
    );
};

export default TodoList;