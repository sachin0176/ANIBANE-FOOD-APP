import React, { Fragment } from "react";
import styles from "./Modal.module.css";
import  ReactDOM  from "react-dom";

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onClose}>{props.children}</div>;
};

const ModalOverlay = (props) => {
 return  <div className={styles.modal}>
    {props.children}
  </div>;
};
const Modal = (props) => {

    const protalElements=document.getElementById('overlays');
  return<Fragment>
    {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, protalElements)}
    {ReactDOM.createPortal(<ModalOverlay >{props.children}</ModalOverlay>,protalElements)}
  </Fragment>
};

export default Modal;
