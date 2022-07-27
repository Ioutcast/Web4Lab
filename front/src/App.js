import {ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import { AuthContext } from './context/index';
import React,{ useContext, useState } from 'react'
import AppRouter from './components/AppRouter';
import Navbar from './components/Navbar';

function App() {


  const [isAuth, setIsAuth] = useState(false);
  const [datatable, setDatatable] = React.useState({
    rows: []
 });

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth,
      datatable,
      setDatatable
    }}>
      <Router>
        <Navbar />
        <AppRouter />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Router>
    </AuthContext.Provider>

  );
}

export default App;
/* <Route exact path='/login' element={!user ? <LoginPage /> : <Navigate to="/" />} />
<Route exact path='/' element={<PrivateRoute />}>
  <Route exact path='/' element={<LogOutPage />} />
</Route>
<Route path="*" element={<Navigate to="/" />} /> */

