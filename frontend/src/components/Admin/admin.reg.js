    
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
import Navbar from '../main_parts/navbar.js';
import Footer from '../main_parts/footer.js';
import NumberFormat from 'react-number-format';
import passwordValidator from 'password-validator';
var schema = new passwordValidator();

function Admin_registration() {
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
                    window.location.href = "/EmployeeProfile";
                }
            });
        }else{
            Swal.fire({  
                title: "Success!",
                text: "Registrtaion Success!",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"}).then(okay => {
                if (okay) {
                    window.location.href = "/AdminLogin";
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
            <div>
                <Navbar/>
                <MDBRow  style={{marginTop:'1%', marginBottom:'10%', width:'99%'}}>
                <MDBCol sm='1'></MDBCol>
                 <MDBCol sm='5'>
                    <MDBCard className="border-0 shadow-0">
                        <MDBCardImage style={{width:'100%', marginTop:'45%'}} position='top' alt='...' src='./img/suv-5.png' />
                    </MDBCard>
                </MDBCol>
                 <MDBCol sm='6'>
                      <MDBCard className="border-0 shadow-0 p-5">
                    <MDBCardBody className="pt-5 mt-3 text-left">
                       <div className="bg-light p-4">
                            <center><h1 className="text-uppercase">Admin / Employee Registration </h1></center>
                            <hr/>

                            <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label" style={{fontSize:"20px"}}><b>User Name</b></label>
                            <input type="text" class="form-control" 
                            style={{fontSize:"18px"}}
                            onChange={(e) =>{
                                setUserName(e.target.value);
                            }}/>
                            </div>

                            <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label" style={{fontSize:"20px"}}><b>Phone Number</b></label>
                            
                            <NumberFormat format="0## ### ####" class="form-control"  placeholder="0## ### ## ##" style={{fontSize:"18px"}} onChange={(e) =>{
                                setPhone(e.target.value);
                            }}/>
                            </div>

                            <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label" style={{fontSize:"20px"}}><b>Password</b></label>
                            <input class="form-control" type={passwordShown ? "text" : "password"} id="pass" style={{fontSize:"18px"}} onChange={(e) =>{
                                setPasswordFunction(e.target.value);
                            }}/>
                            <span style={{fontSize:'12px', margin:'0px', padding:'0px'}}  className={`messageCfpassword ${isValidCFpassword ? 'success' : 'error'}`} >
                                {messageStrongpassword}
                            </span>
                            </div>

                            <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label" style={{fontSize:"20px"}}><b>Retype Password</b></label>
                            <input class="form-control" type={passwordShown ? "text" : "password"} id="pass" style={{fontSize:"18px"}}  onChange={(e) =>{
                                                setCPasswordFnction(e.target.value);
                                            }} />
                            <span style={{fontSize:'12px', margin:'0px', padding:'0px'}}  className={`messageCfpassword ${isValidCFpassword ? 'success' : 'error'}`} >
                                {messageCfpassword}
                            </span>
                            </div>

                            <div className="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label" style={{fontSize:"20px"}}><b>User Type</b></label>
                                    <select class="form-select" style={{fontSize:"18px"}}  onChange={(e) =>{
                                        setuserType(e.target.value);
                                    }}>
                                        <option value="">Select value</option>
                                        <option value="Admin">Admin</option>
                                        <option value="Employee">Employee</option>
                                    </select>
                            </div>

                            <div class="mt-3 mb-2">
                                <div class="d-grid gap-2">
                                        <br/>
                                        <MDBBtn class="btn text-white bg-dark d-letter-spacing fw-light" style={{fontSize:"18px"}} disabled={Registrationbtn} onClick={Registration}>Register</MDBBtn> 
                                </div>
                            </div>

                            <center>
                            <MDBRow >
                                <MDBCol size='5'></MDBCol>
                                <MDBCol size='5'></MDBCol>
                                <MDBCol size='2'><a href="/AdminLogin" style={{fontSize:"18px"}} class="text-muted">Sign In</a></MDBCol>
                            </MDBRow>
                            </center>

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