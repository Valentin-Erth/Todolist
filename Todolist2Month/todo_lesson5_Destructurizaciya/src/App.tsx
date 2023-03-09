import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
type TodolidtType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TaskStateType = {
    [key: string]: TaskType[]
}

function App() {
//BLL:
    const todolistId1 = v1();
    const todolistId2 = v1();
    const [todolists, setTodolists] = useState<TodolidtType[]>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]);
    const [tasksObj, setTasksObj] = useState<TaskStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "Pen", isDone: true},
            {id: v1(), title: "Laptop", isDone: false},
            {id: v1(), title: "Notepad", isDone: false}
        ]
    });

    const removeTask = (id: string, todolistId: string) => {
        // debugger;
        // const tasksForUpdate = tasksObj[todolistId];
        // const filteredTasks = tasksObj[todolistId].filter(t => t.id != id);
        // const copyTasksObj={...tasksObj}
        // copyTasksObj[todolistId] = filteredTasks;
        // setTasksObj(copyTasksObj);
        setTasksObj({
            ...tasksObj,
            [todolistId]: tasksObj[todolistId].filter(t => t.id != id)
        })
    }
    const addTask = (title: string, todolistId: string) => {
        let newTask = {id: v1(), title: title, isDone: false};
        let tasksForUpdate = tasksObj[todolistId];
        // const newTasks = [newTask, ...tasksForUpdate];
        // const copyTask={...tasksObj};
        // copyTask[todolistId] = newTasks;
        // setTasksObj(copyTask);
        setTasksObj({...tasksObj, [todolistId]: [newTask, ...tasksForUpdate]})
    }
    const changeStatus = (taskId: string, newisDone: boolean, todolistId: string) => {
        // const tasksForUpdate = tasksObj[todolistId];
        // const updateTasks=tasksForUpdate.map(t=>t.id===taskId?{...t,isDone:isDone}:t)
        // const copyTasks={...tasksObj}
        // copyTasks[todolistId]=updateTasks
        // setTasksObj(copyTasks)
        setTasksObj({
            ...tasksObj,
            [todolistId]: tasksObj[todolistId].map(t => t.id === taskId ? {...t, isDone: newisDone} : t)
        })
    }
    const changeTodolistFilter = (value: FilterValuesType, todolistId: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: value} : tl))
    }
    const removeTodolist = (todolistsId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistsId))
        delete tasksObj[todolistsId]
    }
    const getTasksforTodolist=(tasks:TaskType[],filter:FilterValuesType)=>{
                switch(filter){
            case "active":
                return tasks.filter(t => t.isDone === false);
            case "completed":
                return  tasks.filter(t => t.isDone === true);
            default:
                return tasks
        }
    }
    const todolistComponents = todolists.map(tl => {
        const filteredTasks:TaskType[]=getTasksforTodolist(tasksObj[tl.id],tl.filter)
        // let tasksForTodolist = tasksObj[tl.id];
        // if (tl.filter === "active") {
        //     tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
        // }
        // if (tl.filter === "completed") {
        //     tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
        // }
        return (
            <Todolist
                key={tl.id}
                todolistId={tl.id}
                title={tl.title}
                tasks={filteredTasks}
                removeTask={removeTask}
                changeTodolistFilter={changeTodolistFilter}
                addTask={addTask}
                changeTaskStatus={changeStatus}
                filter={tl.filter}
                removeTodolist={removeTodolist}
            />
        )
    })
    //UI
    return (
        <div className="App">
            {todolistComponents}
        </div>
    );
}
export default App;
