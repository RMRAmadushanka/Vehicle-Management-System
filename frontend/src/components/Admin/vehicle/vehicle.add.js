import React, { useState, useEffect } from 'react';
import {  MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import { reactLocalStorage } from 'reactjs-localstorage';
import Navbar from "../adminNav";
import NumberFormat from 'react-number-format';


function VehicleAdd() {
    const [auctionDate, setauctionDate] = useState("");
    const [vehicleType, setvehicleType] = useState("");
    const [color, setColors] = useState("");
    const [brand, setbrand] = useState("");
    const [model, setmodel] = useState("");
    const [condition, setCondition] = useState("");
    const [Showroom, setShowroom] = useState("");
    const [BranchContact, setBranchContact] = useState("");


    const [AllCategories, setAllCategory] = useState([]);
   
    useEffect(() => {
        axios.get(global.APIUrl + "/vehicle_category/allVehicleCategory")
            .then(res => setAllCategory(res.data))
            .catch(error => console.log(error));
    });




    const [Vehicles, setallVehicles] = useState([]);
    useEffect(() => {
        axios.get(global.APIUrl + "/vehicle_add/allVehicle")
            .then(res => setallVehicles(res.data))
            .catch(error => console.log(error));
    });


//vehicle request add fuction
    function addVehicle(e) {
        e.preventDefault();

        const addVehicle = { auctionDate, vehicleType, brand, model, color, condition, Showroom, BranchContact }

        axios.post(global.APIUrl + "/vehicle_add/addVehicles", addVehicle).then(() => {

            Swal.fire({
                title: "Success!",
                text: "Vehicle Request Added Successfully!",
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
                text: "Please fill all the field!",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
        })

    }


//vehicle request remove function
    function remove(id) {
        axios.delete(global.APIUrl + "/vehicle_add/deleteVehicle/" + id).then(() => {
            Swal.fire({
                title: "Success!",
                text: "Vehicle  Delete",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"
            })

        }).catch((err) => {
            Swal.fire({
                title: "Error!",
                text: "Vehicle  Not Delete",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
        })
    }

    function Update(_id, AuctionDate, vehicleType, brand, model, color, condition) {
        reactLocalStorage.setObject("VehicleEdit", [_id, AuctionDate, vehicleType, brand, model, color, condition]);
        window.location.href = "/VehicleEdit";
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
                            <h1 className="text-uppercase">Request Vehicles </h1>
                        </center>

                        <div className="text-end mt-5">

                            <MDBBtn className='btn-sm' style={{ fontSize: '14px', fontWeight: 'light', letterSpacing: '2px' }} outline color='dark' data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                Vehicle Request
                            </MDBBtn>{' '}
                            <a href="VehicleDashboard">
                                <MDBBtn className='btn-sm' style={{ fontSize: '14px', fontWeight: 'light', letterSpacing: '2px' }} color='dark'>
                                    Back
                                </MDBBtn>
                            </a>&nbsp;&nbsp;&nbsp;
                           
                        <div class="alert alert-dark mt-3 mb-3 text-left" role="alert">
                            <h5 className="text-uppercase" style={{letterSpacing:'2px'}}>Vehicle Requests history : {Vehicles.length}</h5>
                        </div>

                            <div class="row">
                                {Vehicles.map((Vehicle, key) => (
                                    <div class="col-sm-4">
                                        <div class="card">
                                            <div class="card-body text-left">
                                                <br/>
                                                <h5 class="card-title text-dark h3">We Want {Vehicle.brand}</h5>
                                                <hr/>
                                                <div className="ms-2 mb-4">
                                                    <h6 class="card-text text-muted" style={{fontSize:"17px"}}>Action Date : {Vehicle.auctionDate}</h6>
                                                    <h6 class="card-text text-muted" style={{fontSize:"17px"}}>Vehicle Type : {Vehicle.vehicleType}</h6>
                                                    <h6 class="card-text text-muted" style={{fontSize:"17px"}}>Vehicle Model : {Vehicle.model}</h6>
                                                    <h6 class="card-text text-muted" style={{fontSize:"17px"}}>Vehicle Condition : {Vehicle.condition}</h6>
                                                    <h6 class="card-text text-muted" style={{fontSize:"17px"}}>Color : {Vehicle.color}</h6>
                                                    <hr />
                                                    <h6 class="card-text text-success" style={{fontSize:"16px"}}>Status : {Vehicle.status}</h6>
                                                </div>
                                                <div className="text-end">
                                                    <button type="button" class="btn btn-outline-dark d-letter-spacing " style={{fontSize:"13px"}} onClick={() => Update(Vehicle._id, Vehicle.auctionDate, Vehicle.vehicleType, Vehicle.brand, Vehicle.model, Vehicle.color, Vehicle.condition)}  >Update</button>&nbsp;&nbsp;&nbsp;
                                                    <button type="button" class="btn btn-danger d-letter-spacing " style={{fontSize:"13px"}} onClick={() => remove(Vehicle._id)} >Delete</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div class="modal fade bg-light" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered  modal-xl">
                                    <div class="modal-content">
                                        <div class="modal-header bg-dark">
                                            <h3 class="modal-title text-white d-letter-spacing" id="staticBackdropLabel">Add New Vehicle Request</h3>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                                        </div>
                                        <div class="modal-body  p-4">
                                            <div class="row">
                                                <div class="col-sm-6">
                                                    <div class="card shadow-0">
                                                        <div class="card-body text-start">

                                                            <div class="mb-3">
                                                                <label class="form-label h5" style={{fontSize:"20px"}}>Auction Date</label>
                                                                <input type="date" class="form-control" style={{fontSize:"17px"}} onChange={(e) => {
                                                                    setauctionDate(e.target.value);
                                                                }} />
                                                            </div>

                                                            <div class="mb-3">
                                                                <label class="form-label h5" style={{fontSize:"20px"}}>Vehicle Type</label>
                                                                <select class="form-select" aria-label="Default select example" style={{fontSize:"17px"}} onChange={(e) => {
                                                                    setvehicleType(e.target.value);
                                                                }}>
                                                                    <option selected>Select Vehicle Type</option>
                                                                    {AllCategories.map((AllCategory, key) => (
                                                                        <option value={AllCategory.name}>{AllCategory.name}</option>
                                                                    ))}
                                                                </select>
                                                            </div>

                                                            <div class="mb-3">
                                                                <label class="form-label h5" style={{fontSize:"20px"}}>Color</label>
                                                                <select class="form-select" aria-label="Default select example" style={{fontSize:"17px"}} onChange={(e) => {
                                                                    setColors(e.target.value);
                                                                }}>
                                                                    <option selected>Select Color</option>
                                                                    <option value="Red">Red</option>
                                                                    <option value="Black">Black</option>
                                                                    <option value="Gray">Gray</option>
                                                                </select>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <div class="card shadow-0">
                                                        <div class="card-body text-start">
                                                            <div class="mb-3">
                                                                <label class="form-label h5" style={{fontSize:"20px"}}>Brand</label>
                                                                <select class="form-select" aria-label="Default select example" style={{fontSize:"17px"}} onChange={(e) => {
                                                                    setbrand(e.target.value);
                                                                }}>
                                                                    <option selected>Select Brand</option>
                                                                    <option >Toyota</option>
                                                                    <option >Nissan</option>
                                                                    <option >BMW</option>
                                                                    <option >Benz</option>
                                                                    <option >Tesla</option>

                                                                </select>
                                                            </div>

                                                            <div class="mb-3">
                                                                <label class="form-label h5" style={{fontSize:"20px"}}>Condition Grade</label>
                                                                <select class="form-select" style={{fontSize:"17px"}} onChange={(e) => {
                                                                    setCondition(e.target.value);
                                                                }}>
                                                                    <option selected>Select Condition Grade</option>
                                                                    <option value="Used">Used</option>
                                                                    <option value="Brand New">Brand New</option>
                                                                </select>
                                                            </div>

                                                            <div class="mb-3">
                                                                <label class="form-label h5" style={{fontSize:"20px"}}>Model</label>
                                                                <input type="text" class="form-control" placeholder="Enter Model Name" style={{fontSize:"17px"}} onChange={(e) => {
                                                                    setmodel(e.target.value);
                                                                }} />
                                                            </div>

                                                            <div class="mb-3">
                                                                <label class="form-label h5" style={{fontSize:"20px"}}>Showroom</label>
                                                                <select class="form-select" style={{fontSize:"17px"}} onChange={(e) => {
                                                                    setShowroom(e.target.value);
                                                                }}>
                                                                    <option selected>Select Showroom</option>
                                                                    <option value="colombo">Colombo</option>
                                                                    <option value="Gampaha">Gampaha</option>
                                                                </select>
                                                            </div>
                                                            <div class="mb-3">
                                                                <label class="form-label h5" style={{fontSize:"20px"}}>Branch contact number</label>
                                                                <NumberFormat format="0## ### #### " style={{fontSize:"17px"}} class="form-control" placeholder="0## ### ## ##"  onChange={(e) =>{
                                                            setBranchContact(e.target.value);
                                            }}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer border-0">
                                            <button type="button" class="btn btn-outline-dark" style={{fontSize:"15px"}} data-bs-dismiss="modal">Close</button>
                                            <button type="button" class="btn btn-dark" style={{fontSize:"15px"}} onClick={addVehicle}>Save</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};


export default VehicleAdd;