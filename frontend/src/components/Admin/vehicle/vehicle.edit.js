import React, { useState, useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import { reactLocalStorage } from 'reactjs-localstorage';
import Navbar from "../adminNav";
import jsPDF from 'jspdf';

function VehicleEdit() {
    var VehicleEdit = reactLocalStorage.getObject('VehicleEdit');
    const id = VehicleEdit[0];

    const [auctionDate, setauctionDate] = useState(VehicleEdit[1]);
    const [vehicleType, setvehicleType] = useState(VehicleEdit[2]);
    const [color, setColors] = useState(VehicleEdit[5]);
    const [brand, setbrand] = useState(VehicleEdit[3]);
    const [model, setmodel] = useState(VehicleEdit[4]);
    const [condition, setCondition] = useState(VehicleEdit[6]);
    const [AllCategories, setAllCategory] = useState([]);
    
    useEffect(() => {
        axios.get(global.APIUrl + "/vehicle_category/allVehicleCategory")
            .then(res => setAllCategory(res.data))
            .catch(error => console.log(error));
    });


//request update function
    function vehicleUpdate(e) {
        e.preventDefault();
        const editVehicle = { auctionDate, vehicleType, brand, model, color, condition }

        axios.put(global.APIUrl + "/vehicle_add/vehicleUpdate/" + id, editVehicle).then(() => {
            Swal.fire({
                title: "Success!",
                text: "Vehicle Updated",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"
            }).then(okay => {
                if (okay) {
                    window.location.href = "/VehicleAdd";
                }
            });

        }).catch((err) => {
            Swal.fire({
                title: "Error!",
                text: "Vehicle Not Updated",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
        })
    }

//pdf generate function
    function generatePDF(){
        var doc = new jsPDF();
        
       
        
        doc.setTextColor(254, 8, 8 );
        doc.setFontSize(30);
        doc.setFont('bold')
        
        doc.text(50,40,'Vehicle Request Details')
        
        doc.addFont('helvetica', 'normal')
        doc.setFontSize(20);
        doc.setTextColor(3, 3, 3);
       
        doc.text(25, 70, 'Vehicle Type : '+vehicleType)
        doc.text(25, 90, 'Brand : '+brand)      
        doc.text(25, 110, 'Color : '+color)      
        doc.text(25, 130, 'Condition  : '+condition)      
        doc.text(25, 150, 'Model  : '+model)      
        doc.text(25, 170, 'Action Date : '+auctionDate)      
        doc.save('We Want '+ vehicleType+'.pdf')
    }  



    return (
        <div class="dashboard-main-wrapper" >
            <Navbar />
            <div class="dashboard-wrapper">
                <div style={{ paddingTop: '3%', paddingLeft: '2%', width: '98%' }}>
                    <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{ color: 'black' }}><i class="fas fa-home"></i>Admin Dashboard</h4>
                    <hr />
                    <div className="container-fluid bg-white" style={{ paddingLeft: '5%', paddingTop: '2%', paddingBottom: '2%', paddingRight: '5%' }} >
                        <center>
                            <h1 className="text-uppercase">Vehicle Request Update </h1>
                        </center>
                        <div className="text-end mt-5">
                            <a href="VehicleAdd">
                                <MDBBtn className='btn-sm' style={{ fontSize: '15px', fontWeight: '100', letterSpacing: '2px' }} color='dark'>
                                    Back
                                </MDBBtn>
                            </a>
                        </div>
                        <MDBRow>
                            <MDBCol sm='5'>
                                <MDBCard className='shadow-0'>
                                    <MDBCardBody >
                                        <div class="mb-3">
                                            <label class="form-label h3" style={{fontWeight:"bold"}}>Action Date</label>

                                            <input type="date" class="form-control" style={{fontSize:"17px"}} value={auctionDate} onChange={(e) => {
                                                setauctionDate(e.target.value);
                                            }} />
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label h3" style={{fontWeight:"bold"}}>Vehicle Type</label>
                                            <select class="form-select" style={{fontSize:"17px"}} aria-label="Default select example" onChange={(e) => {
                                                setvehicleType(e.target.value);
                                            }}>
                                                <option selected>Select Vehicle Type</option>
                                                <option value={vehicleType} className="bg-danger text-white">{vehicleType}</option>
                                                {AllCategories.map((AllCategory, key) => (
                                                    <option value={AllCategory.name}>{AllCategory.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label h3" style={{fontWeight:"bold"}}>Color</label>
                                            <select class="form-select" style={{fontSize:"17px"}} aria-label="Default select example" onChange={(e) => {
                                                setColors(e.target.value);
                                            }}>
                                                <option selected>Select Color</option>
                                                <option value={color} className="bg-danger text-white">{color}</option>
                                                <option value="Red">Red</option>
                                                <option value="Black">Black</option>
                                                <option value="Gray">Gray</option>
                                            </select>
                                        </div>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                            <MDBCol sm='1'></MDBCol>
                            <MDBCol sm='6'>
                                <MDBCard className='shadow-0'>
                                    <MDBCardBody>
                                        <div class="mb-3">
                                            <label class="form-label h3" style={{fontWeight:"bold"}}>Brand</label>
                                            <select class="form-select" style={{fontSize:"17px"}} aria-label="Default select example" onChange={(e) => {
                                                setbrand(e.target.value);
                                            }}>
                                                <option selected>Select Brand</option>
                                                <option value={brand} className="bg-danger text-white">{brand}</option>
                                                <option >Toyota</option>
                                                <option >Nissan</option>
                                                <option >BMW</option>
                                                <option >Benz</option>
                                                <option >Tesla</option>

                                            </select>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label h3" style={{fontWeight:"bold"}}>Condition Grade</label>
                                            <select class="form-select" style={{fontSize:"17px"}} onChange={(e) => {
                                                setCondition(e.target.value);
                                            }}>
                                                <option selected>Select Condition Grade</option>
                                                <option value={condition} className="bg-danger text-white">{condition}</option>
                                                <option value="Used">Used</option>
                                                <option value="Brand New">Brand New</option>
                                            </select>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label h3" style={{fontWeight:"bold"}}>Model</label>
                                            <input type="text" class="form-control" style={{fontSize:"17px"}} value={model} onChange={(e) => {
                                                setmodel(e.target.value);
                                            }} />
                                        </div>
                                        <div className="text-end">
                                            <button type="button" class="btn btn-success d-letter-spacing " style={{fontSize:"14px"}} onClick={vehicleUpdate} >Update</button>&nbsp;&nbsp;&nbsp;
                                            <button type="button" class="btn btn-primary d-letter-spacing " style={{fontSize:"14px"}} onClick={generatePDF} >Print</button>
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


export default VehicleEdit;