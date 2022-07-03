
import React, { useState , useEffect } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBDropdownLink,
  MDBCollapse,
  MDBCardImage,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBCarouselElement,
  MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol
} from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import {reactLocalStorage} from 'reactjs-localstorage';

function NavBar() {
    const [showBasic, setShowBasic] = useState(false);
    const [showNavRight, setShowNavRight] = useState(false);
    return (
           <MDBNavbar expand='lg' className="sticky-top" light bgColor='dark'>
            <MDBContainer fluid>
                <MDBNavbarBrand href='/' style={{fontSize:'25px'}} className="pt-2 navbar-brand h1 fw-bold">
                    <MDBIcon fas icon="car-alt" className="text-danger" size='2x' /> <span className="text-danger">&nbsp;SL</span><span className="text-white">-CAR SALE</span>
                </MDBNavbarBrand>

                <MDBNavbarToggler
                aria-controls='navbarSupportedContent'
                aria-expanded='false'
                aria-label='Toggle navigation'
                onClick={() => setShowBasic(!showBasic)}
                >
                <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>

                <MDBCollapse navbar show={showBasic}>
                <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
                    <MDBNavbarItem>
                    <MDBNavbarLink style={{color: '#DCDCDC'}} active aria-current='page' href='/'>
                        Home
                    </MDBNavbarLink>
                    </MDBNavbarItem>
                    <MDBNavbarItem>
                    <MDBNavbarLink href='#' tabIndex={-1} aria-disabled='true' style={{color: '#DCDCDC', cursor: 'pointer'}}>
                        Maintance
                    </MDBNavbarLink>
                    </MDBNavbarItem>
                    <MDBNavbarItem>
                    <MDBNavbarLink href='About' tabIndex={-1} aria-disabled='true' style={{color: '#DCDCDC', cursor: 'pointer'}}>
                        About
                    </MDBNavbarLink>
                    </MDBNavbarItem>
                </MDBNavbarNav>

               <MDBCollapse navbar show={showNavRight}>
                <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
                  
                    <MDBNavbarItem>
                    <MDBNavbarLink href='UserLogin'>
                        <MDBBtn size="lg" outline className='mx-2 text-white' style={{fontSize:'12px',letterSpacing:'2px'}} color='danger'>
                            Login
                        </MDBBtn>
                    </MDBNavbarLink>
                    </MDBNavbarItem>
                    <MDBNavbarItem>
                    <MDBNavbarLink  href='UserRegistration'  >
                        <MDBBtn size="lg" className='mx-2' color='danger'  style={{fontSize:'12px',letterSpacing:'2px'}} >
                            Registration
                        </MDBBtn>
                    </MDBNavbarLink>
                    </MDBNavbarItem>
                </MDBNavbarNav>
                </MDBCollapse>
                </MDBCollapse>
            </MDBContainer>
            </MDBNavbar>
          )
};

export default NavBar;