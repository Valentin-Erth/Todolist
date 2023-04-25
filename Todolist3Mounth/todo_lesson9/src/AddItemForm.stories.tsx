import {action} from '@storybook/addon-actions';
import React from "react";
import {AddItemForm} from "./AddItemForm";

export default {
    title: "AddItemForm component",
    component: AddItemForm
}
const callback=action("Button add was pressed inside the form")
export const AddItemFormBaseExample=(props:any)=>{
    return <AddItemForm maxLengthUserMessage={15} addNewItem={callback}/>
}