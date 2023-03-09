import React from "react";
type SuperButtonType={
    name:string
    callBack:()=>void
}
export const SuperButton=(props:SuperButtonType)=>{
    const onClickHandler=()=>{
       props.callBack()
    }
    return(
        <button onClick={onClickHandler}>{props.name}</button>
    )
}