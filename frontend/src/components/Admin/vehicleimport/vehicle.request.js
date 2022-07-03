import React, { useState , useEffect } from 'react';
import {  MDBBtn} from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from "../adminNav";


function VehicleRequest() {
      const [AllCategories,setAllCategory] = useState([]);
      const [AllSubCategory,setAllSubCategory] = useState([]);
      useEffect(() => {
          axios.get(global.APIUrl+"/vehicle_category/allVehicleCategory")
          .then(res => setAllCategory(res.data))
          .catch(error => console.log(error));
        });
        
        useEffect(() => {
            axios.get(global.APIUrl+"/vehicle_subcategory/allVehicleSubCategory")
            .then(res => setAllSubCategory(res.data))
            .catch(error => console.log(error));
        });
        
      const [Vehicles,setallVehicles] = useState([]);
      useEffect(() => {
            axios.get(global.APIUrl+"/vehicle_add/allVehicleRequest")
            .then(res => setallVehicles(res.data))
            .catch(error => console.log(error));
         });

    
    function AvailableactionStatus(id)
    { 
        const status = "Available";
        const statusUpdate ={status}
        axios.put(global.APIUrl+"/vehicle_add/vehicleAvailability/"+id, statusUpdate ).then(() =>{
            Swal.fire({  
                title: "Success!",
                text: "Vehicle  "+status,
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"})

        }).catch((err)=>{
            Swal.fire({  
                title: "Error!",
                text: "Error In System",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"})
        })
    }
       
     function UnavailableactionStatus(id)
    { 
        const status = "Unavailable";
        const statusUpdate ={status}
        axios.put(global.APIUrl+"/vehicle_add/vehicleAvailability/"+id, statusUpdate ).then(() =>{
            Swal.fire({  
                title: "Success!",
                text: "Vehicle  "+status,
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"})

        }).catch((err)=>{
            Swal.fire({  
                title: "Error!",
                text: "Error In System",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"})
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
                         <h1 className="text-uppercase">Vehicle Request</h1>
                     </center>
                      <div className="text-end mt-4">
                         <a href="ImportDashboard">
                            <MDBBtn className='btn-sm' style={{ fontSize:'15px', fontWeight:'100',letterSpacing:'2px' }} color='dark'>
                                Back
                            </MDBBtn>
                        </a>
                     </div>
                        <div className="text-end mt-5">
                     
                      
                        <div class="row">
                        {Vehicles.map((Vehicle,key) => (
                        <div class="col-sm-4">
                            <div class="card">
                            <div class="card-body text-left">
                                <h5 class="card-title text-dark h2">We Want {Vehicle.brand}</h5>
                                <div className="ms-2 mb-4" style={{fontSize:"13px"}}>
                                  <h6 class="card-text text-muted" style={{fontSize:"17px"}}>Action Date : {Vehicle.auctionDate}</h6>
                                  <h6 class="card-text text-muted" style={{fontSize:"17px"}}>Vehicle Type : {Vehicle.vehicleType}</h6>
                                  <h6 class="card-text text-muted" style={{fontSize:"17px"}}>Vehicle Model : {Vehicle.model}</h6>
                                  <h6 class="card-text text-muted" style={{fontSize:"17px"}}>Vehicle Condition : {Vehicle.condition}</h6>
                                  <h6 class="card-text text-muted" style={{fontSize:"17px"}}>Color : {Vehicle.color}</h6>
                                  <h6 class="card-text text-muted" style={{fontSize:"17px"}}>Showroom : {Vehicle.Showroom}</h6>
                                  <h5 class="card-text text-muted" style={{fontSize:"17px"}}>Branch number : {Vehicle.BranchContact}</h5>
                                  <hr/>
                                  <h6 class="card-text text-success" style={{fontSize:"18px"}}>Status : {Vehicle.status}</h6>
                                </div>
                                <div className="text-end">
                                      <button type="button" class="btn btn-success d-letter-spacing shadow-0 " style={{fontSize:"15px"}} onClick={() => AvailableactionStatus(Vehicle._id)}  >Available</button>&nbsp;
                                      <button type="button" class="btn btn-danger d-letter-spacing  shadow-0" style={{fontSize:"15px"}}  onClick={() => UnavailableactionStatus(Vehicle._id)}  >Unavailable</button>&nbsp;&nbsp;
                                </div>
                            </div>
                            </div>
                        </div>
                        ))}
                        </div>
                     </div>
                 </div>
            </div>
        </div>
      </div>
      )
};


export default VehicleRequest;