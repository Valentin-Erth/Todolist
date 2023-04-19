import React, {ChangeEvent, FC, useCallback} from 'react';
import {TaskType} from "./TodoList";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';

type TasksListPropsType = {
    todoListId: string
    removeTask: (taskId: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    task: TaskType
}


const Task: FC<TasksListPropsType> = React.memo((props): JSX.Element => {

    const taskClasses = props.task.isDone ? "task task-done" : "task"
    const removeTaskHandler = useCallback(() => props.removeTask(props.task.id, props.todoListId), [props.removeTask, props.task.id, props.todoListId])
    const changeTaskStatusHandler = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            // debugger
            props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todoListId)
        }, [props.changeTaskStatus, props.task.id, props.todoListId])
    const changeTaskTitleHandler = useCallback((title: string) => {
        props.changeTaskTitle(props.task.id, title, props.todoListId)
    }, [props.changeTaskTitle, props.task.id, props.todoListId])

    return (
        <div key={props.task.id}>
            <Checkbox /*defaultChecked*/
                checked={props.task.isDone}
                onChange={changeTaskStatusHandler}/>
            {/*<input*/}
            {/*    type="checkbox"*/}
            {/*    checked={task.isDone}*/}
            {/*    onChange={changeTaskStatusHandler}*/}
            {/*/>*/}
            <EditableSpan title={props.task.title} spanClasses={taskClasses} changeTitle={changeTaskTitleHandler}/>
            <IconButton aria-label="delete" onClick={removeTaskHandler}>
                <DeleteIcon/>
            </IconButton>
        </div>
    );
});

export default Task;