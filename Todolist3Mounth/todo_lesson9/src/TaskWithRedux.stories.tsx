import {action} from '@storybook/addon-actions';
import React from "react";
import {TaskWithRedux} from "./TaskWithRedux";
import {ReduxStoreProviderDecorator} from "./stories/decorators/ReduxStoreProviderDecorator";
import {TaskPriorities, TaskStatuses} from "./api/todolists-api";

export default {
    title: "TaskWithRedux component",
    component: TaskWithRedux,
    decorators: [ReduxStoreProviderDecorator]
}
const ChangeTaskCallback=action("Task changed")

export const TaskBaseExample=()=>{
    return <>
        <TaskWithRedux todoListId={"todolistId1"}
              task={{id:"1",title: "JS", status:TaskStatuses.Completed,todoListId: "todolistId1",startDate:"",
                  deadline:"",addedDate:"",order:0,priority: TaskPriorities.Low, description:""}}/>
        <TaskWithRedux todoListId={"todolistId2"}
              task={{id:"2",title: "React",status:TaskStatuses.New,todoListId: "todolistId2",startDate:"",
                  deadline:"",addedDate:"",order:0,priority: TaskPriorities.Low, description:""}}/>
            </>
}