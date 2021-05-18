import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";


export type I_pageSubmitModal = {
  showModal:boolean,
  handleModalClose: ()=> void,
  handleSubmit:()=>void,
};
export const PageTaskSubmitModal = ({showModal,handleModalClose,handleSubmit}:I_pageSubmitModal) => {

  return (
    <>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to End this conversation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
             Completing this action will permanently terminate your conversation. Could you please make sure you have completed all the task to get token.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default PageTaskSubmitModal;