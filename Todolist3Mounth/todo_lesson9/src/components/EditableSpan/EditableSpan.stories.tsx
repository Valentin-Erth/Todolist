import {action} from '@storybook/addon-actions';
import React from "react";
import {EditableSpan} from "./EditableSpan";

export default {
    title: "EditableSpan component",
    component: EditableSpan
}
const CnangeCallback=action("Value changed")
export const EditableSpanBaseExample=(props:any)=>{
    return <EditableSpan title={"Start value"} changeTitle={CnangeCallback}/>
}
