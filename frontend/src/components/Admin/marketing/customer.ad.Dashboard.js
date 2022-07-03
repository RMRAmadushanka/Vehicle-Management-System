
import React, { useState , useEffect } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn} from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import {reactLocalStorage} from 'reactjs-localstorage';
import Navbar from "../adminNav";
import html2canvas from 'html2canvas';

function MarketingDashboard() {
    const [SearchStatus,setSearchStatus] = useState("no");

    const [Advertisements,setallAdvertisements] = useState([]);
    if(SearchStatus === "Accept")
    {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          useEffect(() => {
            axios.get(global.APIUrl+"/advertisement/allAdvertisementsUserPublished")
            .then(res => setallAdvertisements(res.data))
            .catch(error => console.log(error));
         })
    }else if(SearchStatus === "Reject")
    {
         // eslint-disable-next-line react-hooks/rules-of-hooks
         useEffect(() => {
            axios.get(global.APIUrl+"/advertisement/allAdvertisementsUserReject")
            .then(res => setallAdvertisements(res.data))
            .catch(error => console.log(error));
       })
    }else if(SearchStatus === "Pending")
    {
         // eslint-disable-next-line react-hooks/rules-of-hooks
         useEffect(() => {
            axios.get(global.APIUrl+"/advertisement/allAdvertisementsUser")
            .then(res => setallAdvertisements(res.data))
            .catch(error => console.log(error));
        })
    }else{
 
         // eslint-disable-next-line react-hooks/rules-of-hooks
         useEffect(() => {
            axios.get(global.APIUrl+"/advertisement/allAdvertisementsUser")
            .then(res => setallAdvertisements(res.data))
            .catch(error => console.log(error));
        })
    }
    

      function Reject(adID){
         const status = "Reject";
            const statusUpdate ={status}
            axios.put(global.APIUrl+"/advertisement/rejectAdvertisment/"+adID,statusUpdate).then(() =>{

            Swal.fire({  
                title: "Success!",
                text: "Status Updated!",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"}).then(okay => {
                if (okay) {
                    window.location.href = "/CustomerAdDashboard";
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

    function Accept( adID)
    { 
            const status = "Published";
            const statusUpdate ={status}
            axios.put(global.APIUrl+"/advertisement/rejectAdvertisment/"+adID,statusUpdate).then(() =>{

            Swal.fire({  
                title: "Success!",
                text: "Status Updated!",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"}).then(okay => {
                if (okay) {
                    window.location.href = "/CustomerAdDashboard";
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

    function btnReject()
    {
        setSearchStatus("Reject");
    }

    function btnAccept()
    {
         setSearchStatus("Accept");
        
    }

     function btnPending()
    {
         setSearchStatus("Pending");
        
    }

   
    return (
    <div class="dashboard-main-wrapper" >
        <Navbar/>
        <div class="dashboard-wrapper">
            <div  style={{paddingTop:'3%',paddingLeft:'2%', width:'98%'}}>
                <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{color:'black'}}><i class="fas fa-home"></i>Admin Dashboard</h4>
                <hr/>
                 <div id="tableId" className="container-fluid bg-white" style={{paddingLeft:'5%', paddingTop:'2%' ,paddingBottom:'2%', paddingRight:'5%'}} >
                     <center>
                          <h1 className="text-uppercase text-black">Customer's Advertisement</h1>
                     </center>
                     <div className="text-end mt-5">
                   
                            <MDBBtn className='btn-med' style={{ fontSize:'13px', fontWeight:'light'}} outline color='dark' onClick={btnPending}>
                                Pending 
                            </MDBBtn>{' '}&nbsp;&nbsp;

                            <MDBBtn className='btn-med' style={{ fontSize:'13px', fontWeight:'light'}} outline color='dark' onClick={btnReject}>
                                Reject 
                            </MDBBtn>{' '}&nbsp;&nbsp;

                            <MDBBtn className='btn-med' style={{ fontSize:'13px', fontWeight:'light'}} outline color='dark' onClick={btnAccept}>
                                Accept 
                            </MDBBtn>{' '}&nbsp;&nbsp;

                        <a href="MarketingDashboard">
                            <MDBBtn className='btn-med' style={{ fontSize:'13px', fontWeight:'light'}}  color='dark'>
                                Back
                            </MDBBtn>{' '}&nbsp;&nbsp;
                        </a>
                           
                     </div>
                     <MDBTable className="mt-5" hover > 
                        <MDBTableHead className="bg-primary">
                            <tr>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px',fontSize:"19px"}}>Advertisement ID</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px',fontSize:"19px"}}>Name</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px',fontSize:"19px"}}>Contact Number</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px',fontSize:"19px"}}>Title</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px',fontSize:"19px"}}>Actions</h6></th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                          {Advertisements.map((Advertisement,key) => (
                            <tr className="bg-light">
                                <td style={{fontSize:'18px'}}>{Advertisement.adID}</td>
                                <td style={{fontSize:'18px'}}>{Advertisement.name}</td>
                                <td style={{fontSize:'18px'}}>{Advertisement.contactNo}</td>
                                <td style={{fontSize:'18px'}}>{Advertisement.title}</td>
                                <td>
                                    <MDBBtn size='lg' className="shadow-0" color='danger' onClick={() => Reject(Advertisement.adID)}>Reject</MDBBtn>{''}&nbsp;&nbsp;
                                    <MDBBtn size='lg' className="shadow-0" color='primary'  onClick={() => Accept(
                                        Advertisement.adID,
                                       )}  >Accept</MDBBtn>
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


export default MarketingDashboard;