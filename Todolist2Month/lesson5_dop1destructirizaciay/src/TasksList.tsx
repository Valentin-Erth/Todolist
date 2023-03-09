import React, {ChangeEvent, FC} from 'react';
import {TaskType} from "./Todolist";

type TasksListPropsType = {
    tasks: TaskType[]
    removeTask: (taskId: string,todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean,todolistId: string) => void
    todolistId:string
}

 const TasksList: FC<TasksListPropsType> = (props): JSX.Element => {
    const tasksItems: JSX.Element[] | JSX.Element =
        props.tasks.length
        ? props.tasks.map((task) => {
            const taskClasses = task.isDone ? "task task-done" : "task"
            const removeTaskHandler = () => props.removeTask(task.id,props.todolistId)
            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked,props.todolistId)
            return (
                <li key={task.id}>
                    <input
                        type="checkbox"
                        checked={task.isDone}
                        onChange={changeTaskStatusHandler}
                    />
                    <span className={taskClasses}>{task.title}</span>
                    <button onClick={removeTaskHandler}>x</button>
                </li>
            )
        })
        : <span>Your taskslist is empty</span>
    return (
        <ul className={"list"}>
            {tasksItems}
        </ul>
    );
};

export default TasksList;