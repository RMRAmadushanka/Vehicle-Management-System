import React, { useState , useEffect } from 'react';
import { MDBIcon, MDBCardImage,
 MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol , MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import {reactLocalStorage} from 'reactjs-localstorage';
import Navbar from '../main_parts/navbar.user.log.js';
import Footer from '../main_parts/footer.js';
import NumberFormat from 'react-number-format';
import '../APIUrl';

function Advertisment() {
    const [name, setName] = useState("");
    const [contactNo, setContact] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDiscription] = useState("");
    const [imageSelected, setimageSelected] = useState("");
    const userName =  sessionStorage.getItem('user_name');
    
    const [Advertisements,setYourAllAdvertisements] = useState([]);
    useEffect(() => {
          axios.get(global.APIUrl+"/advertisement/allYourAdvertisements/"+userName)
          .then(res => setYourAllAdvertisements(res.data))
          .catch(error => console.log(error));
    });

   function save(e)
    {
        e.preventDefault();

        const formData = new FormData();
        formData.append("file" ,imageSelected);
        formData.append("upload_preset", "ml_default");

            axios.post("https://api.cloudinary.com/v1_1/dnomnqmne/image/upload",formData).then((response)=>{
            console.log(imageSelected)
            const picture =imageSelected.name;
            const advertising ={ name, contactNo, title, description , userName, picture}
            
            axios.post(global.APIUrl+"/advertisement/addAdvertisementUser",advertising).then(() =>{

            Swal.fire({  
            title: "Success!",
            text: "Added Successfully!",
            icon: 'success',
            confirmButtonText: "OK",
            type: "success"})

            
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

    function remove(adID){
        axios.delete(global.APIUrl+"/advertisement/deleteAdvertisements/"+adID).then(() =>{
            Swal.fire({  
                title: "Success!",
                text: "Advertisement Delete",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"})

        }).catch((err)=>{
            Swal.fire({  
                title: "Error!",
                text: "Advertisement Not Delete",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"})
        })
    }

    function edit( adID, name, contactNo, title, description, image, status)
    { 
        reactLocalStorage.setObject("AdvertismntEdit", [adID, name, contactNo, title, description, image, status]);
        window.location.href = "/AdvertismentEdit";
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
                <p className='text-white h1 mb-0 text-uppercase' style={{ fontSize:'55px', letterSpacing:'2px'}}>Your Advertisments</p>
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
                        <h4 className="mt-4">Your Advertisments</h4>
                    </center>
                    <table class="table">
                    <thead>
                        <tr className="bg-primary">
                            <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Advertisement Id</h6></th>
                            <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Name</h6></th>
                            <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Contact Number</h6></th>
                            <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Title</h6></th>
                            <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Action</h6></th> 
                        </tr>
                    </thead>
                    <tbody>
                         {Advertisements.map((Advertisement,key) => (
                            <tr className="bg-light">
                                <td style={{fontSize:'18px'}}>{Advertisement.adID}</td>
                                <td style={{fontSize:'18px'}}>{Advertisement.name}</td>
                                <td style={{fontSize:'18px'}}>{Advertisement.contactNo}</td>
                                <td style={{fontSize:'18px'}}>{Advertisement.title}</td>
                                <td>
                                    <MDBBtn size='sm' className="shadow-0" color='danger' onClick={() => remove(Advertisement.adID)}><MDBIcon far icon="trash-alt" /></MDBBtn>{''}&nbsp;&nbsp;
                                    <MDBBtn size='sm' className="shadow-0" color='info'  onClick={() => edit(
                                        Advertisement.adID,
                                        Advertisement.name,
                                        Advertisement.contactNo,
                                        Advertisement.title,
                                        Advertisement.description,
                                        Advertisement.image,
                                        Advertisement.status)}  ><MDBIcon far icon="edit" /></MDBBtn>
                                </td>
                            </tr>
                            ))}
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="card shadow-0 bg-light">
                <div class="card-body text-left">
                    <center>
                        <h4 className="mt-4">Create Advertisment</h4>
                    </center>
                       <div className="mb-3">
                            <label  class="form-label h5">Image </label>
                            <input type="file" onChange={(e) =>{
                            setimageSelected(e.target.files[0]);
                            }} class="form-control" id="customFile" />
                      </div>
                      <div class="mb-3">
                            <label  class="form-label h5">Name</label>
                            <input type="text" class="form-control"  onChange={(e) =>{
                                setName(e.target.value);
                            }}/>
                      </div>
                      <div class="mb-3">
                            <label  class="form-label h5">Contact Number</label>
                             <NumberFormat format="0## ### #### " class="form-control" placeholder="071 191 0000"  onChange={(e) =>{
                                setContact(e.target.value);
                            }}/>
                      </div>
                      <div class="mb-3">
                            <label  class="form-label h5">Title</label>
                            <input type="text" class="form-control"  onChange={(e) =>{
                                setTitle(e.target.value);
                            }}/>
                      </div>
                      <div class="mb-3">
                            <label  class="form-label h5">Discription</label>
                            <textarea class="form-control" rows="5"  onChange={(e) =>{
                                setDiscription(e.target.value);
                            }}></textarea>
                      </div>
                      <div className="text-end">
                            <button type="button" class="btn btn-dark" onClick={save}>Save</button>
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

export default Advertisment;