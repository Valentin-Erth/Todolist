import React, {ReactNode} from "react";
import {useMemo} from "react";
type SlowComponentPropsType={
  children: ReactNode
}

export const SlowComponent =() => {
  //можно React.memo поместим компоненту в кэш, вызовется 1 раз, и пока пропсы не меняются не вызываем
  console.log('SlowComponent re-render...');
  let now = performance.now();
    while (performance.now() - now < 1000) {
      // Artificial delay -- do nothing for 100ms
    }
  // useMemo(()=>{//закешировали эту операцию, больше не запускаем цикл
  //   let now = performance.now();
  //   while (performance.now() - now < 1000) {
  //     // Artificial delay -- do nothing for 100ms
  //   }
  //
  // },[])
  return <p>I am a very slow component tree.</p>;
}
