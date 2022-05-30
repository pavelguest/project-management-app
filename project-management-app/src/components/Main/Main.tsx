import React from 'react';
import { Route, Routes } from 'react-router';
import Auth from '../../pages/Auth';
import BoardPage from '../../pages/BoardPage';
import Edit from '../../pages/Edit/Edit';
import MainPage from '../../pages/MainPage';
import NotFoundPage from '../../pages/NotFoundPage';
import WelcomePage from '../../pages/WelcomePage';
import './Main.css';

export const Main = () => (
  <main className="App-main">
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/board/:currentBoard" element={<BoardPage />} />
      <Route path="/registration" element={<Auth />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/edit" element={<Edit />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </main>
);
