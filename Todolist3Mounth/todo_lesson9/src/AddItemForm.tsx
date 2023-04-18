import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type AddItemFormType = {
    maxLengthUserMessage: number
    addNewItem: (title: string) => void
}
export const AddItemForm: FC<AddItemFormType> =React.memo ((
    {
        maxLengthUserMessage,
        addNewItem
    }) => {
    console.log("AddItemForm is called")
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const changeLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            addNewItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const onKeyDownAddItem = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addItem()

    const userErrorMessage = error && <div style={{color: "hotpink"}}>Title is required!</div>
    const isUserMessageToLong: boolean = title.length > maxLengthUserMessage
    const isAddBtnDisabled = !title.length || isUserMessageToLong || error
    const userMaxLengthMessage =
        isUserMessageToLong && <div style={{color: "hotpink"}}>Task title is to long!</div>
    const inputErrorClasses = error || isUserMessageToLong ? "input-error" : ""
// const onKeyDownAddItemHandler=isAddBtnDisabled
const buttonSettings={maxWidth:"38px",maxHeight:"38px",minWidth:"38px",minHeight:"38px", }
    return (
        <div>
            <TextField id="outlined-basic"
                       label={error?"Title is requared": "Please type out..."}
                       variant="outlined"
                       error={error}
                       placeholder="Please, enter title"
                       value={title}
                       onChange={changeLocalTitle}
                       onKeyDown={onKeyDownAddItem}
                       size={"small"}
            />
            {/*<input*/}
            {/*    value={title}*/}
            {/*    placeholder="Please, enter title"*/}
            {/*    onChange={changeLocalTitle}*/}
            {/*    onKeyDown={onKeyDownAddItem}*/}
            {/*    className={inputErrorClasses}*/}
            {/*/>*/}
            {/*<button disabled={isAddBtnDisabled} onClick={addItem}>+</button>*/}
            <Button style={buttonSettings}
                    size="small" variant="contained"
                    disabled={isAddBtnDisabled}
                    onClick={addItem}>+</Button>
            {userMaxLengthMessage}
            {/*{userErrorMessage}*/}
        </div>
    );
} );

