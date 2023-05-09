import {useState} from "react";
import {FilterValuesType, TodoListDomainType} from "../../features/TodolistsList/todolists-reducer";
import {todoListId_1, todoListId_2} from "../id-utils";
import {v1} from "uuid";

export function useTodolist(onTodolistRemoved: (todoListId:string)=>void,
onTodolistAdd: (todoListId:string)=>void)
{
    const [todoLists, setTodoLists] = useState<TodoListDomainType[]>([
        {id: todoListId_1, title: "What to learn", filter: "all", addedDate: "", order: 0},
        {id: todoListId_2, title: "What to buy", filter: "all", addedDate: "", order: 0},
    ])
    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: filter} : tl))
    }
    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))  // 2 tl
        onTodolistRemoved(todoListId)
    }
    const changeTodoListTitle = (title: string, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, title: title} : tl))
    }
    const addTodoList = (title: string) => {
        const NewTodoListId = v1()
        const newTodoList: TodoListDomainType = {
            id: NewTodoListId,
            title: title,
            filter: "all",
            addedDate: "",
            order: 0
        }
        setTodoLists([...todoLists, newTodoList])
        onTodolistAdd(NewTodoListId)
            }
    return {todoLists, changeTodoListFilter,removeTodoList,changeTodoListTitle,addTodoList}
}