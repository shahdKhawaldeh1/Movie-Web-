import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './Components/Home/Home';
import { NotFound } from './Components/NotFound/NotFound';
import { Movie } from './Components/Movie/Movie';
import { Navbar } from './Components/Navbar/Navbar';
import { Login } from './Components/Login/Login';
import { Register } from './Components/Register/Register';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='home' element={<Home/>} />
        <Route path='movie' element={<Movie/>} />
        <Route path='login' element={<Login/>} />
        <Route path='register' element={<Register/>} />


        <Route path='*' element={<NotFound/>} />
      </Routes>
     
    </>
  );
}

export default App;