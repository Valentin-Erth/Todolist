import React, {ChangeEvent, FC, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
    spanClasses?: string
    inputClasses?: string
}
export const EditableSpan: FC<EditableSpanPropsType> = (
    {
        title,
        spanClasses,
        changeTitle,
    }) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [localTitle, setlocalTitle] = useState<string>(title)
    const changeLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setlocalTitle(e.currentTarget.value)
    }
    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        setEditMode(false)
        changeTitle(localTitle)
    }
    return (
        editMode
            ? <input
                value={localTitle}
                onChange={changeLocalTitle}
                autoFocus={true}
                onBlur={offEditMode}/>
            : <span className={spanClasses}
                    onDoubleClick={onEditMode}>{title}</span>
    );
};

