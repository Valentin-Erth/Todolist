import React from 'react';
type TasksPropsType = {
    datas: DataType
}

type DataType = {
    title: string
    tasks: Array<TaskType>
    students: Array<string>
}
type TaskType = {
    taskId: number
    title: string
    isDone: boolean
}

export const TASKS = (props: TasksPropsType) => {
    // debugger;
    return (
        <div>
            <div>
                <h3>{props.datas.title}</h3>
                <input type="button" value="text inside" />
                <ul>
                    {props.datas.tasks.map(el => {
                        return (
                            <li key={el.taskId}><input type="checkbox" checked={el.isDone} />
                                {/* <span>{el.taskId}</span> */}
                                <button >x</button>
                                <span>{el.title}</span>

                            </li>
                        )
                    })}
                </ul>
            </div>
            <div>
                <h3>{props.datas.students[1]}</h3>
            </div>
            <select>
                {props.datas.students.map(el => {
                    return (
                        <option>{el}</option>
                    )
                })}
            </select>
        </div>

    );
};
