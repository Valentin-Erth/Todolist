import React from 'react';
import {PagesType} from "../Data/dataState";
import {useParams} from "react-router-dom";
import {Error404} from "./Error404";
import {Content} from "../Content";
type PageType={
    pages:PagesType[]
}
export const Page = (props:PageType) => {
    const params=useParams()
    let magicNumber=Number(params.id);
        // console.log (`params: `,Number(params.id))
    console.log(magicNumber)

    return (
        <>
            {magicNumber<=props.pages.length-1
                ?<Content heading={props.pages[Number(params.id)].heading}
                          pages={props.pages[Number(params.id)].about}/>
                :<Error404/>
            }
        </>


        // <div>
        //  <div>{props.pages[Number(params.id)].heading}</div>
        //     <div>{props.pages[Number(params.id)].about}</div>
        // </div>
    );
};

