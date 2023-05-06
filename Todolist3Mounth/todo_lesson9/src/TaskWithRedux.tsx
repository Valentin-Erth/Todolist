import React, {ChangeEvent, FC, useCallback} from 'react';
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, removeTasksTC} from "./State/tasks-reducer";
import {TaskStatuses, TaskType} from "./api/todolists-api";
import {useAppDispatch} from "./State/Store";

type TasksListPropsType = {
    todoListId: string
    task: TaskType
}


export const TaskWithRedux: FC<TasksListPropsType> = React.memo(({
                                                                     task,
                                                                     todoListId
                                                                 }: TasksListPropsType): JSX.Element => {

    // const dispatch = useDispatch()
    const dispatch=useAppDispatch()
    const taskClasses = task.status===TaskStatuses.Completed ? "task task-done" : "task"
    const removeTaskHandler = () => dispatch(removeTasksTC(task.id, todoListId))
    const changeTaskStatusHandler =
        (e: ChangeEvent<HTMLInputElement>) => {
            // debugger
            let newIsDone = e.currentTarget.checked?TaskStatuses.Completed:TaskStatuses.New
            dispatch(changeTaskStatusAC(task.id, newIsDone, todoListId))
        }
    const changeTaskTitleHandler = useCallback((title: string) => {
        dispatch(changeTaskTitleAC(task.id, title, todoListId))
    },[dispatch, task.id, todoListId])

    return (
        <div >
            <Checkbox /*defaultChecked*/
                checked={task.status===TaskStatuses.Completed}
                onChange={changeTaskStatusHandler}/>
            {/*<input*/}
            {/*    type="checkbox"*/}
            {/*    checked={task.isDone}*/}
            {/*    onChange={changeTaskStatusHandler}*/}
            {/*/>*/}
            <EditableSpan title={task.title} spanClasses={taskClasses} changeTitle={changeTaskTitleHandler}/>
            <IconButton aria-label="delete" onClick={removeTaskHandler}>
                <DeleteIcon/>
            </IconButton>
        </div>
    );
});

