
import React, { useState , useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBBtn} from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import {reactLocalStorage} from 'reactjs-localstorage';
import NumberFormat from 'react-number-format';
import Navbar from "../adminNav";
import jsPDF from 'jspdf';

function MarketingAdd() {
   
    var AdvertismntEdit = reactLocalStorage.getObject('AdvertismntEdit');
    const adID = AdvertismntEdit[0];

    const [name, setName] = useState(AdvertismntEdit[1]);
    const [contactNo, setContact] = useState(AdvertismntEdit[2]);
    const [title, setTitle] = useState(AdvertismntEdit[3]);
    const [description, setDiscription] = useState(AdvertismntEdit[4]);
    const [image, setImage] = useState(AdvertismntEdit[5]);

      function Edit(e)
    {
            e.preventDefault();
            const advertising ={name, contactNo, title, description}
            axios.put(global.APIUrl+"/advertisement/editAdvertisment/"+adID,advertising).then(() =>{

            Swal.fire({  
            title: "Success!",
            text: "Advertisement Updated!",
            icon: 'success',
            confirmButtonText: "OK",
            type: "success"}).then(okay => {
            if (okay) {
                  window.location.href = "/MarketingDashboard";
            }
            });

            
        }).catch((err)=>{

            Swal.fire({  
            title: "Error!",
            text: "Advertisement Not Added!",
            icon: 'error',
            confirmButtonText: "OK",
            type: "success"})
        })
    }

    return (
    <div class="dashboard-main-wrapper" >
        <Navbar/>
        <div class="dashboard-wrapper">
            <div  style={{paddingTop:'3%',paddingLeft:'2%', width:'98%'}}>
                <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{color:'black'}}><i class="fas fa-home"></i>Admin Dashboard</h4>
                <hr/>
                 <div className="container-fluid bg-white" style={{paddingLeft:'5%', paddingTop:'2%' ,paddingBottom:'2%', paddingRight:'5%'}} >
                     <center>
                         <h3 className="text-uppercase">Edit Advertisement </h3>
                     </center>
                     <div className="text-end mt-5">
                         <a href="MarketingDashboard">
                            <MDBBtn className='btn-sm' style={{ fontSize:'15px', fontWeight:'100',letterSpacing:'2px' }} color='dark'>
                                Back
                            </MDBBtn>
                        </a>
                     </div>
                      <MDBRow>
                        <MDBCol sm='5'>
                            <MDBCard className='shadow-0'>
                            <MDBCardBody >
                              <img src={"https://res.cloudinary.com/dnomnqmne/image/upload/v1630743483/"+image} class="card-img-top" alt="..."/>
                            </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol sm='1'></MDBCol>
                        <MDBCol sm='6'>
                            <MDBCard className='shadow-0'>
                            <MDBCardBody>
                              <div class="mb-3">
                                            <label  class="form-label h5">Name</label>
                                            <input type="text" class="form-control" value={name}  onChange={(e) =>{
                                                setName(e.target.value);
                                            }}/>
                                        </div>
                                        <div class="mb-3">
                                            <label  class="form-label h5">Contact Number</label>
                                            
                                            <NumberFormat format="### ### ####" class="form-control" placeholder="071 110 1111"  value={contactNo} onChange={(e) =>{
                                                    setContact(e.target.value);
                                                }} />
                                        </div>
                                         <div class="mb-3">
                                            <label  class="form-label h5">Title</label>
                                            <input type="text" class="form-control" value={title} onChange={(e) =>{
                                                setTitle(e.target.value);
                                            }}/>
                                        </div>
                                         <div class="mb-3">
                                            <label  class="form-label h5">Discription</label>
                                            <textarea class="form-control" rows="5"  value={description}  onChange={(e) =>{
                                                setDiscription(e.target.value);
                                            }}></textarea>
                                        </div>
                                        <div className="text-end">
                                            <button type="button" class="btn btn-dark" onClick={Edit}>Edit</button>
                                        </div>
                            </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        </MDBRow>
                 </div>
            </div>
        </div>
      </div>
      )
};


export default MarketingAdd;