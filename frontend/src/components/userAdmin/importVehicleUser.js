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

function ViewAdvertisement() {
    
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const vehicle_type = urlParams.get('id');

      const [AllVehicles,setAllVehicles] = useState([]);
      useEffect(() => {
          axios.get(global.APIUrl+"/vehicle_import/homePageView/"+vehicle_type)
          .then(res => setAllVehicles(res.data))
          .catch(error => console.log(error));
        });

        function vehicleView(_id,auctionDate,vehicleType,brand,model,milage,m_year,engine_cc,transmission,fuel,color,auctionPrice,image,condition){
            reactLocalStorage.setObject("ImportVehicleOne", [_id,auctionDate,vehicleType,brand,model,milage,m_year,engine_cc,transmission,fuel,color,auctionPrice,image,condition]);
            window.location.href = "/ImportVehicleOne";
        }
    return (
    <div>
        <div className="pt-1 pb-1" style={{backgroundColor:'#F4F4F4'}}>
            <center>
                <small style={{fontSize:'14px', letterSpacing:'2px'}} className="text-muted text-capitalize">The Largest Autobile Service Hub In The Sri Lanka</small>
            </center>
        </div>
        <Navbar/>
        <h1 className="text-center" style={{marginTop:'5%'}}>{vehicle_type}</h1>
         <div className="text-end mt-5">
                <a href="/">
                    <MDBBtn className='btn-sm' style={{ fontSize:'13px', fontWeight:'light'}} outline color='dark'>
                     Back
                    </MDBBtn>{' '}&nbsp;&nbsp;
                </a>
         </div>
        <center>
         <div class="row container-fluid mt-4"  style={{ marginBottom:'26%'}}>
              {AllVehicles.map((Vehicle,key) => (
                <div class="col-sm-3" onClick={()=>vehicleView(
                    Vehicle._id,
                    Vehicle.auctionDate,
                    Vehicle.vehicleType,
                    Vehicle.brand,
                    Vehicle.model,
                    Vehicle.milage,
                    Vehicle.m_year,
                    Vehicle.engine_cc,
                    Vehicle.transmission,
                    Vehicle.fuel,
                    Vehicle.color,
                    Vehicle.auctionPrice,
                    "https://res.cloudinary.com/dnomnqmne/image/upload/v1630743483/"+Vehicle.image,
                    Vehicle.condition)}>
                    <div class="card bg-light text-left">
                        <img src={"https://res.cloudinary.com/dnomnqmne/image/upload/v1630743483/"+Vehicle.image} class="card-img-top" alt="..."/>
                       
                        <div class="card-body">
                            <h5 class="card-title text-uppercase">{Vehicle.brand} - {Vehicle.model}</h5>
                            <div className="ml-3">
                                <p className="text-muted h6">
                                    <MDBIcon fas icon="angle-double-right" /> Price : Rs.{Vehicle.auctionPrice}.00<br/>
                                    <MDBIcon fas icon="angle-double-right" /> Color : {Vehicle.color}<br/>
                                </p>
                            </div>
                        </div>
                    </div>
               </div>
              ))}
            </div>
            </center>
        <Footer/>
    </div>
    )
};

export default ViewAdvertisement;