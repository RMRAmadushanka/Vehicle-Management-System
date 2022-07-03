
import React, { useState , useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBBtn} from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import {reactLocalStorage} from 'reactjs-localstorage';
import Navbar from "../adminNav";
import jsPDF from 'jspdf';

function ImportVehicleEdit() {
    var importVehicleEdit = reactLocalStorage.getObject('importVehicleEdit');
    const id = importVehicleEdit[0];
    const [auctionDate, setAuctionDate] = useState(importVehicleEdit[1]);
    const [vehicleType, setVehicleType] = useState(importVehicleEdit[2]);
    const [brand, setBrandName] = useState(importVehicleEdit[3]);
    const [model, setModel] = useState(importVehicleEdit[4]);
    const [milage, setMilage] = useState(importVehicleEdit[5]);
    const [m_year, setMYear] = useState(importVehicleEdit[6]);
    const [engine_cc, setEngineCC] = useState(importVehicleEdit[7]);
    const [transmission, setTransmission] = useState(importVehicleEdit[8]);
    const [fuel, setFuel] = useState(importVehicleEdit[9]);
    const [color, setColor] = useState(importVehicleEdit[10]);
    const [condition, setCondition] = useState(importVehicleEdit[11]);
    const [auctionPrice, setPrice] = useState(importVehicleEdit[12]);


     function vehicleUpdate(e){
        e.preventDefault();
        const editVehicle ={ auctionDate, vehicleType, brand, model, milage, m_year, engine_cc, transmission, fuel, color, condition, auctionPrice}

        axios.put(global.APIUrl+"/vehicle_import/vehicleUpdate/"+id,editVehicle).then(() =>{
            Swal.fire({  
                title: "Vehical Details Update Success!",
                text: "Vehicle Updated",
                icon: 'success',
                confirmButtonText: "success",
                confirmButtonColor: '#8a0a0a',
                type: "success"}).then(okay => {
                if (okay) {
                    window.location.href = "/ImportDashboard";
                }
            });

        }).catch((err)=>{
            Swal.fire({  
                title: "Error!",
                text: "Vehicle Not Updated",
                icon: 'error',
                confirmButtonText: "success",
                confirmButtonColor: '#8a0a0a',
                type: "success"})
        })
    }

     function generatePDF(){
        var doc = new jsPDF();

        doc.setTextColor(254, 8, 8 );
        doc.text(20, 20, brand+' - '+model)
        doc.addFont('helvetica', 'normal')
        doc.setFontSize(12);
        doc.setTextColor(3, 3, 3);
        doc.text(25, 40, 'Vehicle Name : '+brand)
        doc.text(25, 50, 'Price : Rs.'+model)      
        doc.text(25, 60, 'Color : '+color)      
        doc.text(25, 70, 'Millage : '+milage)      
        doc.text(25, 80, 'Manufacturer Year : '+m_year)      
        doc.text(25, 90, 'Engine CC : '+engine_cc)      
        doc.text(25, 100, 'Transmission : '+transmission)     
        doc.text(25, 110, 'Fuel : '+fuel)     
        doc.text(25, 120, 'Color : '+color)     
        doc.text(25, 130, 'Condition : '+condition)     
        doc.text(25, 140, 'Auction Price : '+auctionPrice)     
        doc.save(model+'.pdf')
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
                         <h1 className="text-uppercase">Update {model} Details </h1>
                     </center>
                     <div className="text-end mt-5">
                         <a href="ImportDashboard">
                            <MDBBtn className='btn-med' style={{ fontSize:'16px', fontWeight:'100',letterSpacing:'2px' }} color='dark'>
                                Back
                            </MDBBtn>
                        </a>
                     </div>
                      <MDBRow>
                        <MDBCol sm='5'>
                            <MDBCard className='shadow-0'>
                            <MDBCardBody >
                                        <div >
                                            <label  class="form-label h5">Auction Date</label>
                                            <input type="date" class="form-control" value={auctionDate}  onChange={(e) =>{
                                                setAuctionDate(e.target.value);
                                            }}/>
                                            
                                        </div>

                                        <div class="mb-3">
                                            <label  class="form-label h5">Vehicle Type</label>
                                            <select class="form-select"  onChange={(e) =>{
                                                setVehicleType(e.target.value);
                                            }}>
                                                    <option className="text-white bg-danger" value={vehicleType}>{vehicleType}</option>
                                                    <option value="Car">Car</option>
                                                    <option value="Van">Van</option>
                                                    <option value="Bike">Bike</option>
                                                    <option value="Heavy Vehicle">Heavy Vehicle</option>
                                            </select>
                                        </div>

                                        <div class="mb-3">
                                            <label  class="form-label h5">Brand Name</label>
                                            <input type="text" class="form-control" value={brand}  list="datalistModel" onChange={(e) =>{
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
                                            <label  class="form-label h5">Model</label>
                                            <input type="text" class="form-control"  value={model}   onChange={(e) =>{
                                                setModel(e.target.value);
                                            }}/>
                                            
                                        </div>
                                         <div class="mb-3">
                                            <label  class="form-label h5">Milage (Km)</label>
                                            <input type="number" format="######" class="form-control"  value={milage}  onChange={(e) =>{
                                                setMilage(e.target.value);
                                            }}/>
                                        </div>
                                         <div class="mb-3">
                                            <label  class="form-label h5">Menufacturering Year</label>
                                            <input type="number"  class="form-control" value={m_year}  onChange={(e) =>{
                                                setMYear(e.target.value);
                                            }}/>
                                        </div>
                            </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol sm='1'></MDBCol>
                        <MDBCol sm='6'>
                            <MDBCard className='shadow-0'>
                            <MDBCardBody>
                              <div class="mb-3">
                                            <label  class="form-label h5">Engine CC</label>
                                            <input type="number" class="form-control"  value={engine_cc}   onChange={(e) =>{
                                                setEngineCC(e.target.value);
                                            }}/>
                                        </div>
                                        <div class="mb-3">
                                            <label  class="form-label h5">Transmission</label>
                                            <select class="form-select"   onChange={(e) =>{
                                                setTransmission(e.target.value);
                                            }}>
                                                    <option className="text-white bg-danger" value={transmission} >{transmission}</option>
                                                    <option value="Gear">Gear</option>
                                                    <option value="Hybrid">Hybrid</option>
                                                    <option value="Automatic">Automatic</option>
                                            </select>
                                        </div>
                                         <div class="mb-3">
                                            <label  class="form-label h5">Fuel Type</label>
                                            <select class="form-select"  onChange={(e) =>{
                                                setFuel(e.target.value);
                                            }}>
                                                    <option className="text-white bg-danger" value={fuel} >{fuel}</option>
                                                    <option value="Petrol">Petrol</option>
                                                    <option value="Diesel">Diesel</option>
                                                    <option value="Electric">Electric</option>
                                            </select>
                                        </div>
                                         <div class="mb-3">
                                            <label  class="form-label h5">Color</label>
                                            <input type="text" id="listColor" value={color} class="form-control" onChange={(e) =>{
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
                                            <label  class="form-label h5">Condition Grade</label>
                                            <select class="form-select" onChange={(e) =>{
                                                setCondition(e.target.value);
                                            }}>
                                                    <option selected className="text-white bg-danger"  value={condition} >{condition} </option>
                                                    <option value="Used">Used</option>
                                                    <option value="Brand New">Brand New</option>
                                            </select>
                                        </div>
                                        <div class="mb-3">
                                            <label  class="form-label h5">Auction Price</label>
                                            <input type="number" class="form-control" value={auctionPrice}  onChange={(e) =>{
                                                setPrice(e.target.value);
                                            }}/>
                                        </div>
                                         
                                           <div className="text-end">
                                               <br/>
                                                <button type="button" class="btn btn-success d-letter-spacing " style={{fontSize:"15px"}} onClick={vehicleUpdate} >Update Vehicle</button>&nbsp;&nbsp;&nbsp;
                                                <button type="button" class="btn btn-primary d-letter-spacing " style={{fontSize:"15px"}} onClick={generatePDF} > Download {model} Details</button>
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


export default ImportVehicleEdit;