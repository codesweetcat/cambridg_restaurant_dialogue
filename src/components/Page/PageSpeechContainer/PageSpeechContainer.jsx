import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getDialoguePhp ,getDialogueJsonPhp } from '../../../services/fetch';
import { getNameofAudioFile, setDataIntoArray } from '../../../utils/localStorage';
import { SettingContext } from '../../../viableContext';
import TaskDescritionAndBriefing from '../../Page/PageTaskDescriptionAndBriefing/TaskDescriptionAndBriefing';
import ErrorDescription from '../ErrorDescription/ErrorDescription';

// import PageDisplayCard from './PopulateUI';
import './speech.css'
import SpeechInput from './SpeechInput/SpeechInput'

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

const PageSpeechContainer=() => {
  const [inputText, setInputText] = useState('');//input text state control
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
  const {_endpointHubPHP} = useContext(SettingContext);//passing globle configure viable to child components

  let recorder;
  let chunks=[]
  const audioOptions = {
    tag: 'audio',
    type: 'audio/ogg',
    ext: '.ogg',
    setting: {audio: true}
};
  useEffect(()=>{
        if(!SpeechRecognition)alert('your browser does not support micphone')
    },[])
const startRecording=(e)=>{
  e.preventDefault();
  chunks = [];
  recorder.start();
}
const stopRecording=(e)=>{
   e.preventDefault();
  recorder.stop();
}

    const uploadMediaRecord=()=>{
      console.log('upload_recordeing now ')
    let blob = new Blob(chunks, {type: audioOptions.type}),
        url = URL.createObjectURL(blob),
        li = document.createElement('li'),
        mt = document.createElement(audioOptions.tag),
        hf = document.createElement('a');
         let fd = new FormData();
         const filename = getNameofAudioFile('1111',counter);
         console.log('filename',filename)
         counter=+1;
        fd.append("fname", 'test.wav');
        fd.append("audio_data", blob);

        // uploadAudioFile(fd)
        // uploadBlob(blob)

}
// function uploadBlob(blob){
//   var fileType = 'audio'; // or "audio"
// var fileName = 'ABCDEF.wav';  // or "wav"

// var formData = new FormData();
// formData.append(fileType + '-filename', fileName);
// formData.append(fileType + '-blob', blob);

// xhr('https://stg-woc7/bridge/upload.php', formData);

// function xhr(url, data) {
//     var request = new XMLHttpRequest();
//     request.onreadystatechange = function () {
//         if (request.readyState == 4 && request.status == 200) {
//             // callback(location.href + request.responseText);
//             console.log('ready to post')
//         }
//     };
//     request.open('POST', url);
//     request.send(data);}
// }

// const uploadAudioFile=(blobData)=>{
//   fetch(`https://stg-woc7/bridge/upload.php`, {method:"POST", body:blobData})
//             .then(response => {
//                 if (response.ok) return response;
//                 else throw Error(`Server returned ${response.status}: ${response.statusText}`)
//             })
//             .then(response => console.log(response.text()))
//             .catch(err => {
//                 alert(err);
//             });
// }

 

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



  const handleSubmitUttOrEndDialog = (isUtt) => {
    setCounter(counter=>counter+1);
    const jsonData = {}
    jsonData['session_id'] = sessionId
    jsonData['utt_number'] = counter
    jsonData['user_utt'] = isUtt? inputText : 'hangup'
    jsonData['function_name'] = "getDialogueUtt" //getDialogueUtt_demo
    //user_utt_array
    jsonData['user_utt_array'] = null
    jsonData['hangup'] = isUtt? '0' : '1'

    getDialogueJsonPhp(_endpointHubPHP,jsonData).then((res)=>{
    console.log("response data:" ,jsonData, res);
    if(res.error){// error coming
      if(res.error_display) setErrorDescription(res.error_description)
      else if (res.error_description == "getDialogueUtt(): hungup but system says success=false"){
        setFinalEvaluation(false)
      }
    }
  
    else if (!isUtt){//token issue
      if(res.data.issued_token){
        setTokenId(res.data.issued_token)
      }else{
      console.log('issued_token',res.data,res.data.issued_token);
        setFinalEvaluation(false)
      }
    }
  })
}
const handleShow = () => {
  showConversation ? handleSubmitUttOrEndDialog(false) :  setShowConversation(true);
}

  return(
    <>
      <TaskDescritionAndBriefing task_des={task_des}
          disabledSubmitBtn={disabledSubmitBtn}
          tokenId={tokenId}  
          showConversation={showConversation} 
          handleShow={handleShow} 
          finalEvaluation={finalEvaluation}
      />

{!errorDescription? 
       (showConversation && sessionId && !tokenId && finalEvaluation) && (
        <SpeechInput />
        ):
      errorDescription && <ErrorDescription errorDescription={errorDescription}/>
      }
      </>
    )
  }
  
export default PageSpeechContainer;