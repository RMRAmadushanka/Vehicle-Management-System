
import React, { useState , useEffect } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBInput} from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import {reactLocalStorage} from 'reactjs-localstorage';
import jsPDF from 'jspdf';

import Navbar from "../adminNav";

function MarketingDashboard() {
    const [Advertisements,setallAdvertisements] = useState([])
    const [searchName,setsearchName] = useState("")
    const [AllPublished,setAllPublished] = useState([]);
    const [setAllReject,setAllRejects] = useState([]);

     if(searchName === '' || searchName=== null){
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
                axios.get(global.APIUrl+"/advertisement/allAdvertisements ")
                .then(res => setallAdvertisements(res.data))
                .catch(error => console.log(error));
            })
        
       }else{
             // eslint-disable-next-line react-hooks/rules-of-hooks
             useEffect(() => {
                axios.get(global.APIUrl+"/advertisement/allAdvertisementDetails/"+searchName)
                .then(res => setallAdvertisements(res.data))
                .catch(error => console.log(error));
              })
       }

      function remove(adID){
        axios.delete(global.APIUrl+"/advertisement/deleteAdvertisements/"+adID).then(() =>{
            Swal.fire({  
                title: "Success!",
                text: "Advertisement Delete",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"})

        }).catch((err)=>{
            Swal.fire({  
                title: "Error!",
                text: "Advertisement Not Delete",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"})
        })
    }

    function edit( adID, name, contactNo, title, description, image, status)
    { 
        reactLocalStorage.setObject("AdvertismntEdit", [adID, name, contactNo, title, description, image, status]);
        window.location.href = "/MarketingEdit";
    }

    function print()
    { 


        axios.get(global.APIUrl+"/advertisement/allAdvertisementsUserPublished")
        .then(res => setAllPublished(res.data))
        .catch(error => console.log(error));
    
        axios.get(global.APIUrl+"/advertisement/allAdvertisementsUserReject")
        .then(res => setAllRejects(res.data))
        .catch(error => console.log(error));
     

        var doc = new jsPDF('p', 'pt');
        doc.setTextColor(254, 8, 8 );
        doc.text(20, 20, "Advertisment Summery")
        doc.addFont('helvetica', 'normal')
        doc.setFontSize(12);
        doc.setTextColor(3, 3, 3);
        doc.text(25, 60, 'Total Advertisment Count '+Advertisements.length)
        doc.text(25, 80, 'Customer Side Advertisement Summery' )
        doc.text(25, 100, 'Total Advertisment Published Count '+AllPublished.length)      
        doc.text(25, 120, 'Total Advertisment Reject Count '+setAllReject.length)      
        doc.text(25, 140, 'Total Advertisment Pendding Count '+setAllReject.length)   
        doc.save('Advertisment Count.pdf')

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
                          <h1 className="text-uppercase text-black">SL Car sale Marketing MANAGEMENT</h1>
                     </center>
                     <div className="text-end mt-5">
                       <a href="MarketingAdd">
                            <MDBBtn className='btn-med' style={{ fontSize:'13px', fontWeight:'light'}} outline color='dark'>
                                New Advertisement
                            </MDBBtn>{' '}&nbsp;&nbsp;
                       </a>
                        <a href="CustomerAdDashboard">
                            <MDBBtn className='btn-med' style={{ fontSize:'13px', fontWeight:'light'}} outline color='primary'>
                                Customer Side Advertisements
                            </MDBBtn>{' '}&nbsp;&nbsp;
                        </a>
                        <MDBBtn className='btn-med' style={{ fontSize:'13px', fontWeight:'light'}} outline color='danger' onClick={print}>
                                Download
                            </MDBBtn>{' '}&nbsp;&nbsp;
                     </div>
                      <div className=" pt-1 mt-5">
                        <h6>Search Using Name</h6>
                        <MDBInput  className="mt-3 bg-white" id='form1' type='text'  onChange={(e) =>{
                            setsearchName(e.target.value);
                            }}/>
                           
                     </div>
                     
                     <br/>
                     <MDBTable  hover>
                        <MDBTableHead className="bg-primary">
                            <tr>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px',fontSize:"20px"}}>Advertisement ID</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px',fontSize:"20px"}}>Name</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px',fontSize:"20px"}}>Contact Number</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px',fontSize:"20px"}}>Title</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px',fontSize:"20px"}}>Actions</h6></th>
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
                                    <MDBBtn size='lg' className="shadow-0" color='danger' style={{fontSize:'15px'}} onClick={() => remove(Advertisement.adID)}>Delete</MDBBtn>{''}&nbsp;&nbsp;
                                    <MDBBtn size='lg' className="shadow-0" color='primary' style={{fontSize:'15px'}} onClick={() => edit(
                                        Advertisement.adID,
                                        Advertisement.name,
                                        Advertisement.contactNo,
                                        Advertisement.title,
                                        Advertisement.description,
                                        Advertisement.image,
                                        Advertisement.status)}  >Edit</MDBBtn>
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