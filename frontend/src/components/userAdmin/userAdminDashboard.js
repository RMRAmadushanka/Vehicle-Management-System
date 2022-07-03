import React, { useState , useEffect } from 'react';
import { MDBIcon, MDBCardImage,
 MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol , MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import {reactLocalStorage} from 'reactjs-localstorage';
import Navbar from '../main_parts/navbar.user.log.js';
import Footer from '../main_parts/footer.js';
import '../APIUrl';

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
                <p className='text-white h1 mb-0 text-uppercase' style={{ fontSize:'55px', letterSpacing:'2px'}}>User Dashboard</p>
                </div>
            </div>
        </div>
        <br/>
        <br/>
        <center>
         <div class="row container-fluid" style={{marginTop:'7%', marginBottom:'26%'}}>
                <div class="col-sm-4">
                        <a href="serviceCenters">
                        <div class="card bg-light">
                        <img src="http://ioes18.wildapricot.org/Resources/AM/Micro.jpg" class="card-img-top" alt="..."/>
                        <div class="card-body">
                            <h2 class="card-title text-uppercase">Service Center</h2>
                        </div>
                        </div>
                    </a>
                </div>
                <div class="col-sm-4">
                    <a href="serviceBooking">
                        <div class="card bg-light">
                            <img src="https://i.imgur.com/x18CyHH.jpeg" class="card-img-top" alt="..."/>
                            <div class="card-body">
                                <h2 class="card-title text-uppercase">Service Booking</h2>
                            </div>
                        </div>
                    </a>
                </div>
                <div class="col-sm-4">
                    <a href="UserViewAdvertisement">
                        <div class="card bg-light">
                            <img src="https://i.imgur.com/8eCoHtL.jpeg" class="card-img-top" alt="..."/>
                            <div class="card-body">
                                <h2 class="card-title text-uppercase">Advertisements</h2>
                            </div>
                        </div>
                    </a>
                </div>
                <div class="jumbotron jumbotron-fluid" style={{ background: 'url(https://i.imgur.com/BswFpbb.png)', width: '100%', backgroundRepeat: 'no-repeat', backgroundCover: 'center' }}>
                    <div class="container text-center" style={{ paddingTop: '10%', paddingBottom: '10%' }}>
                        <h1 class="display-4 fw-bold text-warning">Send Your Feedbacks</h1>
                        <button type="button" class="btn btn-outline-danger btn-lg" style={{ fontSize: '18px' }} ><a href="Feedback">SEND</a> </button>
                    </div>
                </div>
            
            </div>
            </center>
        <Footer/>
    </div>
    )
};

export default About;