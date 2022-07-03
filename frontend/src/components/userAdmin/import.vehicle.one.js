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

function ImportVehicle() {

    var ImportVehicleOne = reactLocalStorage.getObject('ImportVehicleOne');
    const id = ImportVehicleOne[0];
    const auctionDate =  useState(ImportVehicleOne[1]);
    const vehicleType =  useState(ImportVehicleOne[2]);
    const brand =  useState(ImportVehicleOne[3]);
    const model =  useState(ImportVehicleOne[4]);
    const milage =  useState(ImportVehicleOne[5]);
    const m_year =  useState(ImportVehicleOne[6]);
    const engine_cc =  useState(ImportVehicleOne[7]);
    const transmission =  useState(ImportVehicleOne[8]);
    const fuel =  useState(ImportVehicleOne[9]);
    const color =  useState(ImportVehicleOne[10]);
    const auctionPrice =  useState(ImportVehicleOne[11]);
    const image =  useState(ImportVehicleOne[12]);
    const condition =  useState(ImportVehicleOne[13]);

    const [ServiceCenters,setServiceCenter] = useState([]);
    useEffect(() => {
          axios.get(global.APIUrl+"/vehicle_import/homePageOneVehicleView/"+id)
          .then(res => setServiceCenter(res.data))
          .catch(error => console.log(error));
         
    });

  

     function order()
     {
            const serviceType1= "Order";
            const amount =  parseInt(auctionPrice)*0.05;
            window.location.href = "/Payment?id="+serviceType1+"&Amount="+amount+"&paymentTitle=Vehicle Order";
     }
    
    return (
    <div>
        <div className="pt-1 pb-1" style={{backgroundColor:'#F4F4F4'}}>
            <center>
                <small style={{fontSize:'14px', letterSpacing:'2px'}} className="text-muted text-capitalize">The Largest Autobile Service Hub In The Sri Lanka</small>
            </center>
        </div>
        <Navbar/>
        <center>
             
                <div class="row container-fluid" style={{marginBottom:'20%', marginTop:'5%'}}>
                <div class="col-sm-6">
                    <div class="card shadow-0">
                    <div class="card-body">
                        
                    <MDBCardImage style={{marginTop:'5%', width:'80%'}} src={"https://res.cloudinary.com/dnomnqmne/image/upload/v1630743483/"+ServiceCenters.image}   />
                       
                    </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="card  shadow-0">
                    <div class="card-body text-left">
                        <h2 class="card-title text-dark text-capitalize"><br/></h2>
                        <div className="ml-3 mt-2">
                            <h1 className="text-danrk text-capitalize" style={{lineHeight:'60%'}}>{brand} - {model}</h1>
                            <h4 className="text-muted">Rs.{auctionPrice}.00</h4>
                            <br/>
                            <p>
                                <table style={{width:'75%'}} >
                                    <tr>
                                        <td className="fw-bold h6"><MDBIcon fas icon="angle-right" /> Brand :</td>
                                        <td>{brand}</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold h6"><MDBIcon fas icon="angle-right" /> Action Date :</td>
                                        <td>{auctionDate}</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold h6"><MDBIcon fas icon="angle-right" /> Model :</td>
                                        <td>{model}</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold h6"><MDBIcon fas icon="angle-right" /> Milage :</td>
                                        <td>{milage}</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold h6"> <MDBIcon fas icon="angle-right" /> Menufacturering Year :</td>
                                        <td>{m_year}</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold h6"><MDBIcon fas icon="angle-right" /> Engine CC :</td>
                                        <td>{engine_cc}</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold h6"><MDBIcon fas icon="angle-right" /> Transmission :</td>
                                        <td>{transmission}</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold h6"><MDBIcon fas icon="angle-right" /> Fuel :</td>
                                        <td>{fuel}</td>
                                    </tr>
                                      <tr>
                                        <td className="fw-bold h6"><MDBIcon fas icon="angle-right" /> Color :</td>
                                        <td>{color}</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold h6"><MDBIcon fas icon="angle-right" /> Condition :</td>
                                        <td>{condition}</td>
                                    </tr>
                                    <tr className="mt-5">
                                        <td className="fw-bold h6"></td>
                                        <td><br/>
                                            <MDBBtn className='mx-2 btn-sm shadow-0 d-letter-spacing' color='dark' onClick={order}>
                                                 Reserve
                                            </MDBBtn>
                                            <a href="/">
                                                <MDBBtn className='btn-sm' style={{ fontSize:'13px', fontWeight:'light'}} outline color='dark'>
                                                Back
                                                </MDBBtn>{' '}&nbsp;&nbsp;
                                            </a>
                                        </td>
                                    </tr>
                                        
                                  
                                </table>
                            </p>
                            
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

export default ImportVehicle;