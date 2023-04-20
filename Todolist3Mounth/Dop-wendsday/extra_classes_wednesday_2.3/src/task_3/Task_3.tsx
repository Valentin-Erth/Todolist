import {ChangeEvent, ReactNode, useMemo, useState} from 'react';
import { SlowComponent } from './slowComponent/SlowComponent';


//find the problem and fix it as part of composition optimization, memo, children
type TaskType={
    children: ReactNode
}
export const Task_3 = (props: TaskType) => {
    const [value, setValue] = useState('');
  const onChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.currentTarget.value);
  //еще возможный вариант useRef, изменение в инпуте буду только в DOM  а не в Reacte
    const Slow=useMemo(()=><SlowComponent/>,[])//запомнили результат вызова функции
  return (
    <div>
      <div>Lags when change value</div>
        {/*<Inpit/>*/}
        <input type="text" value={value} onChange={onChange}/>
        {/*{props.children}*/}// передали компоненту через чилдрены, поместили в объект чилдрен, пропсы не меняются при изменении Task_3
        {Slow}
    </div>
  );
};

// const Input=()=>{
//   const [value, setValue] = useState('');
//   const onChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.currentTarget.value);
//   return(
//       <input type="text" value={value} onChange={onChange} />
//   )
// }