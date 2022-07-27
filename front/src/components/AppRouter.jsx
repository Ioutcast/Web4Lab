import React, { useState, useContext ,useEffect} from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import LogOutPage from "../pages/LogOutPage";
import LoginPage from "../pages/LoginPage";
import { AuthContext } from '../context';
import { useSelector } from 'react-redux';
import { selectUser } from "../api/userSlice";

const AppRouter = () => {
    const  {isAuth,setIsAuth} = useContext(AuthContext);
    
    useEffect(() => {
        if (localStorage.getItem('token')){
            console.log('token - '+localStorage.getItem('token'));
            setIsAuth(true);
        }
    }, [])
  
    return (
        isAuth
            ?
            (  <Routes>
                <Route exact path='/' element={<LogOutPage />} />
              </Routes>
            )
            :
            (
                <Routes>
                    <Route exact path='/' element={<LoginPage />} />
                </Routes>
            )
    )
}

export default AppRouter;
