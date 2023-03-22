import React, {ChangeEvent, FC} from 'react';
import {TaskType} from "./TodoList";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';

type TasksListPropsType = {
    todoListId: string
    tasks: TaskType[]
    removeTask: (taskId: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
}

const TasksList: FC<TasksListPropsType> = (props): JSX.Element => {
    const tasksItems: JSX.Element[] | JSX.Element =
        props.tasks.length
            ? props.tasks.map((task) => {
                const taskClasses = task.isDone ? "task task-done" : "task"
                const removeTaskHandler = () => props.removeTask(task.id, props.todoListId)
                const changeTaskStatusHandler =
                    (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)
                const changeTaskTitleHandler = (title: string) => {
                    props.changeTaskTitle(task.id, title, props.todoListId)
                }

                return (
                    <div key={task.id}>
                        <Checkbox defaultChecked checked={task.isDone} onChange={changeTaskStatusHandler}/>
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
                )
            })
            : <span>Your taskslist is empty</span>
    return (
        <div>
            {tasksItems}
        </div>
    );
};

export default TasksList;