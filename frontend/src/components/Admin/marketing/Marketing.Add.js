
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
   
    const [name, setName] = useState("");
    const [contactNo, setContact] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDiscription] = useState("");
    const [imageSelected, setimageSelected] = useState("");

      function save(e)
    {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file" ,imageSelected);
        formData.append("upload_preset", "ml_default");

            axios.post("https://api.cloudinary.com/v1_1/dnomnqmne/image/upload",formData).then((response)=>{
            console.log(imageSelected)
            const picture =imageSelected.name;
            const advertising ={ name, contactNo, title, description, picture}
            axios.post(global.APIUrl+"/advertisement/addAdvertisement",advertising).then(() =>{

            Swal.fire({  
            title: "Success!",
            text: "Advertisement Added!",
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
                         <h1 className="text-uppercase">Create Vehicle Advertisements </h1>
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
                              <div class="mb-3">
                                <label  class="form-label h3" style={{fontWeight:"bolder"}}>Image Name</label>
                                <input type="file" style={{fontSize:"17px"}} onChange={(e) =>{
                                setimageSelected(e.target.files[0]);
                                }} class="form-control" id="customFile" />
                              </div>
                            </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol sm='1'></MDBCol>
                        <MDBCol sm='6'>
                            <MDBCard className='shadow-0'>
                            <MDBCardBody>
                              <div class="mb-3">
                                            <label  class="form-label h3" style={{fontWeight:"bolder"}}>Enter Name</label>
                                            <input type="text" class="form-control" style={{fontSize:"17px"}} placeholder="Enter Name" onChange={(e) =>{
                                                setName(e.target.value);
                                            }}/>
                                        </div>
                                        <div class="mb-3">
                                            <label  class="form-label h3" style={{fontWeight:"bolder"}}>Enter Contact Number</label>
                                            <NumberFormat format="0## ### #### " style={{fontSize:"17px"}} class="form-control" placeholder="0## ### ## ##"  onChange={(e) =>{
                                                setContact(e.target.value);
                                            }}/>
                                        </div>
                                         <div class="mb-3">
                                            <label  class="form-label h3" style={{fontWeight:"bolder"}}>Enter Title</label>
                                            <input type="text" class="form-control" style={{fontSize:"17px"}} placeholder="Enter Title" onChange={(e) =>{
                                                setTitle(e.target.value);
                                            }}/>
                                        </div>
                                         <div class="mb-3">
                                            <label  class="form-label h3" style={{fontWeight:"bolder"}}>Enter Discription</label>
                                            <textarea class="form-control" rows="5" style={{fontSize:"17px"}} placeholder="Enter Description" onChange={(e) =>{
                                                setDiscription(e.target.value);
                                            }}></textarea>
                                        </div>
                                        <div className="text-end">
                                            <br/>
                                            <button type="button" class="btn btn-dark" style={{fontSize:"15px"}} onClick={save}>Save</button>
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