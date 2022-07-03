
import React, { useState , useEffect } from 'react';
import { MDBTable, MDBIcon , MDBTableHead, MDBTableBody, MDBBtn, MDBInput} from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import jsPDF from 'jspdf';
import {reactLocalStorage} from 'reactjs-localstorage';
import Navbar from "../adminNav";

function UserDashboard() {

    const [allUserRegs,setallUserRegs] = useState([])
   

      function dowloadBlackList(){}
      function remove(id){
        axios.delete(global.APIUrl+"/userDashboard/deleteUSer/"+id).then(() =>{
            Swal.fire({  
                title: "Success!",
                text: "User Delete",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"})

        }).catch((err)=>{
            Swal.fire({  
                title: "Error!",
                text: "User Not Delete",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"})
        })
    }

    async function draemVehicleReport(name,telephone1,address,Dream,Salary   )
   {
    
    const { value:text} = await Swal.fire({
        title: 'Input Price Of '+ Dream+' : ',
        input: 'text',
        inputPlaceholder: 'Price..'
      })
      
      if (text) {
        var doc = new jsPDF('p', 'pt');
        doc.setTextColor(254, 8, 8 );
        doc.text(10, 40, name+" Dream Car Plan")
        doc.setFontSize(10);
        doc.setTextColor(3, 3, 3);
        doc.text(45, 90, 'Customer Name: '+name)
        doc.text(45, 110, 'Telephone Number : '+telephone1)
        doc.text(45, 130, 'Address : '+address)
        doc.text(45, 150, "Dream Vehicle : "+Dream)
        doc.text(45, 170, 'Salary : '+Salary)
        const monthLeft =  parseInt(Salary) - parseInt(Salary)*0.45;
        const month = parseInt(text)/monthLeft;
        doc.text(45, 190, 'How long does it take to buy a vehicle?  : '+Math.round(month))
        doc.addFont('helvetica', 'normal')
        doc.setFontSize(12);
        doc.setTextColor(3, 3, 3);
        doc.save( name+' Dream Car Plan.pdf')
      }

   }
    


    function edit( id, name, email, telephone1, Category, otherCategory, Brand, otherBrand, Dream, Salary, address, userName)
    { 
        reactLocalStorage.setObject("UserEditAdmin", [ id, name, email, telephone1, Category, otherCategory, Brand, otherBrand, Dream, Salary, address, userName]);
        window.location.href = "/UserEditAdmin";
    }

    const [searchName,setsearchName] = useState("")
    if(searchName === '' || searchName=== null){
        
            axios.get(global.APIUrl+"/userDashboard/allUserRegs")
            .then(res => setallUserRegs(res.data))
            .catch(error => console.log(error));
        }
    else{
       
            axios.get(global.APIUrl+"/userDashboard/allUserRegs/"+searchName)
            .then(res => setallUserRegs(res.data))
            .catch(error => console.log(error));
          
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
                          <h1 className="text-uppercase text-black">sl car sale User MANAGEMENT</h1>
                          <br/><br/>
                     </center>
                     <div class="mb-3 mt-4">
                        <h6>Search Name</h6>
                        <MDBInput  className="mt-3 bg-white" id='form1' type='text'  onChange={(e) =>{
                            setsearchName(e.target.value);
                        }}/>
                    </div>

                    <br/>
                     
                     <h3 className='mt-2' id="Current" >Current Users</h3>
                     
                     <MDBTable  hover>
                        <MDBTableHead className="bg-dark" style={{fontSize:"18px"}}>
                            <tr>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px',fontSize:"20px"}}>Full Name</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px',fontSize:"20px"}}>Contact Number</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px',fontSize:"20px"}}>Email</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px',fontSize:"20px"}}>Address</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px',fontSize:"20px"}}>Action</h6></th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                          {allUserRegs.map((allUserReg,key) => (
                            <tr className="bg-light">
                                <td style={{fontSize:'18px'}}>{allUserReg.name}</td>
                                <td style={{fontSize:'18px'}}>{allUserReg.telephone1}</td>
                                <td style={{fontSize:'18px'}}>{allUserReg.email}</td>
                                <td style={{fontSize:'18px'}}>{allUserReg.address}</td>
                                <td>
                                    <MDBBtn size='lg' className="shadow-0" color='danger' onClick={() => remove(allUserReg._id)}><MDBIcon fas icon="trash-alt" /></MDBBtn> &nbsp;&nbsp;
                                    <MDBBtn size='lg' className="shadow-0" color='dark' onClick={() => draemVehicleReport(allUserReg.name,allUserReg.telephone1,allUserReg.address,allUserReg.Dream,allUserReg.Salary   )}>User Report</MDBBtn>{''}&nbsp;&nbsp;
                                   
                                                                                                                                   
                                </td>
                            </tr>
                            ))}
                        </MDBTableBody>
                        </MDBTable>
                         <br/>
                         <br/>
                       
                 </div>
            </div>
        </div>
      </div>
      )
};


export default UserDashboard;