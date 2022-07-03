import React, { useState , useEffect } from 'react';
import { MDBIcon, MDBCardImage,
 MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol , MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import {reactLocalStorage} from 'reactjs-localstorage';
import Navbar from '../main_parts/navbar.user.log.js';
import NumberFormat from 'react-number-format';

import Footer from '../main_parts/footer.js';
import '../APIUrl';

function ServiceBooking() {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [telephone1,setPhone] = useState("");
    const [serviceType,setServiceType] = useState("");
    const [vehicleType,setVehicleType] = useState("");
    const [serviceCenter,setServiceCenterSelect] = useState("");
    const userName =  sessionStorage.getItem('user_name');
    const [ServiceCenters,setServiceCenter] = useState([]);
    useEffect(() => {
          axios.get(global.APIUrl+"/service_Center/allService_center")
          .then(res => setServiceCenter(res.data))
          .catch(error => console.log(error));
    });

    const [YourBookings,setYourBooking] = useState([]);
    useEffect(() => {
          axios.get(global.APIUrl+"/serviceBooking/allServiceBooking/"+userName)
          .then(res => setYourBooking(res.data))
          .catch(error => console.log(error));
    });

    function save(e)
    {
       e.preventDefault();
     
       const book ={ name, email, telephone1, serviceType, vehicleType, serviceCenter , userName}

        axios.post(global.APIUrl+"/serviceBooking/addServiceBooking",book).then(() =>{

            Swal.fire({  
                title: "Success!",
                text: "Booking Success!",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"})
        }).catch((err)=>{

            Swal.fire({  
            title: "Error!",
            text: "Booking Not Success",
            icon: 'error',
            confirmButtonText: "OK",
            type: "success"})
        })
    }

    
      const [isValidCFpassword, setIsValidCfpassword] = useState(false);
      const [emailStatus, setemailStatus] = useState('');

     function set_Email(e) {
        const email_pre = e;
        var atposition=email_pre.indexOf("@");  
        var dotposition=email_pre.lastIndexOf(".");  
        if (atposition<1 || dotposition<atposition+2 || dotposition+2>=email_pre.length){  
                    setemailStatus('InValid Email');
                    setIsValidCfpassword(false);
        }else{
                    setIsValidCfpassword(true);
                    setemailStatus('Valid Email');
            }   

          setEmail(e); 
      }

    function edit(_id,name,email,telephone1,serviceType, vehicleType, serviceCenter, status)
    {
        reactLocalStorage.setObject("BookingEdit", [_id,name,email,telephone1,serviceType, vehicleType, serviceCenter, status]);
        window.location.href = "/serviceBookingEdit";
    }
        
    return (
    <div>
        <div className="pt-1 pb-1" style={{backgroundColor:'#F4F4F4'}}>
            <center>
                <small style={{fontSize:'14px', letterSpacing:'2px'}} className="text-muted text-capitalize">The Largest Autobile Service Hub In The Sri Lanka</small>
            </center>
        </div>
        <Navbar/>
        <div className='bg-image' >
            <img src='https://img.freepik.com/free-vector/customer-online-review-rating-feedback-set_124507-8052.jpg?size=626&ext=jpg' className='img-fluid' alt='Sample' />
            <div className='mask' style={{ backgroundColor: '#292929' }}>
                <div className='d-flex justify-content-center align-items-center h-100'>
                <p className='text-white h1 mb-0 text-uppercase' style={{ fontSize:'55px', letterSpacing:'2px'}}>Service Booking</p>
                </div>
            </div>
        </div>
        <br/>
        <br/>
         <center>
         <div class="row container-fluid" style={{marginTop:'7%', marginBottom:'26%'}}>
            <div class="col-sm-8">
               <div class="card shadow-0 bg-light">
                <div class="card-body text-left">
                    <center>
                        <h4 className="mt-4">Your Bookings</h4>
                    </center>
                    <table class="table">
                    <thead>
                        <tr className="bg-dark">
                            <th scope="col" className="text-white d-letter-spacing h6">Service Type</th>
                            <th scope="col" className="text-white d-letter-spacing h6">Vehicle Type</th>
                            <th scope="col" className="text-white d-letter-spacing h6">Service Center</th>
                            <th scope="col" className="text-white d-letter-spacing h6">Status</th>
                            <th scope="col" className="text-white d-letter-spacing h6">Edit Your Booking</th>
                        </tr>
                    </thead>
                    <tbody>
                         {YourBookings.map((YourBooking,key) => (
                            <tr>
                                <td style={{fontSize:'18px'}}>{YourBooking.serviceType}</td>
                                <td style={{fontSize:'18px'}}>{YourBooking.vehicleType}</td>
                                <td style={{fontSize:'18px'}}>{YourBooking.serviceCenter}</td>
                                <td style={{fontSize:'18px'}}>{YourBooking.status}</td>
                                <td style={{fontSize:'18px'}}>
                                    
                                    <button type="button" class="btn btn-dark btn-sm d-letter-spacing shadow-0" onClick={()=>edit(
                                        YourBooking._id,
                                        YourBooking.name,
                                        YourBooking.email,
                                        YourBooking.telephone1,
                                        YourBooking.serviceType,
                                        YourBooking.vehicleType,
                                        YourBooking.serviceCenter,
                                        YourBooking.status
                                        )}><MDBIcon fas icon="edit" /></button>
                                </td>
                            </tr>
                         ))}
                    </tbody>
                    </table>
                    <br/>  
                    <br/>  
                    <br/>  
                    
                    
                </div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="card shadow-0 bg-light">
                <div class="card-body text-left">
                    <center>
                        <h4 className="mt-4">Add New Booking</h4>
                    </center>
                    <div class="mb-3">
                        <label  class="form-label h5">Name</label>
                        <input type="text" class="form-control"  onChange={(e) =>{
                            setName(e.target.value);
                         }} />
                    </div>
                    <div class="mb-3">
                        <label  class="form-label h5">Email</label>
                        <input type="email" class="form-control"  onChange={(e) =>{
                            set_Email(e.target.value);
                         }}/>
                        <span style={{fontSize:'12px', margin:'0px', padding:'0px'}}  className={`messageCfpassword ${isValidCFpassword ? 'success' : 'error'}`} >
                            {emailStatus}
                        </span>
                    </div>
                    <div class="mb-3">
                        <label  class="form-label h5">Phone Number</label>
                        <NumberFormat format="0## ### ####" class="form-control"  placeholder="071 192 9098" onChange={(e) =>{
                            setPhone(e.target.value);
                        }}/>
                    </div>
                    <div class="mb-3">
                        <label  class="form-label h5">Service Type</label>
                        <select class="form-select" aria-label="Default select example"  onChange={(e) =>{
                            setServiceType(e.target.value);
                         }}>
                            <option selected>Select Service Type</option>
                            <option value="Full Service">Full Service</option>
                            <option value="Body Wash">Body Wash</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label  class="form-label h5">Vehicle Type</label>
                        <select class="form-select" aria-label="Default select example"  onChange={(e) =>{
                            setVehicleType(e.target.value);
                         }}>
                            <option selected>Select Vehicle Type</option>
                            <option value="Jeep">Jeep</option>
                            <option value="Car">Car</option>
                            <option value="Lorry">Lorry</option>
                            <option value="Bike">Bike</option>
                            <option value="Heavy Vehicle">Heavy Vehicle</option>
                        </select>
                    </div>
                      <div class="mb-3">
                        <label  class="form-label h5">Service Center</label>
                        <select class="form-select" aria-label="Default select example"  onChange={(e) =>{
                            setServiceCenterSelect(e.target.value);
                         }}>
                            <option selected>Select Service Center</option>
                            {ServiceCenters.map((ServiceCenter,key) => (
                            <option value={ServiceCenter.location}>{ServiceCenter.location}</option>
                            ))}
                        </select>
                    </div>
                      <div class="mb-3 text-right">
                             <button type="button" class="btn btn-success d-letter-spacing" onClick={save}>Save</button>           
                      </div>
                </div>
                </div>
            </div>
        </div>
        </center>
        <Footer/>
    </div>
    )
};

export default ServiceBooking;