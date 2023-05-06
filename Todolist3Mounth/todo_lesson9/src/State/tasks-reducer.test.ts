import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, setTasksAC, tasksReducer} from './tasks-reducer'
import {AddTodolistAC, RemoveTodolistAC, setTodolistAC} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";
import {TasksStateType} from "../AppWithRedux/AppWithRedux";

let startState: TasksStateType
beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                id: '1', title: 'CSS', status: TaskStatuses.New, todoListId: "todolistId1", startDate: "",
                deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: ""
            },
            {
                id: '2', title: 'JS', status: TaskStatuses.Completed, todoListId: "todolistId1", startDate: "",
                deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: ""
            },
            {
                id: '3', title: 'React', status: TaskStatuses.New, todoListId: "todolistId1", startDate: "",
                deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: ""
            }
        ],
        'todolistId2': [
            {
                id: '1', title: 'bread', status: TaskStatuses.New, todoListId: "todolistId2", startDate: "",
                deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: ""
            },
            {
                id: '2', title: 'milk', status: TaskStatuses.Completed, todoListId: "todolistId2", startDate: "",
                deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: ""
            },
            {
                id: '3', title: 'tea', status: TaskStatuses.New, todoListId: "todolistId2", startDate: "",
                deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: ""
            }
        ]
    }
})
test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC('2', 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {
                id: '1', title: 'CSS', status: TaskStatuses.New, todoListId: "todolistId1", startDate: "",
                deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: ""
            },
            {
                id: '2', title: 'JS', status: TaskStatuses.Completed, todoListId: "todolistId1", startDate: "",
                deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: ""
            },
            {
                id: '3', title: 'React', status: TaskStatuses.New, todoListId: "todolistId1", startDate: "",
                deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: ""
            }
        ],
        'todolistId2': [
            {
                id: '1', title: 'bread', status: TaskStatuses.New, todoListId: "todolistId2", startDate: "",
                deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: ""
            },
            {
                id: '3', title: 'tea', status: TaskStatuses.New, todoListId: "todolistId2", startDate: "",
                deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: ""
            }
        ]
    })
})
test('correct task should be added to correct array', () => {
    const newTask = {
        id: '4', title: 'cofee', status: TaskStatuses.New, todoListId: "todolistId2", startDate: "",
        deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: ""
    }
    const action = addTaskAC('todolistId2', newTask)

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('cofee')
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})
test('status of specified task should be changed', () => {
    const action = changeTaskStatusAC('2', TaskStatuses.New, 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.Completed)
    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.New)
})
test('title of specified task should be changed', () => {
    const action = changeTaskTitleAC('3', "Redux", 'todolistId1')

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe('milk')
    expect(endState["todolistId1"][2].title).toBe("Redux")
})
test('new array should be added when new todolist is added', () => {
    const action = AddTodolistAC({id: "1", title: "What to learn", addedDate: "", order: 0})

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    expect(keys.length).toBe(4)
    })
test('property with todolistId should be deleted', () => {
    const action = RemoveTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})
test('empty arrays should be added when we set todolists', () => {
    const action = setTodolistAC([
        {id: "1", title: "title 1", addedDate: "", order: 0},
        {id: "2", title: "title 1", addedDate: "", order: 0}
    ])

    const endState = tasksReducer({}, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])
})
test('tasks should be added for todolists', () => {
    const action = setTasksAC("todolistId1", startState["todolistId1"] )

    const endState = tasksReducer({
        "todolistId2": [],
        "todolistId1": []
    }, action)
    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId2"].length).toBe(0)
  })