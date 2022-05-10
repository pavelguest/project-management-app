import { NavLink } from 'react-router-dom';
import './Header.css';
import React, { FormEvent, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IBoardForm } from '../../types/headerTypes';

export const Header = () => (
  <header className="app-header">
    <div className="header__nav-wrapper">
      <nav className="header__nav">
        <NavLink to="/" className={({ isActive }) => 'nav__link' + (isActive ? ' active' : '')}>
          Welcome
        </NavLink>
        <NavLink to="/main" className={({ isActive }) => 'nav__link' + (isActive ? ' active' : '')}>
          Main
        </NavLink>
        <NavLink
          to="/board"
          className={({ isActive }) => 'nav__link' + (isActive ? ' active' : '')}
        >
          Board
        </NavLink>
      </nav>
      <RenderButton />
    </div>
  </header>
);

function RenderButton() {
  const [showModal, setShowModal] = useState(false);

  const handleCreateBoard = () => {
    showModal ? setShowModal(false) : setShowModal(true);
    console.log(showModal);
  };

  return (
    <div className="create-board-wrapper">
      <button
        onClick={() => {
          handleCreateBoard();
        }}
      >
        Create
      </button>
      {showModal && <RenderModalCreateBoard />}
    </div>
  );
}

function RenderModalCreateBoard() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit: SubmitHandler<IBoardForm> = (data) => console.log(data);
  // console.log(watch('text'));

  return (
    <form className="create-board-modal" onSubmit={handleSubmit(onSubmit)}>
      <label>
        Create modal
        <input
          className="create-board-modal__input"
          type="text"
          {...register('title', {
            required: true,
          })}
        />
      </label>
    </form>
  );
}

// : SubmitHandler<FieldValues>
