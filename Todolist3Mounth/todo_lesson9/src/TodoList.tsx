import React, {FC, memo, useCallback, useMemo} from 'react';
import {AddItemForm} from "./AdditemForm/AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import {TaskWithRedux} from "./TaskWithRedux";
import {TaskStatuses, TaskType} from "./api/todolists-api";
import {FilterValuesType} from "./State/todolists-reducer";

type TodoListPropsType = {
    todoListId: string
    title: string
    filter: FilterValuesType
    tasks: TaskType[]

    removeTask: (taskId: string, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) =>
        void

    changeTodoListTitle: (title: string, todoListId: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
}



const TodoList: FC<TodoListPropsType> = React.memo((props) => {
    console.log("TodoList is called")
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todoListId)
    }, [props.addTask, props.todoListId])
    const handlerCreator = useCallback((filter: FilterValuesType) => () => props.changeTodoListFilter(filter, props.todoListId), [props.changeTodoListFilter, props.todoListId])
    const removeTodoList = useCallback(() => props.removeTodoList(props.todoListId),[props.removeTodoList,props.todoListId])
    const changeTodoListTitle = useCallback((title: string) => props.changeTodoListTitle(title, props.todoListId), [props.changeTodoListTitle, props.todoListId])
     const getFilteredTasks = (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
         console.log("useMemo")
        switch (filter) {
            case "active":
                return tasks.filter(t => t.status === TaskStatuses.New)
            case "completed":
                return tasks.filter(t => t.status === TaskStatuses.Completed)
            default:
                return tasks
        }
    }
    const filteredTasks: Array<TaskType> = getFilteredTasks(props.tasks, props.filter)
    return (
        <div className={"todolist"}>
            <h3><EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton aria-label="delete" onClick={removeTodoList}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm maxLengthUserMessage={15} addNewItem={addTask}/>
            {filteredTasks.length ?
                filteredTasks.map((task) => {
                    return (
                        <TaskWithRedux
                            todoListId={props.todoListId}
                            task={task}
                            key={task.id}
                        />
                    )
                })
                : <span>Your taskslist is empty</span>
            }

            <div className="filter-btn-container">
                <ButtonWithMemo title={"All"}
                                color={"success"}
                                variant={props.filter === "all" ? "outlined" : "contained"}
                                onClick={handlerCreator('all')}/>
                <ButtonWithMemo title={"Active"}
                                color={"error"}
                                variant={props.filter === "active" ? "outlined" : "contained"}
                                onClick={handlerCreator("active")}/>
                <ButtonWithMemo title={"Completed"}
                                color={"secondary"}
                                variant={props.filter === "completed" ? "outlined" : "contained"}
                                onClick={handlerCreator("completed")}/>
                {/*<Button variant={props.filter === "all" ? "outlined" : "contained"} color="success"*/}
                {/*        onClick={handlerCreator('all')}>All</Button>*/}
                {/*<Button variant={props.filter === "active" ? "outlined" : "contained"} color="error"*/}
                {/*        onClick={handlerCreator("active")}>Active</Button>*/}
                {/*<Button variant={props.filter === "completed" ? "outlined" : "contained"} color="secondary"*/}
                {/*        onClick={handlerCreator("completed")}>Completed</Button>*/}

            </div>
        </div>
    );
});
type ButtonWithMemoPropsType={
    title: string
    color:  'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
    variant: 'text' | 'outlined' | 'contained'
    onClick: ()=>void
}
const ButtonWithMemo=memo((props:ButtonWithMemoPropsType)=>{
    return <Button variant={props.variant}
                   color={props.color}
                   onClick={props.onClick}>{props.title}
    </Button>
})
export default TodoList;