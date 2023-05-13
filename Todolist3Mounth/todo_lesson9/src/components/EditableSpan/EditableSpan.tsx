import React, {ChangeEvent, FC, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
    spanClasses?: string
    inputClasses?: string
    block?: boolean
}
export const EditableSpan: FC<EditableSpanPropsType> = React.memo((
    {
        title,
        spanClasses,
        changeTitle, block
    }) => {
    console.log("EditableSpan is called")
    const [editMode, setEditMode] = useState<boolean>(false)
    const [localTitle, setlocalTitle] = useState<string>(title)
    const changeLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setlocalTitle(e.currentTarget.value)
    }
    const onEditMode = () => {
        if (!block) {
            setEditMode(true)
        }
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
});

