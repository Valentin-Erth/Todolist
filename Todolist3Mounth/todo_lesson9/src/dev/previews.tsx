import React from "react";
import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {ExampleLoaderComponent, PaletteTree} from "./palette";
import App from "../App/App";
import AppWithRedux from "../AppWithRedux/AppWithRedux";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/App">
                <App/>
            </ComponentPreview>
            <ComponentPreview path="/AppWithRedux">
                <AppWithRedux/>
            </ComponentPreview>
            <ComponentPreview
                path="/ExampleLoaderComponent">
                <ExampleLoaderComponent/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;