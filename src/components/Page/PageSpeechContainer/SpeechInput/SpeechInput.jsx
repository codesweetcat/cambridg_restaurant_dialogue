import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getDialoguePhp ,getDialogueJsonPhp } from '../../../../services/fetch';
import { getNameofAudioFile, setDataIntoArray } from '../../../../utils/localStorage';
import { SettingContext } from '../../../../viableContext';
import TaskDescritionAndBriefing from '../../../Page/PageTaskDescriptionAndBriefing/TaskDescriptionAndBriefing';
import PageDisplayCard from '../../PageDisplayCard/PageDisplayCard';
import ErrorDescription from '../../ErrorDescription/ErrorDescription';




// The speech recognition interface lives on the browser’s window object
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; // if none exists -> undefined
const recognition = new SpeechRecognition(); //new webkitSpeechRecognition();
const synth = window.speechSynthesis; //speech speak

function speak(text) {
  // Create a new instance of SpeechSynthesisUtterance.
	var msg = new SpeechSynthesisUtterance();
  // Set the text.
	msg.text = text;
  msg.volume = 1;
	msg.rate = 1;
	msg.pitch = 1;
  
  // If a voice has been selected, find the voice and set the
  // utterance instance's voice attribute.
	// if (voiceSelect.value) {
		msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == "Google UK English Male"; })[0];
	// }
  // Queue this utterance.
	window.speechSynthesis.speak(msg);
}


const SpeechInput = () => {
  const [inputText, setInputText] = useState('');//input text state control
  const [responseStorage, setResponseStorage] = useState();//response data control
  const [isRecording, setIsRecording] = useState(false)
  const [counter,setCounter] = useState(1);
  const [video,]=useState(React.createRef());
  const [task_des, setTask_des] = useState();
  const [errorDescription,setErrorDescription] = useState('');
  const [sessionId, setSessionId] = useState();
  const [tokenId,setTokenId] = useState(''); 
  const [finalEvaluation, setFinalEvaluation] = useState(true);
  const [showConversation, setShowConversation] = useState(false);
  const location = useLocation();
  const mturkArray = location.search.split('&');//?workerID=A2VP8AP&taskID=T5
  const task_id = mturkArray && mturkArray.length == 3 ? mturkArray[1].split('=')[1] : undefined
  const mturk_user_id = mturkArray && mturkArray.length == 3 ? mturkArray[0].split('=')[1] : undefined
  const exp_cond = mturkArray && mturkArray.length == 3 ? mturkArray[2].split('=')[1] : undefined
  const [disabledSubmitBtn, setDisabledSubmitBtn] = useState(true)
  const {_maxOfUtterTurnsEnableTokenBtn} = useContext(SettingContext);
  const {_numOfHypothesis} = useContext(SettingContext);
  const {_endpointHubPHP} = useContext(SettingContext);//passing globle configure viable to child components

  function micBtnClick() {
    if(!isRecording) { // Start Voice Recognition
      setIsRecording(isRecording=>!isRecording) 
      recognition.interimResults = false;
      recognition.maxAlternatives = _numOfHypothesis;
      recognition.start(); // First time you have to allow access to mic!
        // recorder.start();
    }
    else {
      recognition.stop();
    }
  }
  const voiceCommands = () => {
      //firs when stop talking
      recognition.onresult = (event) => {


        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        console.log('transcript', event.results[0])

              setInputText(transcript);
              const hypothesis_array = []
              for(let index=0; index<event.results[0].length; index++){//generate utt array
                console.log('transcript', event.results[0][index]);
                const element = {}
                element['user_utt'] = event.results[0][index]['transcript']//user_utt
                element['confidence_score'] = event.results[0][index]['confidence']//confidence_score
                hypothesis_array.push(element)
              }
              // event.results[0].map(item=>{
              
              // })
              console.log('transcript', hypothesis_array,
              event,event.results[0][0]['transcript']);//hypothesis array
              setCounter(counter=>counter+1);
              const jsonData = {}
              jsonData['session_id'] = sessionId
              jsonData['utt_number'] = counter
              jsonData['user_utt'] = transcript 
              jsonData['function_name'] = "getDialogueUtt_demo"//getDialogueUtt_demo
              //user_utt_array
              jsonData['user_utt_array'] = JSON.stringify(hypothesis_array)
              jsonData['hangup'] = '0' 
        

                getDialogueJsonPhp(_endpointHubPHP,jsonData).then((res)=>{
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
                  else if( res.data.system_utt){//sequence exchange
                    if(transcript.toLowerCase().trim()==="goodbye" && res.data.success || res.data.intent && res.data.intent === 'returnGoodbye' && res.data.success || res.data.utt_number >= _maxOfUtterTurnsEnableTokenBtn){//isUtt && res.data.intent && res.data.intent === 'returnGoodbye' ||
                        console.log('returnGoodbye',res.data.utt_number);   
                        setDisabledSubmitBtn(false)
                      }
                    res['input'] = transcript;
                    console.log(res.data.system_utt,transcript, inputText);
                    const newResponseStorage = !responseStorage?[res]:[...responseStorage,res]
                    setResponseStorage(newResponseStorage)
                    recognition.stop();
                    setInputText('');
                    speak(res.data.system_utt)
                  }
              })
      }
        recognition.onend = function() {
          setIsRecording(isRecording=>!isRecording)
          console.log("Speech recognition service disconnected");
        }
  }

  useEffect(()=>{
    if(!task_id || !mturk_user_id) return;
    const jsonData = {}
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
     console.log('json',res)
     } 
     })
  },[task_id])
  useEffect(()=>{
    if(!showConversation) return;
    speak('Welcome to the Cambridge restaurant information system.  How may I help you?')
  },[showConversation])

  useEffect(()=>{
      voiceCommands();
  })
  
  return (
    <>
          <PageDisplayCard responseStorage={responseStorage} />
          <br/>
          <div className="container searchContainer">
              <div className="search card card-body">
                  <div className="input-group">
                      <div className="container">
                              <form id="search-form">
                                  <input name="q" type="text" placeholder="recording utt" value={inputText} readOnly autoComplete="off" autoFocus/>
                                  {recognition && <button type="button" onClick={micBtnClick}><i className={isRecording ? "fa fa-microphone-slash red-slash" : "fa fa-microphone"}></i></button> }
                              </form>
                              <p className="info"></p>
                      </div>

                      {/* <div className="container text-center mt-2">
                      <button className="but but-primary"  onClick={()=>handleSubmitUttOrEndDialog(false)}>End Conversation to Get Token</button>
                      </div> */}
                  </div>
              </div>
              <div>
                  <ul className="list-unstyled" id="ul"></ul>
              </div>
          </div>
        </>
  )
}

export default SpeechInput;