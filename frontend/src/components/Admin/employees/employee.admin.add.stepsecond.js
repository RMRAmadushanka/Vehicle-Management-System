
    
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
import passwordValidator from 'password-validator';
import NumberFormat from 'react-number-format';
import Navbar from "../adminNav";
var schema = new passwordValidator();

function EmployeeAddStepSecond() {
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
              window.location.href = "/EmployeeDashboard";
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
    <div class="dashboard-main-wrapper" >
        <Navbar/>
        <div >
            <div  style={{paddingTop:'3%',paddingLeft:'2%', width:'98%'}}>
                <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{color:'black'}}><i class="fas fa-home"></i>Admin Dashboard</h4>
                <hr/>

                 <div className="container-fluid bg-white" style={{paddingLeft:'5%', paddingTop:'2%' ,paddingBottom:'2%', paddingRight:'5%'}} >
                     
                    <div className="text-end mt-5">
                         <a href="EmployeeDashboard">
                            <MDBBtn className='btn-sm' style={{ fontSize:'15px', fontWeight:'100',letterSpacing:'2px' }} rounded color="dark">
                                Dashboard
                            </MDBBtn>
                        </a>
                    </div>
                     
                     <center>
                     <h1 className="text-uppercase" > Add More Details </h1>
                     </center>

                     

                      <MDBRow>

                        <MDBCol sm='3'></MDBCol>
                        <MDBCol sm='6'>

                            <MDBCard className='shadow-0'>
                            <MDBCardBody>

                                <div class="mb-3 mt-4">
                                  <label for="exampleFormControlInput1" class="form-label" style={{fontSize:"18px"}}>Employee User Name</label>

                                  <input type="text" disabled class="form-control bg-danger text-white"
                                  style={{fontSize:"17px"}} 
                                  value={username}
                                  onChange={(e) =>{
                                      setUserName(e.target.value);
                                  }} />
                                </div>

                                <div class="mb-3">
                                  <label for="exampleFormControlInput1" class="form-label" style={{fontSize:"18px"}}>Employee Name</label>
                                  <input type="text" className="form-control" 
                                  style={{fontSize:"17px"}}
                                  onChange={(e) =>{
                                      setName(e.target.value);
                                  }} />
                                </div>

                                <div class="mb-3">
                                  <label for="exampleFormControlInput1" class="form-label" style={{fontSize:"18px"}}>Address</label>
                                  <input type="text" class="form-control" style={{fontSize:"17px"}} onChange={(e) =>{
                                      setAddress(e.target.value);
                                  }} required/>
                                </div>

                                <div class="mb-3">
                                  <label for="exampleFormControlInput1" class="form-label" style={{fontSize:"18px"}}>Telephone Number</label>
                                  <NumberFormat format="0## ### ####" value={phone} class="form-control bg-danger text-white" placeholder="071 110 1111" style={{fontSize:"17px"}} disabled onChange={(e) =>{
                                      setPhone(e.target.value);
                                  }} />
                                </div>

                                <div class="mb-3">
                                  <label for="exampleFormControlInput1" class="form-label" style={{fontSize:"18px"}}>Gender</label>
                                  <select class="form-select" style={{fontSize:"17px"}} onChange={(e) =>{
                                      setGender(e.target.value);
                                  }} required>
                                      <option value="">Select Gender</option>
                                      <option value="Male">Male</option>
                                      <option value="Female">Female</option>
                                  </select>
                                </div>

                                <div class="mb-3">
                                  <label for="exampleFormControlInput1" class="form-label" style={{fontSize:"18px"}}>BOD</label>
                                  <input type="date" class="form-control" style={{fontSize:"17px"}} onChange={(e) =>{
                                      setBOD(e.target.value);
                                  }} required/>
                                  <span style={{fontSize:'12px', margin:'0px', padding:'0px'}}  className={`messageCfpassword ${isValidCFpassword ? 'success' : 'error'}`} >
                                      {messageBOD}
                                  </span>
                                </div>

                                <div class="mb-3">
                                  <label for="exampleFormControlInput1" class="form-label" style={{fontSize:"18px"}}>NIC</label>
                                  <NumberFormat format="#########V" class="form-control" placeholder="##########V" style={{fontSize:"17px"}}  onChange={(e) =>{
                                      setnic(e.target.value);
                                  }} />
                                  <br/>
                                </div>

                                <input type="checkbox" checked={checkboxValue}
                        	      onChange={() => setCheckboxAgree(!checkboxValue)} /> <label><b>Agree to add this employee to the organization.</b></label>
                      
                                <div class="mt-3 mb-2">
                                    <div class="d-grid gap-2">
                                            
                                            <MDBBtn class="btn text-white bg-dark d-letter-spacing fw-light" disabled={profileDisable} style={{fontSize:"18px"}}  onClick={create}>Create Profile</MDBBtn> 
                                    </div>
                                </div>

                            </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol sm='3'>
                            <MDBCard className='shadow-0'>
                            <MDBCardBody>
                               
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


export default EmployeeAddStepSecond;