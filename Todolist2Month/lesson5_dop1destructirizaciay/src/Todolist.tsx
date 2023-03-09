import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import TasksList from "./TasksList";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    todolistId: string
    title: string
    tasks: TaskType[]
    filter: FilterValuesType

    removeTask: (taskId: string, todolistId: string) => void
    changeTodolistFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void

    changeTaskStatus: (taskId: string, newisDone: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
}

export const Todolist: FC<TodoListPropsType> = (props) => {
    const [title, setTitle] = useState("");
    const [error, setError] = useState<string | null>(null);
    const maxLengthUserMessage: number = 15
    const isUserMessageToLong: boolean = title.length > maxLengthUserMessage
    // const addTaskInput: RefObject<HTMLInputElement> = useRef(null)
    // console.log(addTaskInput)
    // const addTask = () => {
    //     if(addTaskInput.current){
    //         props.addTask(addTaskInput.current.value)
    //         addTaskInput.current.value = ""
    //     }
    //
    // }
    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(title.trim(), props.todolistId);
        } else {
            setError("Title is required");
        }
        setTitle("");
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === "Enter") {
            addTask();
        }
    }
    const handlerCreator = (filter: FilterValuesType) => () => props.changeTodolistFilter(filter, props.todolistId)
    // const onAllClickHandler = () => props.changeTodolistFilter("all", props.todolistId);
    // const onActiveClickHandler = () => props.changeTodolistFilter("active", props.todolistId);
    // const onCompletedClickHandler = () => props.changeTodolistFilter("completed", props.todolistId);
    const removeTodolist = () => {
        // alert("Clear")
        props.removeTodolist(props.todolistId)
    }

    const inputErrorClasses = error || isUserMessageToLong ? "input-error" : ""
    const userMaxLengthMessage = isUserMessageToLong && <div style={{color: "#ffa369"}}>Task title is to long!</div>
    const userErrorMessage = error && <div style={{color: "#ffa369"}}>Title is required!</div>
    const isAddBtnDisabled = title.length === 0
    return <div className={"todolist"}>
        <h3>{props.title}
            <button onClick={removeTodolist}>x</button>
        </h3>
        <div>
            {/*<input ref={addTaskInput}/>*/}
            {/*<button onClick={addTask}>+</button>*/}
            <input value={title}
                   placeholder="Please, enter title"
                   onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}
                   className={inputErrorClasses}
            />
            <button disabled={isAddBtnDisabled} onClick={addTask}>+</button>
            {userMaxLengthMessage}
            {userErrorMessage}
        </div>
        <TasksList
            tasks={props.tasks}
            removeTask={props.removeTask}
            changeTaskStatus={props.changeTaskStatus}
            todolistId={props.todolistId}
        />
        <div className="filter-btn-container">
            <button className={props.filter === "all" ? "active-filter-btn" : "filter-btn"}
                    onClick={handlerCreator("all")}>All
            </button>
            <button className={props.filter === "active" ? "active-filter-btn" : "filter-btn"}
                    onClick={handlerCreator("active")}>Active
            </button>
            <button className={props.filter === "completed" ? "active-filter-btn" : "filter-btn"}
                    onClick={handlerCreator("completed")}>Completed
            </button>
        </div>
    </div>
}
