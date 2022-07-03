
import React, { useState , useEffect } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBIcon, MDBInput} from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import {reactLocalStorage} from 'reactjs-localstorage';
import Navbar from "../adminNav";

function PaymentDashboard() {
    
    const [searchName,setsearchName] = useState("")
    const [allVehiclePayment,setallVehiclePayment] = useState([]);

     if(searchName === '' || searchName=== null){
         // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
        axios.get(global.APIUrl+"/payment/allOrderVehiclePayment")
        .then(res => setallVehiclePayment(res.data))
        .catch(error => console.log(error));
        })
     }else{
      
         // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
        axios.get(global.APIUrl+"/payment/allOrderVehiclePayment/"+searchName)
        .then(res => setallVehiclePayment(res.data))
        .catch(error => console.log(error));
        })
     }
   

    const [allOrderADVERTISEMENT,setallOrderADVERTISEMENT] = useState([]);
    useEffect(() => {
       axios.get(global.APIUrl+"/payment/allOrderADVERTISEMENT")
       .then(res => setallOrderADVERTISEMENT(res.data))
       .catch(error => console.log(error));
      })

    const [allOrderBooking,setallOrderBooking] = useState([]);
    useEffect(() => {
       axios.get(global.APIUrl+"/payment/allOrderBooking")
       .then(res => setallOrderBooking(res.data))
       .catch(error => console.log(error));
      })
   

      function Accept(id){
            const status = "Accept";
            const statusUpdate ={status}
            axios.put(global.APIUrl+"/payment/statusPaymentUpdate/"+id,statusUpdate).then(() =>{

            Swal.fire({  
                title: "Success!",
                text: "Status Updated!",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"}).then(okay => {
                if (okay) {
                    window.location.href = "/PaymentDashboard";
                }
            }); 
        }).catch((err)=>{

            Swal.fire({  
            title: "Error!",
            text: "Status Not Updated!",
            icon: 'error',
            confirmButtonText: "OK",
            type: "success"})
        })
    }

    function Reject( id)
    { 
            const status = "Reject";
            const statusUpdate ={status}
            axios.put(global.APIUrl+"/payment/statusPaymentUpdate/"+id,statusUpdate).then(() =>{

            Swal.fire({  
                title: "Success!",
                text: "Status Updated!",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"}).then(okay => {
                if (okay) {
                    window.location.href = "/PaymentDashboard";
                }
            }); 
        }).catch((err)=>{

            Swal.fire({  
            title: "Error!",
            text: "Status Not Updated!",
            icon: 'error',
            confirmButtonText: "OK",
            type: "success"})
        })
    }

    function View(_id,accountHold,cardNumber,expireDate,ccv,paymentMethod,reason,Amount,userName,paymentTitle,status){
        reactLocalStorage.setObject("viewPayment", [_id,accountHold,cardNumber,expireDate,ccv,paymentMethod,reason,Amount,userName,paymentTitle,status]);
        window.location.href = "/PaymentView";
    }

    function DeletePay(id){
          axios.delete(global.APIUrl+"/payment/deletePayment/"+id).then(() =>{
            Swal.fire({  
                title: "Success!",
                text: "Payment  Delete",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"})

        }).catch((err)=>{
            Swal.fire({  
                title: "Error!",
                text: "Payment  Not Delete",
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
                          <h2 className="text-uppercase text-black">Sl car sale Payment MANAGEMENT</h2>
                     </center>
                     <div className="text-end mt-5">
                      
                         
                         
                         

                         
                       
                     </div>
                     <div className=" pt-1 mt-5">
                        <h6>Search Using Payment Amount</h6>
                        <MDBInput  className="mt-3 bg-white" id='form1' type='text'  onChange={(e) =>{
                            setsearchName(e.target.value);
                            }}/>
                     </div>
                     <h5 className='mt-5' id="Sale">Vehicle Sale History</h5>
                     <MDBTable hover>
                        <MDBTableHead className="bg-dark">
                            <tr>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Payment Id</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Amount</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Date</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Description</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Sale Status</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Action</h6></th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                          {allVehiclePayment.map((VehiclePayment,key) => (
                            <tr className="bg-light">
                                <td style={{fontSize:'18px'}}>{VehiclePayment._id}</td>
                                <td style={{fontSize:'18px'}}>RS.{VehiclePayment.Amount}</td>
                                <td style={{fontSize:'18px'}}>{VehiclePayment.createdAt}</td>
                                <td style={{fontSize:'18px'}}>{VehiclePayment.reason}</td>
                                <td style={{fontSize:'18px'}}>{VehiclePayment.status}</td>
                                <td>
                                    <MDBBtn size='sm' className="shadow-0" color='danger' onClick={() => Reject(VehiclePayment._id)}><MDBIcon fas icon="times-circle" /></MDBBtn>{''}&nbsp;&nbsp;
                                    <MDBBtn size='sm' className="shadow-0" color='success'  onClick={() => Accept(VehiclePayment._id)}  ><MDBIcon fas icon="edit" /></MDBBtn>{''}&nbsp;&nbsp;
                                    <MDBBtn size='sm' className="shadow-0" color='dark'  onClick={() => View(
                                        VehiclePayment._id,
                                        VehiclePayment.accountHold,
                                        VehiclePayment.cardNumber,
                                        VehiclePayment.expireDate,
                                        VehiclePayment.ccv,
                                        VehiclePayment.paymentMethod,
                                        VehiclePayment.reason,
                                        VehiclePayment.Amount,
                                        VehiclePayment.userName,
                                        VehiclePayment.paymentTitle,
                                        VehiclePayment.status
                                        )}  ><MDBIcon fas icon="eye" /></MDBBtn>{''}&nbsp;&nbsp;
                                    <MDBBtn size='sm' className="shadow-0" color='danger' outline onClick={() => DeletePay(VehiclePayment._id)}><MDBIcon fas icon="trash" /></MDBBtn>{''}&nbsp;&nbsp;
                                </td>
                            </tr>
                            ))}
                        </MDBTableBody>
                        </MDBTable>
                        
                 </div>
            </div>
        </div>
      </div>
      )
};


export default PaymentDashboard;