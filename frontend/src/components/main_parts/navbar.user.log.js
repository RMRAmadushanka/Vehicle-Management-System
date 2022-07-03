
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

    function logout()
    {
            sessionStorage.removeItem('user_name');
        	Swal.fire({  
                title: "Success!",
                text: "Logout Success",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"}).then(okay => {
                    if (okay) {
                        window.location.href = "/UserLogin";
                    }
            });
    }


    useEffect(() => {
        const tel = sessionStorage.getItem('user_name');
        if(tel === null){
            Swal.fire({  
            title: "Error!",
            text: "To access web site, First of all you must fill login form.",
            icon: 'error',
            confirmButtonText: "OK",
            type: "success"}).then(okay => {
                if (okay) {
                    window.location.href = "/UserLogin";
                }
                });
        }
    })


    return (
           <MDBNavbar expand='lg' className="sticky-top" light bgColor='dark'>
            <MDBContainer fluid>
                <MDBNavbarBrand href='/userAdminDashboard' style={{fontSize:'25px'}} className="pt-2 navbar-brand h1 fw-bold">
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
                    <MDBNavbarLink style={{color: '#DCDCDC'}} active aria-current='page' href='userAdminDashboard'>
                        Dashboard
                    </MDBNavbarLink>
                    </MDBNavbarItem>
                    <MDBNavbarItem>
                    <MDBNavbarLink style={{color: '#DCDCDC'}} active aria-current='page' href='/'>
                        Home
                    </MDBNavbarLink>
                    </MDBNavbarItem>
                    <MDBNavbarItem>
                    <MDBNavbarLink style={{color: '#DCDCDC'}} active aria-current='page' href='/'>
                        Advertisement
                    </MDBNavbarLink>
                    </MDBNavbarItem>
                    <MDBNavbarItem>
                    <MDBNavbarLink style={{color: '#DCDCDC'}} active aria-current='page' href='/'>
                        Service Centers
                    </MDBNavbarLink>
                    </MDBNavbarItem>
                    <MDBNavbarItem>
                    <MDBNavbarLink style={{color: '#DCDCDC'}} active aria-current='page' href='/'>
                        Bookings
                    </MDBNavbarLink>
                    </MDBNavbarItem>
                   
                    <MDBNavbarItem>
                    <MDBNavbarLink style={{color: '#DCDCDC'}} active aria-current='page' href='Feedback'>
                        Feedback
                    </MDBNavbarLink>
                    </MDBNavbarItem>
                </MDBNavbarNav>

               <MDBCollapse navbar show={showNavRight}>
                <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
                    <MDBNavbarItem>
                    <MDBNavbarLink style={{color: '#DCDCDC', cursor: 'pointer'}} active aria-current='page'  onClick={logout}>
                        Logout
                    </MDBNavbarLink>
                    </MDBNavbarItem>
                      <MDBNavbarItem>
                    <MDBNavbarLink style={{color: '#DCDCDC', cursor: 'pointer'}} active aria-current='page'  href="UserProfile">
                        Profile
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