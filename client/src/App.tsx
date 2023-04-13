import React from 'react';
import './App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './views/logInOut/LogIn';
import Register from './views/logInOut/Register';
import Page from './views/Page';
import Home from './views/Home';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page />}>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Register />} />
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;