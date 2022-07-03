
import React, { useState , useEffect } from 'react';
import { MDBCard, MDBCardHeader, MDBCardBody, MDBInput, MDBTableBody,MDBTable,MDBTableHead, MDBBtn, MDBCol, MDBRow} from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import {reactLocalStorage} from 'reactjs-localstorage';
import Navbar from "../adminNav";

function FeedbackDashboard() {

    const [Feedbacks,setAllFeedback] = useState([]);
   

    

    function all()
    {
       
            axios.get(global.APIUrl+"/feedback/allFeedback")
            .then(res => setAllFeedback(res.data))
            .catch(error => console.log(error));
      
    }

    function positive()
    {
       axios.get(global.APIUrl+"/feedback/allFeedbackPositive")
       .then(res => setAllFeedback(res.data))
       .catch(error => console.log(error));
    }
    
    function negative()
    {
       axios.get(global.APIUrl+"/feedback/allFeedbackNegative")
       .then(res => setAllFeedback(res.data))
       .catch(error => console.log(error));
    }
    
    function View(id){
        reactLocalStorage.setObject("customerFeedback", [id]);
        window.location.href = "/FeedbackView";
    }

     const [searchName,setsearchName] = useState("")

     function set_searchName(e)
     {
         const searchName = e;
        if(searchName === '' || searchName=== null){
            axios.get(global.APIUrl+"/feedback/allFeedback")
            .then(res => setAllFeedback(res.data))
            .catch(error => console.log(error));
         }else{
            axios.get(global.APIUrl+"/feedback/allFeedback/"+searchName)
            .then(res => setAllFeedback(res.data))
            .catch(error => console.log(error));
         }
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
                          <h2 className="text-uppercase text-black">sl car sale Feedback MANAGEMENT</h2>
                     </center>
                    <MDBRow className="mt-4" id="summery">
                     <MDBCol sm='4'>
             
                         <MDBCard className=" square border-bottom border-5 border-dark alert-primary " style={{boxShadow:'2px 3px 5px #BBBBBB'}}>
                            <MDBCardHeader className=" fw-bold mt-2 h4 pl-2  pb-4 text-left ms-3 text-uppercase" >
                                <span> 
                                    
                                    {/* <b style={{fontSize:'180%'}}>{CountFeedbacks.length}</b> */}
                                    <br/>&nbsp;All Feedbacks</span>
                            </MDBCardHeader>
                        </MDBCard>
  
                    </MDBCol>
                    <MDBCol sm='4'>
             
                         <MDBCard className=" square border-bottom border-5 border-dark alert-danger " style={{boxShadow:'2px 3px 5px #BBBBBB'}}>
                            <MDBCardHeader className=" fw-bold mt-2 h4 pl-2  pb-4 text-left ms-3 text-uppercase" >
                                <span> 
                                    
                                    {/* <b style={{fontSize:'180%'}}>{FeedbacksNegative.length}</b> */}
                                    <br/>&nbsp;Negative Feedbacks</span>
                            </MDBCardHeader>
                        </MDBCard>
  
                    </MDBCol>
                    <MDBCol sm='4'>
                 
                         <MDBCard className=" square border-bottom border-5 border-dark alert-success " style={{boxShadow:'2px 3px 5px #BBBBBB'}}>
                            
                            <MDBCardHeader className=" fw-bold mt-2 h4 pl-2 pb-4 text-left ms-3 text-uppercase" >
                                <span>
                                    
                                    {/* <b style={{fontSize:'180%'}}>{CountFeedbacksPositive.length}</b> */}
                                 
                               <br/>&nbsp;Positive Feedbacks</span>
                            </MDBCardHeader>
                         </MDBCard>
                
                    </MDBCol>
                 </MDBRow>
                     <div className="text-end mt-5">
                    
                            <MDBBtn onClick={all} className='btn-sm' style={{ fontSize:'13px', fontWeight:'light'}} outline color='dark'>
                                All
                            </MDBBtn>{' '}
                        
                            <MDBBtn onClick={positive} className='btn-sm' style={{ fontSize:'13px', fontWeight:'light'}} outline color='danger'>
                                Positive
                            </MDBBtn>{' '}
                       
                            <MDBBtn onClick={negative}  className='btn-sm' style={{ fontSize:'13px', fontWeight:'light'}} outline color='primary'>
                                Negative
                            </MDBBtn>{' '}

                        <a href="Feedbackreport">
                            <MDBBtn   className='btn-sm' style={{ fontSize:'13px', fontWeight:'light'}} outline color='secondary'>
                                Report
                            </MDBBtn>{' '}
                        </a>
                    
                     </div>
                     <h5 className='mt-5' id="#current">{}</h5>
                     <div className=" pt-1 mt-5">
                        <h6>Search Name</h6>
                        <MDBInput  className="mt-3 bg-white" id='form1' type='text'  onChange={(e) =>{
                            set_searchName(e.target.value);
                            }}/>
                            <br/>
                     </div>
                     <MDBTable className="mt-2" hover>
                        <MDBTableHead className="bg-dark">
                            <tr>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>User Name</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Stars</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Feedback Type</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Feedback About</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Action</h6></th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                          {Feedbacks.map((Feedback,key) => (
                            <tr className="bg-light">
                                <td style={{fontSize:'18px'}}>{Feedback.username}</td>
                                <td style={{fontSize:'18px'}}>{Feedback.start}</td>
                                <td style={{fontSize:'18px'}}>{Feedback.FeedbackType}</td>
                                <td style={{fontSize:'18px'}}>{Feedback.FeedBackAbout}</td>
                                <td>
                                    <MDBBtn size='sm' className="shadow-0" color='danger' onClick={() => View(Feedback.feedbackId)}>View</MDBBtn>{''}&nbsp;&nbsp;
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


export default FeedbackDashboard;