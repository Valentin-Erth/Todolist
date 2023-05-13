import {v1} from "uuid";
import {
    AddTodolistAC, changeTodolistEntityStatusAC, ChangeTodolistFilerAC,
    ChangeTodolistTitleAC, FilterValuesType,
    RemoveTodolistAC, setTodolistAC, TodoListDomainType,
    todolistsReducer
} from "./todolists-reducer";
import {RequestStatusType} from "../../AppWithRedux/app-reducer";

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodoListDomainType>
beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: "", order: 0,entityStatus:"idle"},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: "", order: 0,entityStatus:"idle"}
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId1))
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});
test('correct todolist should be added', () => {
    let newTodolist = {id: "1", title: "Stack", addedDate: "", order: 0};
    const endState = todolistsReducer(startState, AddTodolistAC(newTodolist))
    expect(endState.length).toBe(4);
    expect(endState[2].title).toBe("Stack");
});
test('correct todolist should be change title', () => {
    //
    let newTodolistTitle = "New Todolist";
    const endState = todolistsReducer(startState, ChangeTodolistTitleAC(todolistId2, newTodolistTitle))
    //
    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = "completed";
    // const action:ActionType={
    //     type:"CHANGE-TODOLIST-FILTER",
    //     filter: newFilter,
    //     id: todolistId2}
    const endState = todolistsReducer(startState, ChangeTodolistFilerAC(todolistId2, newFilter));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
test('todolists should be set to the state ', () => {
    let action= setTodolistAC(startState);

    const endState = todolistsReducer([],action);

    expect(endState.length).toBe(2);
    });
test('correct entityStatus of todolist should be changed', () => {
    let newStatus: RequestStatusType = "loading";
       const endState = todolistsReducer(startState, changeTodolistEntityStatusAC(todolistId2, newStatus));

    expect(endState[0].entityStatus).toBe("idle");
    expect(endState[1].entityStatus).toBe(newStatus);
});