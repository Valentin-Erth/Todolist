import {action} from '@storybook/addon-actions';
import React from "react";
import AppWithRedux from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./Store";
import {ReduxStoreProviderDecorator} from "../stories/decorators/ReduxStoreProviderDecorator";

export default {
    title: "AppWithRedux component",
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
}
const callback=action("Button add was pressed inside the form")
export const AppWithReduxBaseExample=(props:any)=>{
    return <AppWithRedux/>
}