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
    const [ServiceCenters,setServiceCenter] = useState([]);
    useEffect(() => {
          axios.get(global.APIUrl+"/service_Center/allService_center")
          .then(res => setServiceCenter(res.data))
          .catch(error => console.log(error));
    });
        
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
                <p className='text-white h1 mb-0 text-uppercase' style={{ fontSize:'55px', letterSpacing:'2px'}}>Service Center</p>
                </div>
            </div>
        </div>
        <br/>
        <br/>
        <center>
         <div class="row container-fluid" style={{marginTop:'7%', marginBottom:'26%'}}>
             {ServiceCenters.map((ServiceCenter,key) => (
                <div class="col-sm-4">
                    <div class="card bg-light">
                        <img src={"https://res.cloudinary.com/dnomnqmne/image/upload/v1630743483/"+ServiceCenter.image} class="card-img-top" alt="..."/>
                        <div class="card-body ">
                            <h4 class="card-title text-uppercase">{ServiceCenter.location} - Service Center</h4>
                            <div className=" text-left" style={{ marginLeft:'22%'}}>
                                <p style={{ fontSize:'18px'}}>
                                    Address - {ServiceCenter.address}<br/>
                                    Telephone 1 - {ServiceCenter.telephone1}<br/>
                                    Telephone 2 - {ServiceCenter.telephone2}<br/>
                                
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            </div>
            </center>
        <Footer/>
    </div>
    )
};

export default About;