import React, { useState } from 'react';
import { RenderModalCreateBoard } from './CreateBoardModal';
import './CreateBoardBtn.css';

export function RenderButton() {
  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    showModal ? setShowModal(false) : setShowModal(true);
  };

  return (
    <div className="create-board-wrapper">
      <button onClick={handleToggleModal}>Create</button>
      {showModal && <RenderModalCreateBoard />}
      {showModal && <div className="overlay" onClick={handleToggleModal}></div>}
    </div>
  );
}
