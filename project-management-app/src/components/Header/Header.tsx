import { NavLink } from 'react-router-dom';
import './Header.css';
import React, { FormEvent, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IBoardForm } from '../../types/headerTypes';
import axios from 'axios';

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

axios.defaults.headers.common['Authorization'] =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzYjNkNGEyNy1iMDg3LTRkM2QtOTM0OC0zZjg2ZmFhZmI2ZmEiLCJsb2dpbiI6InVzZXIxIiwiaWF0IjoxNjUyMTExMjY4fQ.EsmO7vXW5kUlyJjfy93YXYpB41p8z_AkQlqal1RGK6o';

function RenderButton() {
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

function RenderModalCreateBoard() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();
  const onSubmit: SubmitHandler<IBoardForm> = (data) => {
    console.log(data.title);
    axios
      .post('https://app-management-final.herokuapp.com/boards', {
        title: data.title,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <form className="create-board-modal" onSubmit={handleSubmit(onSubmit)}>
      <label>
        Create modal
        <input
          className="create-board-modal__input"
          type="text"
          {...register('title', {
            required: 'Field has to be fulfilled',
          })}
        />
        {errors.title && <p className="errors-message">{errors.title.message || 'error!'}</p>}
      </label>
      <br />
      <button>Create</button>
    </form>
  );
}
