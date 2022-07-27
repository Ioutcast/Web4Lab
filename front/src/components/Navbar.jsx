import React, { useState,useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../api/userSlice';
import { AuthContext } from '../context';
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBBtn
} from 'mdb-react-ui-kit';


const Navbar = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const dispatch = useDispatch();

  const [showNavText, setShowNavText] = useState(false);

  const handleLoguot = (e) => {
    e.preventDefault();
    dispatch(logout());
    setIsAuth(false);
  };
  return (
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <MDBBtn onClick={(e) => handleLoguot(e)} outline сolor="dark" className='me-2' type='button'>
          LogOut
        </MDBBtn>
        <MDBNavbarToggler
          type='button'
          data-target='#navbarText'
          aria-controls='navbarText'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowNavText(!showNavText)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar show={showNavText}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            <MDBNavbarItem>
              <MDBNavbarLink >Выполнил:</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink > Васильков Александр Сергеевич</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink >Группа №P3211</MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
          <span className='navbar-text'> вариант</span>
          <span className='navbar-text'> №987345</span>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>

  );
}

export default Navbar;
