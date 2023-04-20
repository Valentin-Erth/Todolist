import React, {ReactNode} from "react";
import {useMemo} from "react";
type SlowComponentPropsType={
  children: ReactNode
}

export const SlowComponent =() => {
  console.log('SlowComponent re-render...');

  // useMemo(()=>{
  //   let now = performance.now();
  //   while (performance.now() - now < 1000) {
  //     // Artificial delay -- do nothing for 100ms
  //   }
  //
  // },[])
  return <p>I am a very slow component tree.</p>;
}
