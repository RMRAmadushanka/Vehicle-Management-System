import React, { useState , useEffect } from 'react';
import { MDBIcon, MDBCardImage,
 MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol , MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import {reactLocalStorage} from 'reactjs-localstorage';
import Navbar from './main_parts/navbar.js';
import Footer from './main_parts/footer.js';
import './APIUrl';

function About() {
  
    return (
    <div>
        <div className="pt-1 pb-1" style={{backgroundColor:'#F4F4F4'}}>
            <center>
                <small style={{fontSize:'14px', letterSpacing:'2px'}} className="text-muted text-capitalize">The Largest Autobile Service Hub In The Sri Lanka</small>
            </center>
        </div>
        <Navbar/>
        <div className='bg-image' >
            <img src='https://img.freepik.com/free-vector/customer-online-review-rating-feedback-set_124507-8052.jpg?size=626&ext=jpg' className='img-fluid' alt='Sample' />
            <div className='mask' style={{ backgroundColor: '#292929' }}>
                <div className='d-flex justify-content-center align-items-center h-100'>
                <p className='text-white h1 mb-0 text-uppercase' style={{ fontSize:'55px', letterSpacing:'2px'}}>About US</p>
                </div>
            </div>
        </div>
        <br/>
        <br/>
          <section className="container mt-5 pt-5 pb-5 mb-5">
              <div className="container">
                <MDBRow className="mt-5">
                    <MDBCol sm='1'></MDBCol>
                    <MDBCol sm='6'>
                        <MDBCard className="border-0 shadow-0">
                            <MDBCardImage style={{width:'105%', marginTop:'15%'}} position='top' alt='...' src='./img/suv2.png' />
                        </MDBCard>
                    </MDBCol>
                    <MDBCol sm='5'>
                        <MDBCard className="border-0 shadow-0">
                        <MDBCardBody className="pt-5 mt-3 text-left">
                            <MDBCardTitle className="h3 text-dark text-uppercase">Introduction</MDBCardTitle>
                            <MDBCardText  style={{color:'black', textAlign:'justify'}}>
                            SL-CARSALE.lk is a leading online destination that allows you to Buy, Sell, Trade and Lease / Finance any type of vehicle, across the country, anytime, anywhere and absolutely free of Charge. <br/><br/>Posting an advertisement on  SL-CARSALE.lk  is so convenient and takes less than 2 minutes to get your vehicle advertised for sale, online.
                            Customers who apply for a lease facility through Careka.lk, will be serviced efficiently by CF. If you’d like to get in touch with us, go to Contact Us You can become of a fan of Careka.lk on Facebook and Google To download our mobile app, Click Here</MDBCardText>
                        </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
                 <MDBRow className="mt-5 pt-5">
                    <MDBCol sm='1'></MDBCol>
                    <MDBCol sm='5'>
                        <MDBCard className="border-0 shadow-0">
                        <MDBCardBody className="pt-5 mt-3 text-left">
                            <MDBCardTitle className="h3 text-dark text-uppercase">KEY FEATURES</MDBCardTitle>
                            <MDBCardText  style={{color:'black', textAlign:'justify'}}>
                           We are the only online trading platform in the island that offer you physical vehicle sales outlets in Malabe, Panadura and Nittambuwa, in addition to a virtual trading platform, to make your experience both informative and enjoyable. The vehicle sales outlets offer you the widest range of vehicles under one roof.

Moreover the ‘get your direction (route map) service’ on Careka.lk, allows you to select more than one vehicle and get the shortest route to the location of the vehicle via GPS (a feature that is a first in Sri Lanka).</MDBCardText>
                        </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                     <MDBCol sm='6'>
                        <MDBCard className="border-0 shadow-0">
                            <MDBCardImage style={{width:'99%'}} position='top' alt='...' src='./img/suv4.png' />
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
                 <MDBRow className="mt-5 pt-5">
                    <MDBCol sm='4' className="mt-1">
                        <MDBCard className="border-0 shadow-0 alert-dark p-4" style={{height:'310px'}}>
                            <MDBCardTitle className="h3 text-dark text-center text-uppercase">Objectives</MDBCardTitle>
                            <MDBCardText  style={{color:'black', textAlign:'justify'}}>
                                    Our dedicated professional team continuously focuses on new technology and development of the product in order to
                                    <br/>
                                    <br/>
                                    <MDBIcon fas icon="caret-right"  className="text-dark" /> Buy & Sell articles through online advertising <br/>
                                    <MDBIcon fas icon="caret-right"  className="text-dark" /> Provide services to local and foreign institutions by way of Business Process Outsourcing (BPO) <br/>
                                    <MDBIcon fas icon="caret-right"  className="text-dark" /> Provide and assist with professional services through online
                            </MDBCardText>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol sm='4' className="mt-1">
                        <MDBCard className="border-0 shadow-0 alert-dark p-4" style={{height:'310px'}}>
                            <MDBCardTitle className="h3 text-dark text-center text-uppercase">Vision</MDBCardTitle>
                            <MDBCardText  style={{color:'black', textAlign:'justify'}}>
                                    To become the worlds’ preferred and the finest free classified platform.
                            </MDBCardText>
                        </MDBCard>
                    </MDBCol>
                     <MDBCol sm='4' className="mt-1">
                        <MDBCard className="border-0 shadow-0 alert-dark p-4" style={{height:'310px'}}>
                           <MDBCardTitle className="h3 text-dark text-center text-uppercase">Mission</MDBCardTitle>
                           <MDBCardText  style={{color:'black', textAlign:'justify'}}>
                                    We are committed to ourselves to create an innovative, the best quality, the quickest, secured and the largest satisfied customer based free classified platform to buy & sell with no boundaries.
                           </MDBCardText>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
              </div>
        </section>
        <Footer/>
    </div>
    )
};

export default About;