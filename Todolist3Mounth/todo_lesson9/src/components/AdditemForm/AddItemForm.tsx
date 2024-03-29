import React, {FC} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useAdditemForm} from "./hooks/useAdditemForm";

type AddItemFormType = {
    maxLengthUserMessage: number
    addNewItem: (title: string) => void
    block?: boolean
}
export const AddItemForm: FC<AddItemFormType> = React.memo((
    {
        maxLengthUserMessage,
        addNewItem,
        block
    }) => {
    console.log("AddItemForm is called")
    const {title, error, changeLocalTitle, onKeyDownAddItem, addItem} = useAdditemForm(addNewItem)

    const userErrorMessage = error && <div style={{color: "hotpink"}}>Title is required!</div>
    const isUserMessageToLong: boolean = title.length > maxLengthUserMessage
    const isAddBtnDisabled = !title.length || isUserMessageToLong || error|| block
    const userMaxLengthMessage =
        isUserMessageToLong && <div style={{color: "hotpink"}}>Task title is to long!</div>
    const inputErrorClasses = error || isUserMessageToLong ? "input-error" : ""
// const onKeyDownAddItemHandler=isAddBtnDisabled
    const buttonSettings = {maxWidth: "38px", maxHeight: "38px", minWidth: "38px", minHeight: "38px",}
    return (
        <div>
            <TextField id="outlined-basic"
                       label={error ? "Title is requared" : "Please type out..."}
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
                    onClick={addItem}
            >+</Button>
            {userMaxLengthMessage}
            {/*{userErrorMessage}*/}
        </div>
    );
});

