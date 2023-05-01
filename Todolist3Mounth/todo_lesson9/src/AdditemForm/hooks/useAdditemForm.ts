import {ChangeEvent, KeyboardEvent, useState} from "react";

export const useAdditemForm=(onItemAdded:(title:string)=>void)=>{
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const changeLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            onItemAdded(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const onKeyDownAddItem = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addItem()
return {title,error,changeLocalTitle,onKeyDownAddItem,addItem}
}