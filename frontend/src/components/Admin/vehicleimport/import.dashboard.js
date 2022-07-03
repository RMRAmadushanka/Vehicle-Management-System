
import React, { useState , useEffect } from 'react';
import { MDBCard, MDBCardHeader, MDBCardBody, MDBIcon, MDBCardTitle,MDBCardText,MDBInput, MDBBtn, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import {reactLocalStorage} from 'reactjs-localstorage';
import Navbar from "../adminNav";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function ImportDashboard() {
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

    const [Cars,setallCars] = useState([]);
    useEffect(() => {
          axios.get(global.APIUrl+"/vehicle_import/allCars")
          .then(res => setallCars(res.data))
          .catch(error => console.log(error));
        });

    const [Vans,setallVans] = useState([]);
    useEffect(() => {
          axios.get(global.APIUrl+"/vehicle_import/allVan")
          .then(res => setallVans(res.data))
          .catch(error => console.log(error));
        });

    const [Bikes,setallBikes] = useState([]);
    useEffect(() => {
          axios.get(global.APIUrl+"/vehicle_import/allBike")
          .then(res => setallBikes(res.data))
          .catch(error => console.log(error));
        });

   const [HeavyVehicles,setallHeavyVehicles] = useState([]);
    useEffect(() => {
          axios.get(global.APIUrl+"/vehicle_import/allHeavyVehicle")
          .then(res => setallHeavyVehicles(res.data))
          .catch(error => console.log(error));
        });

  

  

    function remove(id)
    { 
        axios.delete(global.APIUrl+"/vehicle_import/deleteImportVehicle/"+id).then(() =>{
            Swal.fire({  
                title: "Success!",
                text: "Vehicle  Delete",
                icon: 'success',
                confirmButtonText: "OK",
                confirmButtonColor: '#8a0a0a',
                type: "success"})

        }).catch((err)=>{
            Swal.fire({  
                title: "Error!",
                text: "Vehicle  Not Delete",
                icon: 'error',
                confirmButtonText: "OK",
                confirmButtonColor: '#8a0a0a',
                type: "success"})
        })
    }

    function update(_id,auctionDate, vehicleType, brand, model, milage, m_year, engine_cc, transmission, fuel, color, condition, auctionPrice){
         reactLocalStorage.setObject("importVehicleEdit", [_id,auctionDate, vehicleType, brand, model, milage, m_year, engine_cc, transmission, fuel, color, condition, auctionPrice]);
         window.location.href = "/ImportVehicleEdit";
    }

    function generatePdf()
    {
        var doc = new jsPDF('p', 'pt');
        doc.setTextColor(254, 8, 8 );
        doc.text(10, 20, "Import Vehicle List ")
        doc.setFontSize(10);
        doc.setTextColor(3, 3, 3);
        doc.text(45, 40, "Cars : "+Cars.length)
        doc.text(45, 60, 'Vans : '+Vans.length)
        doc.text(45, 80, 'Bikes : '+Bikes.length)
        doc.text(45, 100, 'Heavy Vehicles : '+HeavyVehicles.length)
        doc.addFont('helvetica', 'normal')
        doc.setFontSize(12);
        doc.setTextColor(3, 3, 3);
        doc.save('Import Vehicle List.pdf')
    }
    

    
     const [ImportVehicles,setAllImportVehicle] = useState([]);
     const [searchName,setsearchName] = useState("")
     if(searchName === '' || searchName=== null){
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            axios.get(global.APIUrl+"/vehicle_import/allImportVehicle")
            .then(res => setAllImportVehicle(res.data))
            .catch(error => console.log(error));
            });
     }else{
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            axios.get(global.APIUrl+"/vehicle_import/allImportVehicle/"+searchName)
            .then(res => setAllImportVehicle(res.data))
            .catch(error => console.log(error));
            });
     }

    return (
    <div class="dashboard-main-wrapper" >
        <Navbar/>
        <div class="dashboard-wrapper">
            <div  style={{paddingTop:'3%',paddingLeft:'2%', width:'98%'}}>
                <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{color:'black'}}><i class="fas fa-home"></i>Admin Dashboard</h4>
                <hr/>
                 
                  

                  <center style={{marginTop:'6%'}}>
                    <h1 className="text-uppercase text-black">SL car sale Vehicle Import Management </h1>
                    <br/>
                  </center>
                 <MDBRow className="mt-4" id="summery">
                    <MDBCol sm='3'>
                    <MDBCard className=" square border-bottom border-5 border-dark alert-danger " style={{boxShadow:'2px 3px 5px #BBBBBB'}}>
                            <MDBCardHeader className=" fw-bold mt-2 h4 pl-2  pb-4 text-left ms-3 text-uppercase" >
                                <span> 
                                    
                                    <b style={{fontSize:'180%'}}>{Cars.length}</b>
                                    <br/>&nbsp;Cars</span>
                            </MDBCardHeader>
                        </MDBCard>
  
                    </MDBCol>
                    <MDBCol sm='3'>
                 
                         <MDBCard className=" square border-bottom border-5 border-dark alert-primary " style={{boxShadow:'2px 3px 5px #BBBBBB'}}>
                            
                            <MDBCardHeader className=" fw-bold mt-2 h4 pl-2 pb-4 text-left ms-3 text-uppercase" >
                                <span>
                                    
                                    <b style={{fontSize:'180%'}}>{Vans.length}</b>
                                 
                               <br/>&nbsp;Vans</span>
                            </MDBCardHeader>
                         </MDBCard>
                
                    </MDBCol>
                    <MDBCol sm='3'>
     
                         <MDBCard className=" square border-bottom border-5 border-dark alert-success " style={{boxShadow:'2px 3px 5px #BBBBBB'}}>
                            <MDBCardHeader className=" fw-bold mt-2 h4 pl-2 pb-4 text-left ms-3 text-uppercase" >
                               <span> 
                                    <b style={{fontSize:'180%'}}>{Bikes.length}</b>
                                    <br/>&nbsp;Bikes</span>
                            </MDBCardHeader>
                        </MDBCard>
                 
                    </MDBCol>
                    <MDBCol sm='3'>
                         <MDBCard className=" square border-bottom border-5 border-dark alert-dark " style={{boxShadow:'2px 3px 5px #BBBBBB'}}>
                            <MDBCardHeader className=" fw-bold mt-2 h4 pl-2 pb-4 text-left ms-3 text-uppercase" >
                                <span> 
                                    <b style={{fontSize:'180%'}}>{HeavyVehicles.length}</b>
                                  <br/>&nbsp;Heavy Vehicles</span>
                            </MDBCardHeader>
                        </MDBCard>
                    </MDBCol>
                 </MDBRow>          
                        
                
                 <div className="text-end">
                     <a href="VehicleRequest">
                      <MDBBtn className='btn-sm' style={{ fontSize:'16px', fontWeight:'light'}} outline color='dark' >
                           Vehicle Requests
                        </MDBBtn>{' '}
                     </a>

                    <a href="ImportAdd">
                        <MDBBtn className='btn-sm' style={{ fontSize:'16px', fontWeight:'light'}} outline color='dark' >
                            Add New Import
                        </MDBBtn>{' '}
                    </a>
                    
                    <MDBBtn className='btn-sm' onClick={generatePdf} style={{ fontSize:'16px', fontWeight:'light'}} outline color='danger' >
                            Download
                        </MDBBtn>{' '}
                 </div>

                 <div className=" pt-1 mt-5">
                        <h3>Search Models Here...</h3>
                        <MDBInput  className="mt-3 bg-white" id='form1' type='text'  onChange={(e) =>{
                            setsearchName(e.target.value);
                            }}/>
                        <br/><br/>
                </div>
                   
                  <div class="row mt-3">
                      
                        {ImportVehicles.map((importVehicle,key) => (
                        <div class="col-sm-3">
                            <div class="card">
                             <img src={"https://res.cloudinary.com/dnomnqmne/image/upload/v1630743483/"+importVehicle.image} class="card-img-top" alt="..."/>
                            <div class="card-body text-left">
                                <h5 class="card-title  h4">{importVehicle.brand} - {importVehicle.model}</h5>
                                <div className="ms-2 mb-4">
                                  <h6 class="card-text text-danger">Price : RS.{importVehicle.auctionPrice}.00</h6>
                                  <h6 class="card-text text-danger">Condition : {importVehicle.condition}</h6>
                                  <h6 class="card-text text-danger">Fuel : {importVehicle.fuel}</h6>
                                </div>
                                <div className="text-end">
                                      <button type="button" class="btn btn-outline-dark d-letter-spacing " style={{fontSize:"14px"}} onClick={() => update(importVehicle._id,importVehicle.auctionDate
                                        , importVehicle.vehicleType
                                        , importVehicle.brand
                                        , importVehicle.model
                                        , importVehicle.milage
                                        , importVehicle.m_year
                                        , importVehicle.engine_cc
                                        , importVehicle.transmission
                                        , importVehicle.fuel
                                        , importVehicle.color
                                        , importVehicle.condition
                                        ,importVehicle.auctionPrice)}   >Update</button>&nbsp;&nbsp;&nbsp;
                                      <button type="button" class="btn btn-danger d-letter-spacing " style={{fontSize:"14px"}} onClick={() => remove(importVehicle._id)} >Delete</button>
                                </div>
                            </div>
                            </div>
                        </div>
                        ))}
                        </div>
            </div>
        </div>
      </div>
      )
};


export default ImportDashboard;