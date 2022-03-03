import React from "react";
import ReactDOM from "react-dom";

import style from './Modal.module.css';

const Modal = ({isOpen,children}) => {
    if(!isOpen) return null

    return ReactDOM.createPortal(<div className={style.modal}>
        {children}
    </div>, document.getElementById("modal"))
}

export default Modal;