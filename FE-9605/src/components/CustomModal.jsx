import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import backIcon from "../assets/back.png";
import "../App.css"

const CustomButton = styled(Button)`
  background-color: transparent;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: transparent;
  }
`;



const CustomModal = ({ show, handleClose, handleConfirm }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Uyarı</Modal.Title>
      </Modal.Header>
      <Modal.Body>Bu görevi silmek istediğinizden emin misiniz?</Modal.Body>
      <Modal.Footer>
        <CustomButton onClick={handleClose}>
          {" "}
          <img  src={backIcon} alt="Back Icon" width="30" height="30"/>
        </CustomButton>
        <Button  onClick={handleConfirm} className="delete-icon">
          
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
