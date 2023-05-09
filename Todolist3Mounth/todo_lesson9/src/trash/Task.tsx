import React, {ChangeEvent, FC, useCallback} from 'react';
import {EditableSpan} from "../components/EditableSpan/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import {TaskStatuses, TaskType} from "../api/todolists-api";

type TasksListPropsType = {
    todoListId: string
    removeTask: (taskId: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    task: TaskType
}


const Task: FC<TasksListPropsType> = React.memo((props): JSX.Element => {

    const taskClasses = props.task.status===TaskStatuses.Completed ? "task task-done" : "task"
    const removeTaskHandler = useCallback(() => props.removeTask(props.task.id, props.todoListId), [props.removeTask, props.task.id, props.todoListId])
    const changeTaskStatusHandler = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            // debugger
            props.changeTaskStatus(props.task.id, e.currentTarget.checked? TaskStatuses.Completed:TaskStatuses.New, props.todoListId)
        }, [props.changeTaskStatus, props.task.id, props.todoListId])
    const changeTaskTitleHandler = useCallback((title: string) => {
        props.changeTaskTitle(props.task.id, title, props.todoListId)
    }, [props.changeTaskTitle, props.task.id, props.todoListId])

    return (
        <div key={props.task.id}>
            <Checkbox /*defaultChecked*/
                checked={props.task.status===TaskStatuses.Completed}
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