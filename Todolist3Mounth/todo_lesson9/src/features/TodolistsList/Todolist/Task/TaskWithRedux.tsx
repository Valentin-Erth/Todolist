import React, {ChangeEvent, FC, useCallback} from 'react';
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import {useDispatch} from "react-redux";
import {
    changeTaskTitleAC,
    removeTasksTC, updateTasksTC
} from "../../tasks-reducer";
import {TaskStatuses, TaskType} from "../../../../api/todolists-api";
import {useAppDispatch} from "../../../../AppWithRedux/Store";
import {RequestStatusType} from "../../../../AppWithRedux/app-reducer";

type TasksListPropsType = {
    todoListId: string
    task: TaskType
    entityStatus:RequestStatusType
    }


export const TaskWithRedux: FC<TasksListPropsType> = React.memo(({
                                                                     task,
                                                                     todoListId,entityStatus
                                                                 }: TasksListPropsType): JSX.Element => {

    // const dispatch = useDispatch()
    const dispatch=useAppDispatch()
    const taskClasses = task.status===TaskStatuses.Completed ? "task task-done" : "task"
    const removeTaskHandler = () => dispatch(removeTasksTC(task.id, todoListId))
    const changeTaskStatusHandler =
        (e: ChangeEvent<HTMLInputElement>) => {
            // debugger
            let newIsDone = e.currentTarget.checked?TaskStatuses.Completed:TaskStatuses.New
            const thunk=updateTasksTC(task.id, {status:newIsDone},todoListId)
            dispatch(thunk)
        }
    const changeTaskTitleHandler = useCallback((title: string) => {
        const thunk=updateTasksTC(task.id, {title}, todoListId)
        dispatch(thunk)
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
            <EditableSpan title={task.title} spanClasses={taskClasses} changeTitle={changeTaskTitleHandler} block={entityStatus}/>
            <IconButton aria-label="delete" onClick={removeTaskHandler} disabled={entityStatus==="loading"}>
                <DeleteIcon/>
            </IconButton>
        </div>
    );
});

