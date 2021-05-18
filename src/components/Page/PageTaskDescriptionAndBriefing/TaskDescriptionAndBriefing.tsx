import React, { useState } from 'react';
import {Button, Col, Row} from "react-bootstrap"
import PageTaskSubmitModal from './PageTaskSubmitModal/PageTaskSubmitModal';


const TaskDescritionAndBriefing = ({task_des,tokenId, finalEvaluation,errorMessage,showConversation,handleShow,disabledSubmitBtn}:any) => {
  const [showModal, setShowModal] = useState(false);
  const handleShowModel = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  return(

<>
{task_des && finalEvaluation && (
<div className="container searchContainer">
  <Row>
      <Col>
            <div>
            <h2>Task Description</h2>
              <div>{task_des} &nbsp; &nbsp; </div>
             {!tokenId && finalEvaluation && 
                <Button variant="success" className="but but-primary" 
                onClick={handleShow} 
                       disabled={showConversation ? disabledSubmitBtn : false}

                style={{marginTop:18}}
                
                >
               {/*  <Button variant="success" className="but but-primary" onClick={showConversation?handleShowModel:handleShow} style={{marginTop:18}}> */}
                    {showConversation? 'Get token': 'Start dialogue'}
               </Button>
               }
            </div>
       
      </Col>
      <Col>
        <h2>Instructions</h2>
        <p>
          Please read the task description on the left and then press ‘Start dialogue’ to open the interface.
          To speak, press the microphone icon on the right.  Once you have gathered from the system all information
          according to the task description, you can say “goodbye” to close the dialogue, after which you can click a
          button to obtain the token you need to complete the task on Amazon Mechanical Turk.  
        </p>
      </Col>
  </Row>
  <PageTaskSubmitModal showModal={showModal} handleModalClose={handleModalClose} handleSubmit ={handleShow}/>
 </div>
   )
  }

<div className="container searchContainer">
    {tokenId && finalEvaluation && (
        <>
          <h2>Token: {tokenId}</h2>
          <p>Copy this token, paste it in the box on the Amazon Mechanical Turk page and press ‘Validate’ to proceed to the questionnaire.
          </p>
        </>
      )
    }
    {!finalEvaluation &&(
        <div>It looks like something went wrong.  Please reload this page to start over.
        Remember to try and get the system to recommend a restaurant that matches the task description.</div>
      )}
</div>
</>
)
    }

export default TaskDescritionAndBriefing;