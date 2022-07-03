
import React, { useState , useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBBtn} from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import {reactLocalStorage} from 'reactjs-localstorage';
import NumberFormat from 'react-number-format';
import Navbar from "../adminNav";


function ImportVehicleAdd() {
   
    const [auctionDate, setAuctionDate] = useState("");
    const [vehicleType, setVehicleType] = useState("");
    const [brand, setBrandName] = useState("");
    const [model, setModel] = useState("");
    const [milage, setMilage] = useState("");
    const [m_year, setMYear] = useState("");
    const [engine_cc, setEngineCC] = useState("");
    const [transmission, setTransmission] = useState("");
    const [fuel, setFuel] = useState("");
    const [color, setColor] = useState("");
    const [condition, setCondition] = useState("");
    const [auctionPrice, setPrice] = useState("");
    const [imageSelected, setimageSelected] = useState("");

      function save(e)
    {
            e.preventDefault();
            const formData = new FormData();
            formData.append("file" ,imageSelected);
            formData.append("upload_preset", "ml_default");
            axios.post("https://api.cloudinary.com/v1_1/dnomnqmne/image/upload",formData).then((response)=>{
            const image =imageSelected.name;

            const vehicle_import_data ={ auctionDate, vehicleType, brand, model, milage, m_year, engine_cc, transmission, fuel, color, condition, auctionPrice, image}
            axios.post(global.APIUrl+"/vehicle_import/addvehicle_imported",vehicle_import_data).then(() =>{

            Swal.fire({  
            title: "Success!",
            text: "Import Vehicle Added!",
            icon: 'success',
            confirmButtonText: "Success",
            confirmButtonColor: '#8a0a0a',
            type: "danger"}).then(okay => {
            if (okay) {
                  window.location.href = "/ImportDashboard";
            }
            });

            
        }).catch((err)=>{

            Swal.fire({  
            title: "Error!",
            text: "Import Vehicle Not Added!",
            icon: 'error',
            confirmButtonText: "Success",
            confirmButtonColor: '#8a0a0a',
            type: "danger"})
        }) 
      })
    }

    return (
    <div class="dashboard-main-wrapper" >
        <Navbar/>
        <div class="dashboard-wrapper">
            <div  style={{paddingTop:'3%',paddingLeft:'2%', width:'98%'}}>
                <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{color:'black'}}><i class="fas fa-home"></i>Admin Dashboard</h4>
                <hr/>
                 <div className="container-fluid bg-white" style={{paddingLeft:'5%', paddingTop:'2%' ,paddingBottom:'2%', paddingRight:'5%'}} >
                     <center>
                         <h1 className="text-uppercase"><u>Add New Vehicle </u></h1>
                     </center>
                     <div className="text-end mt-5">
                         <a href="ImportDashboard">
                            <MDBBtn className='btn-sm' style={{ fontSize:'15px', fontWeight:'100',letterSpacing:'2px' }} color='dark'>
                                Back
                            </MDBBtn>
                        </a>
                     </div>
                      <MDBRow>
                        <MDBCol sm='5'>
                            <MDBCard className='shadow-0'>
                            <MDBCardBody >
                               
                                       <div class="mb-3 mt-3">
                                            <label  class="form-label h5" style={{fontWeight:"bold",fontSize:"20px"}}>Enter Date</label>
                                            <input type="date" class="form-control" style={{fontSize:"17px"}}  onChange={(e) =>{
                                                setAuctionDate(e.target.value);
                                            }}/>
                                        </div>

                                        <div class="mb-3">
                                            <label  class="form-label h5" style={{fontWeight:"bold",fontSize:"20px"}}>Enter Vehicle Type</label>
                                            <select class="form-select" style={{fontSize:"17px"}} onChange={(e) =>{
                                                setVehicleType(e.target.value);
                                            }}>
                                                    <option selected>Select Vehicle Type</option>
                                                    <option value="Car">Car</option>
                                                    <option value="Van">Van</option>
                                                    <option value="Bike">Bike</option>
                                                    <option value="Sport Car">Sport Car</option>
                                                    <option value="SUV">SUV</option>
                                                    <option value="Heavy Vehicle">Heavy Vehicle</option>
                                            </select>
                                        </div>

                                        <div class="mb-3">
                                            <label  class="form-label h5" style={{fontWeight:"bold",fontSize:"20px"}}>Enter Brand Name</label>
                                            <input type="text" class="form-control" list="datalistModel" placeholder="Enter Brand Name" style={{fontSize:"17px"}} onChange={(e) =>{
                                                setBrandName(e.target.value);
                                            }}/>
                                            <datalist id="datalistModel">
                                                <option value="Toyota"/>
                                                <option value="Zuzuki"/>
                                                <option value="Tesla"/>
                                                <option value="Mitsubishi"/>
                                                <option value="BMW"/>
                                                <option value="Benz"/>
                                            </datalist>
                                        </div>
                                        <div class="mb-3">
                                            <label  class="form-label h5" style={{fontWeight:"bold",fontSize:"20px"}}>Enter Vehicle Model</label>
                                            <input type="text" class="form-control" style={{fontSize:"17px"}} placeholder="Enter Vehicle Model"   onChange={(e) =>{
                                                setModel(e.target.value);
                                            }}/>
                                            
                                        </div>
                                         <div class="mb-3">
                                            <label  class="form-label h5" style={{fontWeight:"bold",fontSize:"20px"}}>Milage (Km)</label>
                                           
                                            <NumberFormat format="######" class="form-control" style={{fontSize:"17px"}} placeholder="Enter Mileage" onChange={(e) =>{
                                                setMilage(e.target.value);
                                            }}/>
                                        </div>
                                         <div class="mb-3">
                                            <label  class="form-label h5" style={{fontWeight:"bold",fontSize:"20px"}}>Manufacturing Year</label>
                                            <NumberFormat format="####" class="form-control" style={{fontSize:"17px"}} placeholder="Enter Manufacturing Year" onChange={(e) =>{
                                                    setMYear(e.target.value);
                                            }} />
                                        </div>
                            </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol sm='1'></MDBCol>
                        <MDBCol sm='6'>
                            <MDBCard className='shadow-0'>
                            <MDBCardBody>
                              <div class="mb-3">
                                            <label  class="form-label h5" style={{fontWeight:"bold",fontSize:"20px"}}>Engine CC</label>
                                             <NumberFormat format="####" class="form-control" style={{fontSize:"17px"}} placeholder="Enter Engine CC" onChange={(e) =>{
                                                    setEngineCC(e.target.value);
                                            }} />
                                        </div>
                                        <div class="mb-3">
                                            <label  class="form-label h5" style={{fontWeight:"bold",fontSize:"20px"}}>Transmission</label>
                                            <select class="form-select" style={{fontSize:"17px"}}  onChange={(e) =>{
                                                setTransmission(e.target.value);
                                            }}>
                                                    <option selected>Select Transmission</option>
                                                    <option value="Gear">Gear</option>
                                                    <option value="Hybrid">Hybrid</option>
                                                    <option value="Automatic">Automatic</option>
                                                    
                                            </select>
                                        </div>
                                         <div class="mb-3">
                                            <label  class="form-label h5" style={{fontWeight:"bold",fontSize:"20px"}}>Fuel Type</label>
                                            <select class="form-select" style={{fontSize:"17px"}}  onChange={(e) =>{
                                                setFuel(e.target.value);
                                            }}>
                                                    <option selected>Select Fuel Type</option>
                                                    <option value="Petrol">Petrol</option>
                                                    <option value="Diesel">Diesel</option>
                                                    <option value="Electric">Electric</option>
                                            </select>
                                        </div>
                                         <div class="mb-3">
                                            <label  class="form-label h5" style={{fontWeight:"bold",fontSize:"20px"}}>Color</label>
                                            <input type="text" id="listColor" class="form-control" style={{fontSize:"17px"}} placeholder="Enter Color of Vehicle" onChange={(e) =>{
                                                setColor(e.target.value);
                                            }}/>
                                             <datalist id="listColor">
                                                <option value="Black"/>
                                                <option value="Red"/>
                                                <option value="Gray"/>
                                                <option value="Blue"/>
                                                <option value="White"/>
                                                <option value="Green"/>
                                            </datalist>
                                        </div>
                                        <div class="mb-3">
                                            <label  class="form-label h5" style={{fontWeight:"bold",fontSize:"20px"}}>Condition Grade</label>
                                            <select class="form-select" style={{fontSize:"17px"}} onChange={(e) =>{
                                                setCondition(e.target.value);
                                            }}>
                                                    <option selected>Select Condition Grade</option>
                                                    <option value="Used">Used</option>
                                                    <option value="Brand New">Brand New</option>
                                            </select>
                                        </div>
                                        <div class="mb-3">
                                            <label  class="form-label h5" style={{fontWeight:"bold",fontSize:"20px"}}>Price</label>
                                            <input type="number" class="form-control" style={{fontSize:"17px"}} placeholder="Enter Price of the Vehicle" onChange={(e) =>{
                                                setPrice(e.target.value);
                                            }}/>
                                        </div>
                                        <div class="mb-3">
                                        <label  class="form-label h5" style={{fontWeight:"bold",fontSize:"20px"}}>Enter Image &nbsp;&nbsp;&nbsp;</label>
                                             <input type="file" style={{fontSize:"17px"}} onChange={(e) =>{
                                                setimageSelected(e.target.files[0]);
                                              }} class="form-control" id="customFile" />
                                        </div>
                                         
                                       <div className="text-end">
                                               <br/>
                                                <button type="button" class="btn btn-dark" style={{fontSize:"18px"}} onClick={save}>Save</button>
                                      </div>
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


export default ImportVehicleAdd;