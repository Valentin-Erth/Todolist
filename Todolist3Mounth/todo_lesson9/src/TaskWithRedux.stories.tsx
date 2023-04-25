import {action} from '@storybook/addon-actions';
import React from "react";
import {TaskWithRedux} from "./TaskWithRedux";
import {store} from "./State/Store";
import {Provider} from "react-redux";

export default {
    title: "TaskWithRedux component",
    component: TaskWithRedux
}
const ChangeTaskCallback=action("Task changed")

export const TaskBaseExample=()=>{
    return <>
        <Provider store={store}><TaskWithRedux todoListId={"todolistId1"}
              task={{id:"1",title: "JS", isDone:true}}/>
        <TaskWithRedux todoListId={"todolistId2"}
              task={{id:"2",title: "React",isDone:false}}/>
            </Provider>
    </>
}