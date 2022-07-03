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

function ViewAdvertisement() {
      const [AllAdvertisments,setAllAdvertisment] = useState([]);
     

        const search = window.location.search;
        const params = new URLSearchParams(search);
        const id = params.get('id');

         useEffect(() => {
          axios.get(global.APIUrl+"/advertisement/oneAdvertisment/"+id)
          .then(res => setAllAdvertisment(res.data))
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
        <h1 className="text-center" style={{marginTop:'5%'}}>Advertisements</h1>
         <div className="text-end mt-5">
                <a href="UserViewAdvertisement">
                    <MDBBtn className='btn-sm' style={{ fontSize:'13px', fontWeight:'light'}} outline color='dark'>
                      Back
                    </MDBBtn>{' '}&nbsp;&nbsp;
                </a>
         </div>
        <center>
      
              {AllAdvertisments.map((Advertisment,key) => (
                <div class="row container-fluid">
                <div class="col-sm-6">
                    <div class="card shadow-0">
                    <div class="card-body">
                       <img src={"https://res.cloudinary.com/dnomnqmne/image/upload/v1630743483/"+Advertisment.image} style={{width:'75%'}}  class="card-img-top" alt="..."/>
                    </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="card  shadow-0">
                    <div class="card-body text-left">
                        <h2 class="card-title text-dark text-capitalize">{Advertisment.title}<br/></h2>
                        <div className="ml-3 mt-2">
                            <p>
                                <MDBIcon fas icon="angle-right" /> Advertisment Code : {Advertisment.adID}<br/>
                                <MDBIcon fas icon="angle-right" /> Owner Name : {Advertisment.name}<br/>
                                <MDBIcon fas icon="angle-right" /> Contact Number : {Advertisment.contactNo}<br/>

                            </p>
                        </div>
                        <h6 className="text-decoration-underline mt-4 ml-3">Description</h6>
                        <p class="card-text text-muted ml-3 letter-capitalize">{Advertisment.description}</p>
                    </div>
                    </div>
                </div>
                </div>
              ))}
           
            </center>
        <Footer/>
    </div>
    )
};

export default ViewAdvertisement;