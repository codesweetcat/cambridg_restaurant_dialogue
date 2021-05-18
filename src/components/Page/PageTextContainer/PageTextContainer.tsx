import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getDialogueJsonPhp } from '../../../services/fetch';
import { SettingContext } from '../../../viableContext';
import PageDisplayCard from '../PageDisplayCard/PageDisplayCard';
import TaskDescritionAndBriefing from '../../Page/PageTaskDescriptionAndBriefing/TaskDescriptionAndBriefing';
import { Button } from 'react-bootstrap';
import ErrorDescription from '../ErrorDescription/ErrorDescription';

export interface I_taskData {
'task_name'?:string;
'function_name'?:string;
'mturk_user_id'?:string;
'exp_cond'?:string;
}

export interface I_userUtt_item {
 'user_utt'?: string; 
 'confidence_score'?: string;
                    }
export interface I_dialogue_payLoad {//
  'session_id'?: string
  'utt_number'?: number;
  'user_utt'?:string;
  'user_utt_array'?: I_userUtt_item[] | null;
  'function_name'?:string;
  }

const PageTextContainer = () => {
  const [inputText, setInputText] = useState('');//input text state control
  const [responseStorage, setResponseStorage] = useState<undefined | any>();//response data control
  const [counter,setCounter] = useState(1);//increment 1 for each time
  const [task_des, setTask_des] = useState();// task description
  const [errorDescription,setErrorDescription] = useState('');//response error
  const [sessionId, setSessionId] = useState<string | undefined>();//session id for each conversation
  const [tokenId,setTokenId] = useState(''); //
  const [finalEvaluation, setFinalEvaluation] = useState(true);
  const [showConversation, setShowConversation] = useState(false);
  const [disabledSubmitBtn, setDisabledSubmitBtn] = useState(true)
  // const [error]
  const location = useLocation();
  const mturkArray = location.search.split('&');//workID=&taskID=Task5&expCond=B
  const task_id = mturkArray && mturkArray.length == 3 ? mturkArray[1].split('=')[1] : undefined
  const mturk_user_id = mturkArray && mturkArray.length == 3 ? mturkArray[0].split('=')[1] : undefined
  const exp_cond = mturkArray && mturkArray.length == 3 ? mturkArray[2].split('=')[1] : undefined
  const {_endpointHubPHP} = useContext(SettingContext);//passing globle configure viable to child components
  const {_maxOfUtterTurnsEnableTokenBtn} = useContext(SettingContext);
 useEffect(()=>{
   if(!task_id || !mturk_user_id) return;
   const jsonData: I_taskData = {}
   jsonData['task_name'] = task_id
   jsonData['function_name'] = 'getDescriptionByID'//getDescriptionByID  
   jsonData['mturk_user_id'] = mturk_user_id 
   jsonData['exp_cond'] = exp_cond 
   getDialogueJsonPhp(_endpointHubPHP,jsonData)
    .then(res=>{
    if(res.error){
     if(res.error_display) setErrorDescription(res.error_description)
    }else{
    setTask_des(res.data.task_description)
    setSessionId(res.data.session_id)
    } 
    })
 },[task_id])
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    const { value } = e.target
    setInputText(value)
  }
  const handleSubmitUttOrEndDialog = (isUtt:boolean) => {
      setCounter(counter=>counter+1);
      const jsonData: any = {}
      jsonData['session_id'] = sessionId
      jsonData['utt_number'] = counter
      jsonData['user_utt'] = isUtt? inputText : 'hangup'
      jsonData['function_name'] = "getDialogueUtt"
      //user_utt_array
      jsonData['user_utt_array'] = null
      jsonData['hangup'] = isUtt? '0' : '1'

      getDialogueJsonPhp(_endpointHubPHP,jsonData).then((res:any)=>{
      console.log("response data:" ,jsonData, res);
      if(res.error){// error coming
          if(res.error_display) setErrorDescription(res.error_description)
              else if (res.error_description == "getDialogueUtt(): hungup but system says success=false"){
                setFinalEvaluation(false)
              }
          else {
              setErrorDescription('Server is down. Could you please try again later...')
          }
      }
    
      else if(isUtt && res.data.system_utt){//sequence exchange
        if( inputText.trim().toLowerCase() === 'goodbye' && res.data.success ||  res.data.intent && res.data.intent === 'returnGoodbye' && res.data.success || res.data.utt_number >= _maxOfUtterTurnsEnableTokenBtn){//isUtt && res.data.intent && res.data.intent === 'returnGoodbye' ||
          console.log('returnGoodbye',res.data.utt_number);   
          setDisabledSubmitBtn(false)
          res['input'] = inputText;
          console.log(res.data.system_utt);
          const newResponseStorage = !responseStorage ? [res]:[...responseStorage,res]
          setResponseStorage(newResponseStorage)
          setInputText('');
        }else{
        res['input'] = inputText;
        console.log(res.data.system_utt);
        const newResponseStorage = !responseStorage ? [res]:[...responseStorage,res]
        setResponseStorage(newResponseStorage)
        setInputText('');
       }
      }else if (!isUtt){//token issue
        if(res.data.issued_token){
          setTokenId(res.data.issued_token)
        }
      }
    })
  }

  const handleKeypress = (e:any)=> {
    if(e.charCode == 13){
      handleSubmitUttOrEndDialog(true);
    }
  }

  const handleShow = () => {
    showConversation ? handleSubmitUttOrEndDialog(false) :  setShowConversation(true);
  }

  return(
    <>
      <TaskDescritionAndBriefing task_des={task_des} 
          disabledSubmitBtn={disabledSubmitBtn}
          showConversation={showConversation} 
          handleShow={handleShow} 
          tokenId={tokenId} 
          finalEvaluation={finalEvaluation}
      />
      {!errorDescription? 
       (showConversation && sessionId && !tokenId && finalEvaluation) && (
        <>
          <PageDisplayCard responseStorage={responseStorage} />
          <br></br>
          <div className="container searchContainer">
            <div className="search card card-body">
                <div className="input-group">
                    <input type="text" id="searchUtt" autoComplete="off" aria-label="utt-input" className="form-control" placeholder="utt" value={inputText} 
                    onChange={handleChange}
                    onKeyPress={handleKeypress}
                    />
                    <Button onClick={()=>handleSubmitUttOrEndDialog(true)}>Send</Button>
                </div>
              </div>
          </div>
        </>
      ):
      errorDescription && <ErrorDescription errorDescription={errorDescription}/>
    }
    </>
  )
}

export default PageTextContainer;
