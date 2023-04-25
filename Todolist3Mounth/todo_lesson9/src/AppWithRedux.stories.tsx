import {action} from '@storybook/addon-actions';
import React from "react";
import AppWithRedux from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./State/Store";

export default {
    title: "AppWithRedux component",
    component: AppWithRedux
}
const callback=action("Button add was pressed inside the form")
export const AppWithReduxBaseExample=(props:any)=>{
    return <Provider store={store}><AppWithRedux/></Provider>
}