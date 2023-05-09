import React, {ChangeEvent, FC, MouseEvent, useCallback, useEffect, useMemo, useState} from "react";
type ItemsType={
    id:string
}
const ExampleBuddy:FC=()=>{
    const [Items, setItems] = useState<ItemsType[]>([]);
    useEffect(() => {

    }, []);
    const gfghf= useMemo(() => {

    }, []);
    const onClickExample = useCallback((event: MouseEvent<HTMLButtonElement>) => {

    }, []);

    const onInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {

    }, []);

    const onButtonClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {

    }, []);

    return (
        <div>
            {Items.map((Item) => (
                <div key={Item.id}>

                </div>
            ))}
            <div>
                <input type="text" onChange={onInputChange}/>
                <button onClick={onClickExample}> fffff</button>
                <button onClick={onButtonClick}>gggggg </button>
            </div>
        </div>

    )

}