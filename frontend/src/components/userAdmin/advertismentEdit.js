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

function AdvertismentEdit() {

    var AdvertismntEdit = reactLocalStorage.getObject('AdvertismntEdit');
    const id = AdvertismntEdit[0];

    const [name, setName] = useState(AdvertismntEdit[1]);
    const [contactNo, setContact] = useState(AdvertismntEdit[2]);
    const [title, setTitle] = useState(AdvertismntEdit[3]);
    const [description, setDiscription] = useState(AdvertismntEdit[4]);
    const [img, setimg] = useState(AdvertismntEdit[5]);


    function Edit(e)
    {
       e.preventDefault();
     
       const adEdit ={name, contactNo, title, description}

        axios.put(global.APIUrl+"/advertisement/editAdvertisment/"+id,adEdit).then(() =>{

            Swal.fire({  
                title: "Success!",
                text: "Adverticement Edit Success!",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"}).then(okay => {
                if (okay) {
                    window.location.href = "/Advertisment";
                }
            }); 
        }).catch((err)=>{

            Swal.fire({  
            title: "Error!",
            text: "Adverticement Edit Not Success",
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
                <p className='text-white h1 mb-0 text-uppercase' style={{ fontSize:'55px', letterSpacing:'2px'}}>Advertisement Edit</p>
                </div>
            </div>
        </div>
        <br/>
        <br/>
         <center>
         <div class="row container-fluid" style={{marginTop:'7%', marginBottom:'26%'}}>
            <div class="col-sm-5">
               <img src={"https://res.cloudinary.com/dnomnqmne/image/upload/v1630743483/"+img} class="card-img-top" alt="..."/>
            </div>
            <div class="col-sm-7">
                <div class="card shadow-0 bg-light">
                <div class="card-body text-left">
                      
                      <div class="mb-3">
                            <label  class="form-label h5">Name</label>
                            <input type="text" disabled value={name} class="form-control"  onChange={(e) =>{
                                setName(e.target.value);
                            }}/>
                      </div>
                      <div class="mb-3">
                            <label  class="form-label h5">Contact Number</label>
                            <input type="tel" class="form-control" value={contactNo} onChange={(e) =>{
                                setContact(e.target.value);
                            }}/>
                      </div>
                      <div class="mb-3">
                            <label  class="form-label h5">Title</label>
                            <input type="text" class="form-control" value={title} onChange={(e) =>{
                                setTitle(e.target.value);
                            }}/>
                      </div>
                      <div class="mb-3">
                            <label  class="form-label h5">Discription</label>
                            <textarea class="form-control" rows="5"  onChange={(e) =>{
                                setDiscription(e.target.value);
                            }}>{description}</textarea>
                      </div>
                      <div class="mb-3 text-right">
                             <button type="button" class="btn btn-dark d-letter-spacing" onClick={Edit}>Edit</button>&nbsp;&nbsp;&nbsp; 
                             <a href="Advertisment">
                                <button type="button" class="btn btn-outline-dark d-letter-spacing" >Back</button>           
                             </a>          
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

export default AdvertismentEdit;