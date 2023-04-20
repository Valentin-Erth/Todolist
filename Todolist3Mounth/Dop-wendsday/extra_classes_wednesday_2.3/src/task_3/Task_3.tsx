import {ChangeEvent, useState} from 'react';
import { SlowComponent } from './slowComponent/SlowComponent';


//find the problem and fix it as part of composition optimization, memo, children

export const Task_3 = () => {

    return (
    <div>
      <div>Lags when change value</div>
      <Input/>
      <SlowComponent/>
    </div>
  );
};

const Input=()=>{
  const [value, setValue] = useState('');
  const onChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.currentTarget.value);
  return(
      <input type="text" value={value} onChange={onChange} />
  )
}