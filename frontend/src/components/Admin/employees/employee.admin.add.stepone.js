
    
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
import NumberFormat from 'react-number-format';
import passwordValidator from 'password-validator';
import Navbar from "../adminNav";
var schema = new passwordValidator();

function EmployeeAddStepOne() {
    const [showBasic, setShowBasic] = useState(false);
    const [showNavRight, setShowNavRight] = useState(false);
      const [passwordShown, setPasswordShown] = useState(false);
    function showPassword(){
        setPasswordShown(passwordShown ? false : true);
    }

    schema
    .is().min(4)                               
    .is().max(100)                             
    .has().uppercase()                         
    .has().lowercase()                         
    .has().digits(2)       
    .has().not().spaces()  
    .is().not().oneOf(['Passw0rd', 'Password123']); 

   const [isValidCFpassword, setIsValidCfpassword] = useState(false);
   const [messageCfpassword, setMessageCfpassword] = useState('');
   const [messageStrongpassword, setmessageStrongpassword] = useState('');
   const [password, setPassword] = useState("");
   const [CPassword, setCPassword] = useState("");
   const [UserName, setUserName] = useState("");
   const [Registrationbtn, setRegistrationbtn] = useState(true);
   const [phone, setPhone] = useState("");
   const [userType, setuserType] = useState("");

   const setPasswordFunction = (event) =>{
            if(schema.validate(event) === false) {
                setIsValidCfpassword(false);
                setmessageStrongpassword('Password is not strong');
               
            }else{
                setIsValidCfpassword(true);
                setmessageStrongpassword('Password is strong');
               
            }
            setPassword(event);
   }

   function Registration(e){
    e.preventDefault(); 
    const status = "pendding";

    const userReg ={ password, UserName, phone, userType, status}

     axios.post(global.APIUrl+"/user/registerAdmin",userReg).then(() =>{
     Cookies.set('user_name',UserName, { expires: 70000, path: '' });
  
     sessionStorage.setItem("phone_Cookies", phone);

     if(userType === 'Employee'){
         Swal.fire({  
             title: "Success!",
             text: "Registrtaion Success!",
             icon: 'success',
             confirmButtonText: "OK",
             type: "success"}).then(okay => {
             if (okay) {
                 window.location.href = "/EmployeeAddStepTwo";
             }
         });
     }
     
     }).catch((err)=>{

         Swal.fire({  
         title: "Error!",
         text: "Registrtaion Not Success",
         icon: 'error',
         confirmButtonText: "OK",
         type: "success"})
     })
}  

   const setCPasswordFnction = (event) => {
      const ConfirmPassword = event;
         
              if ((ConfirmPassword === password) && (ConfirmPassword !=='') && (ConfirmPassword!== null) ) {
                  setIsValidCfpassword(true);
                  setMessageCfpassword('Password Are Matching');
                  if((UserName.length > 0) && (ConfirmPassword.length >0) &&(ConfirmPassword.length>0)){
                      setRegistrationbtn(false);
                  }else{
                      setRegistrationbtn(true);
                  }
              } else {
                  setIsValidCfpassword(false);
                  setMessageCfpassword('Passwords Are Not Match');
                  setRegistrationbtn(true);
              }
      setCPassword(event);
    };


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
                         <h1 className="text-uppercase" >Add New Employee </h1>
                         <br/>
                     </center>
                     
                      <MDBRow>
                        <MDBCol sm='3'></MDBCol>
                        <MDBCol sm='6'>
                            <MDBCard className='shadow-0'>
                            <MDBCardBody>
                                
                                 <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label" style={{fontSize:"17px"}}><b>Enter a User Name</b></label>
                                    <input type="text" class="form-control"
                                    style={{fontSize:"16px"}} 
                                    onChange={(e) =>{
                                        setUserName(e.target.value);
                                    }}/>
                                </div>

                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label" style={{fontSize:"17px"}}><b>Enter a Phone Number</b></label>
                                    
                                    <NumberFormat format="0## ### ####" class="form-control"  placeholder="0## ### ## ##" style={{fontSize:"16px"}} onChange={(e) =>{
                                        setPhone(e.target.value);
                                    }}/>
                                </div>

                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label" style={{fontSize:"17px"}}><b>Enter a Password</b></label>

                                    <input class="form-control" type={passwordShown ? "text" : "password"} id="pass" style={{fontSize:"16px"}} onChange={(e) =>{
                                        setPasswordFunction(e.target.value);
                                    }}/>

                                    <span style={{fontSize:'12px', margin:'0px', padding:'0px'}}  className={`messageCfpassword ${isValidCFpassword ? 'success' : 'error'}`} >
                                        {messageStrongpassword}
                                    </span>
                                </div>

                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label" style={{fontSize:"17px"}}><b>Re-type Your Password</b></label>

                                    <input class="form-control" type={passwordShown ? "text" : "password"} id="pass" style={{fontSize:"16px"}}  onChange={(e) =>{
                                                setCPasswordFnction(e.target.value);
                                            }} />
                                    <span style={{fontSize:'12px', margin:'0px', padding:'0px'}}  className={`messageCfpassword ${isValidCFpassword ? 'success' : 'error'}`} >
                                        {messageCfpassword}
                                    </span>
                                </div>

                                <div className="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label" style={{fontSize:"17px"}}><b>Enter User Type</b></label>
                                    <select class="form-select" style={{fontSize:"16px"}} onChange={(e) =>{
                                        setuserType(e.target.value);
                                    }}>
                                        <option value="Admin">Select Option</option>
                                        <option value="Employee">Employee</option>
                                        <option value="Employee">Admin</option>
                                    </select>
                                </div>

                                <div class="mt-3 mb-2">
                                    <div class="d-grid gap-2">
                                            <br/>
                                            <MDBBtn class="btn text-white bg-dark d-letter-spacing fw-light" style={{fontSize:"16px"}} disabled={Registrationbtn} onClick={Registration}>Add More Details</MDBBtn> 
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


export default EmployeeAddStepOne;