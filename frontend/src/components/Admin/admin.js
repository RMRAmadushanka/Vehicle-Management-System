
import React, { useState , useEffect } from 'react';
import { MDBCard, MDBCardHeader, MDBCardBody, MDBIcon, MDBCardTitle,MDBCardText, MDBBtn, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import {reactLocalStorage} from 'reactjs-localstorage';
import Navbar from "./adminNav";

function Admin() {
    
    return (
    <div class="dashboard-main-wrapper" >
        <Navbar/>
        <div class="dashboard-wrapper">
            <div  style={{paddingTop:'3%',paddingLeft:'2%', width:'98%'}}>
                
                <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{color:'black'}}><i class="fas fa-home"></i>Admin Dashboard</h4>
                <hr/>
                 
                 <MDBRow  style={{marginTop:'6%'}}>
                    <MDBCol sm='4'>
                        <a href="UserDashboard">
                         <MDBCard className=" square border-bottom border-5 border-dark bgdigram " style={{boxShadow:'2px 3px 5px #BBBBBB'}}>
                            <MDBCardHeader className=" fw-bold mt-2 h1 pl-2 pt-5 pb-4 text-center text-uppercase" style={{color:'black'}}>
                               <MDBIcon fas icon="user text-muted" /><br/> <span>User</span>
                            </MDBCardHeader>
                        </MDBCard>
                        </a>
                    </MDBCol>
                    <MDBCol sm='4'>
                        <a href="ImportDashboard">
                         <MDBCard className=" square border-bottom border-5 border-dark bgdigram " style={{boxShadow:'2px 3px 5px #BBBBBB'}}>
                            <MDBCardHeader className=" fw-bold mt-2 h1 pl-2 pt-5 pb-4 text-center text-uppercase" style={{color:'black'}}>
                              <MDBIcon fas icon="truck-loading text-muted" /> <br/> <span>Import</span>
                            </MDBCardHeader>
                        </MDBCard>
                        </a>
                    </MDBCol>
                    <MDBCol sm='4'>
                          <a href="VehicleDashboard">
                            <MDBCard className=" square border-bottom border-5 border-dark bgdigram " style={{boxShadow:'2px 3px 5px #BBBBBB'}}>
                                <MDBCardHeader className=" fw-bold mt-2 h1 pl-2 pt-5 pb-4 text-center text-uppercase" style={{color:'black'}}>
                                <MDBIcon fas icon="hotel text-muted" /> <br/> Showroom
                                </MDBCardHeader>
                            </MDBCard>
                        </a>
                    </MDBCol>
                    </MDBRow>
                    <MDBRow  style={{marginTop:'1%'}}>
                    <MDBCol sm='4'>
                        <a href="PaymentDashboard">
                         <MDBCard className=" square border-bottom border-5 border-dark bgdigram " style={{boxShadow:'2px 3px 5px #BBBBBB'}}>
                            <MDBCardHeader className=" fw-bold mt-2 h1 pl-2 pt-5 pb-4 text-center text-uppercase" style={{color:'black'}}>
                               <MDBIcon fas icon="credit-card text-muted" /> <br/>Payment
                            </MDBCardHeader>
                         </MDBCard>
                        </a>
                    </MDBCol>
                    <MDBCol sm='4'>
                        <a href="EmployeeDashboard">
                         <MDBCard className=" square border-bottom border-5 border-dark bgdigram " style={{boxShadow:'2px 3px 5px #BBBBBB'}}>
                            <MDBCardHeader className=" fw-bold mt-2 h1 pl-2 pt-5 pb-4 text-center text-uppercase" style={{color:'black'}}>
                               <MDBIcon fas icon="id-card-alt text-muted" /> <br/>Employees
                            </MDBCardHeader>
                        </MDBCard>
                        </a>
                    </MDBCol>
                    <MDBCol sm='4'>
                        <a href="MarketingDashboard">
                         <MDBCard className=" square border-bottom border-5 border-dark bgdigram " style={{boxShadow:'2px 3px 5px #BBBBBB'}}>
                            <MDBCardHeader className=" fw-bold mt-2 h1 pl-2 pt-5 pb-4 text-center text-uppercase" style={{color:'black'}}>
                               <MDBIcon fab icon="facebook-square" className="text-muted" /> <br/>Marketing
                            </MDBCardHeader>
                        </MDBCard>
                        </a>
                    </MDBCol>
                      <MDBCol sm='4'>
                        <a href="DashboardFeedback">
                         <MDBCard className=" square border-bottom border-5 border-dark bgdigram " style={{boxShadow:'2px 3px 5px #BBBBBB'}}>
                            <MDBCardHeader className=" fw-bold mt-2 h1 pl-2 pt-5 pb-4 text-center text-uppercase" style={{color:'black'}}>
                               <MDBIcon fas icon="comment-dots text-muted" /> <br/>Feedback
                            </MDBCardHeader>
                        </MDBCard>
                        </a>
                    </MDBCol>
                       <MDBCol sm='4'>
                        <a href="MaintanceDashboard">
                         <MDBCard className=" square border-bottom border-5 border-dark bgdigram " style={{boxShadow:'2px 3px 5px #BBBBBB'}}>
                            <MDBCardHeader className=" fw-bold mt-2 h1 pl-2 pt-5 pb-4 text-center text-uppercase" style={{color:'black'}}>
                               <MDBIcon fas icon="tools text-muted" /> <br/>Maintenance
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


export default Admin;