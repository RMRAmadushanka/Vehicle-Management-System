    
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
import Navbar from '../../main_parts/navbar.js';
import NumberFormat from 'react-number-format';
import Footer from '../../main_parts/footer.js';

function Admin_registration() {
   const userName = Cookies.get('user_name');
   const phoneReg = sessionStorage.getItem("phone_Cookies");
   const [username, setUserName] = useState(userName);
   const [name, setName] = useState("");
   const [address, setAddress] = useState("");
   const [phone, setPhone] = useState(phoneReg);
   const [gender, setGender] = useState("");
   const [bod, set_BOD] = useState("");
   const [nic, setnic] = useState("");
   const [profileDisable, setprofileDisable] = useState(true);

   const [isValidCFpassword, setIsValidCfpassword] = useState(false);
   const [messageBOD, setmessageBOD] = useState('');

   const [checkboxValue, setCheckboxValue] = useState(false);

   function setCheckboxAgree(e)
   {
      const agreeValue = e;
      if(agreeValue === true)
      {
         setprofileDisable(false);
      }else{
         setprofileDisable(true);
      }
      setCheckboxValue(agreeValue)
   }

   const currentYear = new Date().getFullYear();
   const maxYear = new Date().getFullYear()-55;
   const minYear = new Date().getFullYear()-18;

   function setBOD(e){
     var birthDay = e;
     const enteredYear = birthDay.substring(0, 4);
     if((enteredYear > maxYear) && (enteredYear < minYear)){
       setprofileDisable(true);
       setmessageBOD("");
     }else{
       setprofileDisable(true);
       setmessageBOD("Age Must Between 18 - 55");
     }
     set_BOD(birthDay);
   }

   function create(e){
       e.preventDefault();

       const employeeProfile ={ username , name, address, phone, gender, bod, nic}

        axios.post(global.APIUrl+"/employee/addEmployee",employeeProfile).then(() =>{
      

        Swal.fire({  
          title: "Success!",
          text: "Profile Created!",
          icon: 'success',
          confirmButtonText: "OK",
          type: "success"}).then(okay => {
          if (okay) {
              window.location.href = "/";
          }
        });

        
        }).catch((err)=>{

            Swal.fire({  
            title: "Error!",
            text: "Profile Not Created",
            icon: 'error',
            confirmButtonText: "OK",
            type: "success"})
        })
  } 

    return (
            <div>
                <Navbar/>
                <MDBRow  style={{marginTop:'1%', marginBottom:'10%', width:'99%'}}>

                  <MDBCol sm='1'></MDBCol>

                  <MDBCol sm='5'>
                      <MDBCard className="border-0 shadow-0">
                          <MDBCardImage style={{width:'80%', marginTop:'10%', marginLeft:'10%'}} position='top' alt='...' src='./img/employee.png' />
                      </MDBCard>
                  </MDBCol>

                  <MDBCol sm='6'>
                      <MDBCard className="border-0 shadow-0 p-5">
                      <MDBCardBody className="pt-5 mt-3 text-left" style={{padding:'10%'}}>

                        <div className="bg-light p-4">

                          <center><h1 className="text-uppercase">Create Employee Profile </h1></center>
                          <hr/>

                          <div class="mb-3 mt-4">
                            <label for="exampleFormControlInput1" class="form-label" style={{fontSize:"20px"}}><b>Employee User Name</b></label>
                            <input type="text" disabled class="form-control bg-danger text-white" 
                            style={{fontSize:"17px"}}
                            value={username}
                            onChange={(e) =>{
                                setUserName(e.target.value);
                            }} />
                          </div>

                          <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label" style={{fontSize:"20px"}}><b>Enter Employee Name</b></label>
                            <input type="text" className="form-control" 
                            style={{fontSize:"17px"}}
                            onChange={(e) =>{
                                setName(e.target.value);
                            }} />
                          </div>

                          <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label" style={{fontSize:"20px"}}><b>Enter Address</b></label>
                            <input type="text" class="form-control" style={{fontSize:"17px"}} onChange={(e) =>{
                                setAddress(e.target.value);
                            }} required/>
                          </div>

                          <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label" style={{fontSize:"20px"}}><b>Enter Telephone Number</b></label>
                            <NumberFormat format="0## ### ####" value={phone} class="form-control bg-danger text-white" placeholder="071 110 1111" style={{fontSize:"17px"}} disabled onChange={(e) =>{
                                setPhone(e.target.value);
                            }} />
                          </div>

                          <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label" style={{fontSize:"20px"}}><b>Select Gender</b></label>
                            <select class="form-select" style={{fontSize:"17px"}} onChange={(e) =>{
                                setGender(e.target.value);
                            }} required>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                          </div>

                          <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label" style={{fontSize:"20px"}}><b>Enter Birth of date</b></label>
                            <input type="date" class="form-control" style={{fontSize:"17px"}} onChange={(e) =>{
                                setBOD(e.target.value);
                            }} required/>
                            <span style={{fontSize:'12px', margin:'0px', padding:'0px'}}  className={`messageCfpassword ${isValidCFpassword ? 'success' : 'error'}`} >
                                {messageBOD}
                            </span>
                          </div>
                          
                          <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label" style={{fontSize:"20px"}}><b>Employee NIC Number</b></label>
                            <NumberFormat format="#########V" class="form-control" placeholder="990000000V" style={{fontSize:"17px"}}  onChange={(e) =>{
                                setnic(e.target.value);
                            }} />
                          </div>

                          <input type="checkbox" checked={checkboxValue}
                            onChange={() => setCheckboxAgree(!checkboxValue)}/> <label>Agree to add this employee to the organization.</label>
                            <hr/>
                        
                          <div class="mt-3 mb-2">
                              <div class="d-grid gap-2">
                                      <MDBBtn class="btn text-white bg-dark d-letter-spacing fw-light" style={{fontSize:"20px"}} disabled={profileDisable}  onClick={create}>Create Profile</MDBBtn> 
                              </div>
                          </div>
                        </div> 
                      </MDBCardBody>
                      </MDBCard>
                  </MDBCol>
                </MDBRow>
                <Footer/>
            </div>
          )
};

export default Admin_registration;