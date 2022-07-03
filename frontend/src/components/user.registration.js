    
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
import Navbar from './main_parts/navbar.js';
import Footer from './main_parts/footer.js';
import NumberFormat from 'react-number-format';
import passwordValidator from 'password-validator';
var schema = new passwordValidator();

function User_registration() {
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
   const [Category, setCategory] = useState("");
   const [Brand, setBrand] = useState("");
   const [Salary, setSalary] = useState("");
   const [dreamVehicle, setdreamVehicle] = useState("");

   const [AllCategories,setAllCategory] = useState([])
   useEffect(() => {
            axios.get(global.APIUrl+"/vehicle_category/allVehicleCategory")
            .then(res => setAllCategory(res.data))
            .catch(error => console.log(error));
         });

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
       const userType = "Customer";
       const status ="Approved";
       const userReg ={ password, UserName, phone,userType, status, Category, Brand, Salary, dreamVehicle}

        axios.post(global.APIUrl+"/user/register",userReg).then(() =>{

        Swal.fire({  
          title: "Success!",
          text: "Registrtaion Success!",
          icon: 'success',
          confirmButtonText: "OK",
          type: "success"}).then(okay => {
          if (okay) {
              window.location.href = "/UserLogin";
          }
        });

        
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
                        <MDBCardImage style={{width:'110%', marginTop:'45%'}} position='top' alt='...' src='./img/suv3.png' />
                    </MDBCard>
                </MDBCol>
                 <MDBCol sm='6'>
                      <MDBCard className="border-0 shadow-0 p-5">
                    <MDBCardBody className="pt-5 mt-3 text-left">
                       <div className="bg-light p-4">
                         <center><h2 className="text-uppercase">Create New Profile </h2></center>
                        <div class="mb-3">
                          <label for="exampleFormControlInput1" class="form-label">User Name</label>
                          <input type="text" class="form-control" 
                          onChange={(e) =>{
                              setUserName(e.target.value);
                          }}/>
                        </div>
                        <div class="mb-3">
                          <label for="exampleFormControlInput1" class="form-label">Phone Number</label>
                          <NumberFormat format="0## ### ####" class="form-control" placeholder="071 110 1111"  onChange={(e) =>{
                              setPhone(e.target.value);
                          }} />
                        </div>
                        <div class="mb-3">
                          <label for="exampleFormControlInput1" class="form-label">Password</label>
                         <input class="form-control" type={passwordShown ? "text" : "password"} id="pass" onChange={(e) =>{
                            setPasswordFunction(e.target.value);
                         }}/>
                         <span style={{fontSize:'12px', margin:'0px', padding:'0px'}}  className={`messageCfpassword ${isValidCFpassword ? 'success' : 'error'}`} >
                              {messageStrongpassword}
                          </span>
                        </div>
                        <div class="mb-3">
                          <label for="exampleFormControlInput1" class="form-label">Retype Password</label>
                          <input class="form-control" type={passwordShown ? "text" : "password"} id="pass"  onChange={(e) =>{
                                            setCPasswordFnction(e.target.value);
                                          }} />
                          <span style={{fontSize:'12px', margin:'0px', padding:'0px'}}  className={`messageCfpassword ${isValidCFpassword ? 'success' : 'error'}`} >
                              {messageCfpassword}
                          </span>
                        </div>
                        
                        <hr className="mt-5 mb-4"/>
                         <div class="mb-3">
                          <label for="exampleFormControlInput1" class="form-label">Your Favorite Vehicle Category</label>
                          <select class="form-select" required  onChange={(e) =>{
                                        setCategory(e.target.value);
                                    }}>
                                        <option selected>Your Favorite Vehicle Category</option>
                                        {AllCategories.map((AllCategory,key) => (
                                                        <option value={AllCategory.name}>{AllCategory.name}</option>
                                        ))}
                          </select>
                        </div>
                         <div class="mb-3">
                          <label for="exampleFormControlInput1" class="form-label">Your Favorite Vehicle Brand</label>
                          <select class="form-select"  onChange={(e) =>{
                                        setBrand(e.target.value);
                                    }}>
                                        <option selected>Your Favorite Vehicle Brand</option>
                                        <option value="BMW">BMW</option>
                                        <option value="Benz">Benz</option>
                                        <option value="Jeep">Jeep</option>
                                        <option value="Toyota">Toyota</option>
                                        <option value="Bajaj">Bajaj</option>
                                        <option value="Isuski">Isuski</option>
                                        <option value="Nisan">Nisan</option>
                                        <option value="Masda">Masda</option>
                                       
                          </select>
                        </div>
                         <div class="mb-3">
                          <label for="exampleFormControlInput1" class="form-label">Your Average Salary</label>
                          <input type="text" class="form-control" 
                                                  onChange={(e) =>{
                                                      setSalary(e.target.value);
                                                  }}/>
                         </div>
                         <div class="mb-3">
                          <label for="exampleFormControlInput1" class="form-label">Your Dream Vehicle</label>
                          <input type="text" class="form-control" 
                                                  onChange={(e) =>{
                                                      setdreamVehicle(e.target.value);
                                                  }}/>
                         </div>
                         <div class="mt-3 mb-2">
                            <div class="d-grid gap-2">
                                    <br/>
                                    <MDBBtn class="btn text-white bg-dark d-letter-spacing fw-light" style={{fontSize:"20px"}} disabled={Registrationbtn} onClick={Registration}>Register</MDBBtn> 
                            </div>
                         </div>
                         <center>
                          <MDBRow >
                              <MDBCol size='5'></MDBCol>
                              <MDBCol size='5'></MDBCol>
                              <MDBCol size='2'><a href="/UserLogin" class="text-muted">Sing In</a></MDBCol>
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

export default User_registration;