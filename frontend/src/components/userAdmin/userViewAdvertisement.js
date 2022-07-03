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
      useEffect(() => {
          axios.get(global.APIUrl+"/advertisement/allAdvertisementsPublished")
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
                <a href="Advertisment">
                    <MDBBtn className='btn-sm' style={{ fontSize:'13px', fontWeight:'light'}} outline color='dark'>
                      Your Advertisments
                    </MDBBtn>{' '}&nbsp;&nbsp;
                </a>
         </div>
        <center>
         <div class="row container-fluid mt-4"  style={{ marginBottom:'26%'}}>
              {AllAdvertisments.map((Advertisment,key) => (
                <div class="col-sm-3">
                    <a href={"UserViewOneAdvertisement?id="+Advertisment.adID}>
                    <div class="card bg-light text-left">
                        <img src={"https://res.cloudinary.com/dnomnqmne/image/upload/v1630743483/"+Advertisment.image} class="card-img-top" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title text-uppercase">{Advertisment.title}</h5>
                        </div>
                    </div>
                    </a>
               </div>
              ))}
            </div>
            </center>
        <Footer/>
    </div>
    )
};

export default ViewAdvertisement;