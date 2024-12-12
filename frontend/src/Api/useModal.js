import React, { useState,useRef } from 'react';

const useModal = () => {

  const [isOpen, setIsOpen] = useState(false);
  const formRef = useRef(null);

  const openModal = () => {
    setIsOpen(true);
    
  };

  const closeModal = () => {
    setIsOpen(false);
    
  };

  const handlePropagation = (e) => {
     e.stopPropagation()
  }

  const Modal = ({title,content,actions}) => {

    return isOpen && 
             <div id="modal-container" ref={formRef} onClick={closeModal}>
               <div className='modal-content' onClick={(e) => handlePropagation(e)}>
                 <h3 className="modal-header">{title}</h3>
                  {content}
                <div className="forms-button-container">{actions}</div>
               </div>

            </div>
  } 

  return { Modal, openModal, closeModal };
};

export default useModal;
