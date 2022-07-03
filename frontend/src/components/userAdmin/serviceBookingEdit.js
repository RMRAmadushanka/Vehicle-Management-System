import React, { useState , useEffect } from 'react';
import { MDBIcon, MDBCardImage,
 MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol , MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import {reactLocalStorage} from 'reactjs-localstorage';
import Navbar from '../main_parts/navbar.user.log.js';
import Footer from '../main_parts/footer.js';
import '../APIUrl';

function ServiceBookingEdit() {

    var BookingEdit = reactLocalStorage.getObject('BookingEdit');
    const id = BookingEdit[0];

    const [name,setName] = useState(BookingEdit[1]);
    const [email,setEmail] = useState(BookingEdit[2]);
    const [telephone1,setPhone] = useState(BookingEdit[3]);
    const [serviceType,setServiceType] = useState(BookingEdit[4]);
    const [vehicleType,setVehicleType] = useState(BookingEdit[5]);
    const [serviceCenter,setServiceCenterSelect] = useState(BookingEdit[6]);

    const [ServiceCenters,setServiceCenter] = useState([]);
    useEffect(() => {
          axios.get(global.APIUrl+"/service_Center/allService_center")
          .then(res => setServiceCenter(res.data))
          .catch(error => console.log(error));
    });

 
    function Edit(e)
    {
       e.preventDefault();
     
       const bookEdit ={serviceType, vehicleType, serviceCenter}

        axios.put(global.APIUrl+"/serviceBooking/editServiceBooking/"+id,bookEdit).then(() =>{

            Swal.fire({  
                title: "Success!",
                text: "Booking Edit Success!",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"}).then(okay => {
                if (okay) {
                    window.location.href = "/serviceBooking";
                }
            }); 
        }).catch((err)=>{

            Swal.fire({  
            title: "Error!",
            text: "Booking Edit Not Success",
            icon: 'error',
            confirmButtonText: "OK",
            type: "success"})
        })
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
                <p className='text-white h1 mb-0 text-uppercase' style={{ fontSize:'55px', letterSpacing:'2px'}}>Service Booking Edit</p>
                </div>
            </div>
        </div>
        <br/>
        <br/>
         <center>
         <div class="row container-fluid" style={{marginTop:'7%', marginBottom:'26%'}}>
            <div class="col-sm-3">
              
            </div>
            <div class="col-sm-6">
                <div class="card shadow-0 bg-light">
                <div class="card-body text-left">
                    <center>
                        <h4 className="mt-4">Edit Booking</h4>
                    </center>
                    <div class="mb-3">
                        <label  class="form-label h5">Name</label>
                        <input type="text" value={name} disabled class="form-control"  onChange={(e) =>{
                            setName(e.target.value);
                         }} />
                    </div>
                    <div class="mb-3">
                        <label  class="form-label h5">Email</label>
                        <input type="email" class="form-control" value={email} disabled class="form-control"onChange={(e) =>{
                            setEmail(e.target.value);
                         }}/>
                    </div>
                    <div class="mb-3">
                        <label  class="form-label h5">Phone Number</label>
                        <input type="tel" class="form-control" value={telephone1} disabled  onChange={(e) =>{
                            setPhone(e.target.value);
                         }}/>
                    </div>
                    <div class="mb-3">
                        <label  class="form-label h5">Service Type</label>
                        <select class="form-select" aria-label="Default select example"  onChange={(e) =>{
                            setServiceType(e.target.value);
                         }}>
                            <option selected>Select Service Type</option>
                            <option className="text-white bg-danger" value={serviceType}>{serviceType}</option>
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
                             <option className="text-white bg-danger" value={vehicleType}>{vehicleType}</option>
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
                            <option className="text-white bg-danger" value={serviceCenter}>{serviceCenter}</option>
                            {ServiceCenters.map((ServiceCenter,key) => (
                            <option value={ServiceCenter.location}>{ServiceCenter.location}</option>
                            ))}
                        </select>
                    </div>
                      <div class="mb-3 text-right">
                             <button type="button" class="btn btn-dark d-letter-spacing" onClick={Edit}>Edit</button>&nbsp;&nbsp;&nbsp; 
                             <a href="serviceBooking">
                                <button type="button" class="btn btn-outline-dark d-letter-spacing" >Back</button>           
                             </a>          
                      </div>
                </div>
                </div>
            </div>
             <div class="col-sm-3">
              
            </div>
        </div>
        </center>
        <Footer/>
    </div>
    )
};

export default ServiceBookingEdit;