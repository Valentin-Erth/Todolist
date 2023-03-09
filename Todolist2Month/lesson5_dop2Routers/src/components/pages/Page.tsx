import React from 'react';
import {PagesType} from "../Data/dataState";
import {useParams} from "react-router-dom";
import {Error404} from "./Error404";
type PageType={
    pages:PagesType[]
}
export const Page = (props:PageType) => {
    const params=useParams()
        console.log (Number(params.id))

    return (
        <div>
         <div>{(Number(params.id)<props.pages.length)?props.pages[Number(params.id)].heading:<Error404/>}</div>
            <div>{props.pages[Number(params.id)].about}</div>
        </div>
    );
};

