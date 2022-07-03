
import React, { useState , useEffect } from 'react';
import { MDBCard, MDBCardHeader, MDBCardBody, MDBIcon, MDBCardTitle,MDBCardText, MDBBtn, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import {reactLocalStorage} from 'reactjs-localstorage';
import Navbar from "../adminNav";

function MaintanceDashboard() {
    
    return (
    <div class="dashboard-main-wrapper" >
        <Navbar/>
        <div class="dashboard-wrapper">
            <div  style={{paddingTop:'3%',paddingLeft:'2%', width:'98%'}}>
                <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{color:'black'}}><i class="fas fa-home"></i>Admin Dashboard</h4>
                <hr/>
                 <center style={{marginTop:'6%'}}>
                    <h2 className="text-uppercase text-black">Maintance Management </h2>
                  </center>
                 <MDBRow className="mt-4" >
                    <MDBCol sm='6'>
                        <a href="ServiceCenter">
                         <MDBCard className=" square border-bottom border-5 border-dark bgdigram " style={{boxShadow:'2px 3px 5px #BBBBBB'}}>
                            <MDBCardHeader className=" fw-bold mt-2 h1 pl-2 pt-5 pb-4 text-center text-uppercase" style={{color:'black'}}>
                                <span>Service Centers</span>
                            </MDBCardHeader>
                        </MDBCard>
                        </a>
                    </MDBCol>
                    <MDBCol sm='6'>
                        <a href="BookingDashboard">
                         <MDBCard className=" square border-bottom border-5 border-dark bgdigram " style={{boxShadow:'2px 3px 5px #BBBBBB'}}>
                            <MDBCardHeader className=" fw-bold mt-2 h1 pl-2 pt-5 pb-4 text-center text-uppercase" style={{color:'black'}}>
                                <span>Booking</span>
                            </MDBCardHeader>
                         </MDBCard>
                        </a>
                    </MDBCol>
                 </MDBRow>
                
            </div>
        </div>
      </div>
      )
};


export default MaintanceDashboard;