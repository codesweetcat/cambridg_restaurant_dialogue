import { useEffect } from "react";

export default function useScrollBottom(uiContent_ref:any,response:any){
  const scrollToBottom = () => {
    // console.log('res',uiContent_ref?.current?.scrollHeight);
    uiContent_ref.current.scrollTo(0,uiContent_ref.current.scrollHeight);
  }
  useEffect(scrollToBottom,[response])
}