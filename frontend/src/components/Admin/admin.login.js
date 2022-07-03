import React, { useState , useEffect } from 'react';
import { MDBIcon,MDBBtn, MDBCol, MDBCard, MDBCardImage, MDBRow , MDBCardBody } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import {reactLocalStorage} from 'reactjs-localstorage';
import Navbar from '../main_parts/navbar.js';
import Footer from '../main_parts/footer.js';
import '../APIUrl';

function AdminLogin() {
    const [password, setPassword] = useState("");
    const [UserName, setUsername] = useState("");
    const [disabled, setdisabled] = useState(true);
    
    function set_Password(event) {
        setPassword(event);
        if(UserName ==='' && password ===''){
            setdisabled(true);
        }else{
            setdisabled(false);
        }
    }

     async function login(e){
       e.preventDefault();

       let item = {UserName, password};
       let result = await fetch(global.APIUrl+"/user/loginAdmin", {
         method: 'POST',
         headers:{
            "Content-Type" : "application/json",
            "Accept" : "application/json"
         },
         body:JSON.stringify(item)
      });
      result = await result.json();
      //localStorage.setItem("user-info",JSON.stringify(result));
      console.log(JSON.stringify(result.message));
   
      if( JSON.stringify(result.message) === 'true'){
            sessionStorage.setItem("user_name", UserName);
            
          	Swal.fire({  
			title: "Success!",
			text: "Login Success",
			icon: 'success',
			confirmButtonText: "OK",
			type: "success"}).then(okay => {
				if (okay) {
					window.location.href = "/Admin";
				}
			});
      }else{
          	Swal.fire({  
			title: "Error!",
			text: "Login Not Success",
			icon: 'error',
			confirmButtonText: "OK",
			type: "success"})
       }
    }
    return (
    <div>
        <div className="pt-1 pb-1" style={{backgroundColor:'#F4F4F4'}}>
            <center>
                <small style={{fontSize:'14px', letterSpacing:'2px'}} className="text-muted text-capitalize">The Largest Automobile Service Hub In The Sri Lanka</small>
            </center>
        </div>
        <Navbar/>
                <MDBRow  style={{marginTop:'10%', marginBottom:'10%', width:'99%'}}>

                <MDBCol sm='1'></MDBCol>

                <MDBCol sm='6'>
                    <MDBCard className="border-0 shadow-0">
                        <MDBCardImage style={{width:'100%', marginTop:'7%'}}  position='top' alt='...' src='./img/suv-5.png' />
                    </MDBCard>
                </MDBCol>

                <MDBCol sm='5'>
                    <MDBCard className="border-0 shadow-0 p-5">
                    <MDBCardBody className="pt-5 mt-3 text-left">

                       <div className="bg-light p-4">
                        <center><h1 className="text-uppercase">Admin Sign In</h1></center>
                        <hr/>
                        <div class="mb-3">
                         <label for="exampleFormControlInput1" class="form-label" style={{fontSize:"20px"}}><b>User Name</b></label>
                         <input class="form-control"  id="pass" placeholder="Enter your username" style={{fontSize:"18px"}} onChange={(e) =>{
                            setUsername(e.target.value);
                         }}/>
                        </div>

                        <div class="mb-3">
                          <label for="exampleFormControlInput1" class="form-label" style={{fontSize:"20px"}}><b>Password</b></label>
                          <input class="form-control" type="password" id="pass" placeholder="Enter your password" style={{fontSize:"18px"}}  onChange={(e) =>{
                            set_Password(e.target.value);
                           }} />
                        </div>
                        
                         <div class="mt-3 mb-2">
                            <div class="d-grid gap-2">
                                    <br/>
                                    <MDBBtn class="btn text-white bg-dark d-letter-spacing fw-light" style={{fontSize:"18px"}} disabled={disabled} onClick={login}>Login</MDBBtn> 
                            </div>
                         </div>

                         <center>
                          <MDBRow >
                              <MDBCol size='3'><a href="/AdminReg" class="text-muted" style={{fontSize:"13px"}}><u>New Registration</u></a></MDBCol>

                              <MDBCol size='4'></MDBCol>
                              
                              
                              <hr/>
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

export default AdminLogin;