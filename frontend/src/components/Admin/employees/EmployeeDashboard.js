
import React, { useState , useEffect } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBInput} from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import {reactLocalStorage} from 'reactjs-localstorage';
import Navbar from "../adminNav";




function EmployeeDashboard() {
    const [Employees,setEmployees] = useState([])
    const [PEmployees,setPEmployees] = useState([])
  
     
    useEffect(() => {
        axios.get(global.APIUrl+"/employee/allEmployeesPending")
       .then(res => setPEmployees(res.data))
       .catch(error => console.log(error));
      })

     const [searchName,setsearchName] = useState("")

     if(searchName === '' || searchName=== null){
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            axios.get(global.APIUrl+"/employee/allEmployees")
            .then(res => setEmployees(res.data))
            .catch(error => console.log(error));
         })
     }else{
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            axios.get(global.APIUrl+"/employee/allEmployees/"+searchName)
            .then(res => setEmployees(res.data))
            .catch(error => console.log(error));
         })
     }

      function remove(username){
        axios.delete(global.APIUrl+"/employee/deleteEmployee/"+username).then(() =>{
            Swal.fire({  
                title: "Success!",
                text: "Employee Delete",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"})

        }).catch((err)=>{
            Swal.fire({  
                title: "Error!",
                text: "Employee Not Delete",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"})
        })
    }

    function view( username, name, address, phone, gender, bod, nic) {
         reactLocalStorage.setObject("EmployeeView", [username, name, address, phone, gender, bod, nic]);
         window.location.href = "/EmployeeView";
    }

    function editEmployeeProfile( username, name, address, phone, gender, bod, nic, position, salary)
    { 
        reactLocalStorage.setObject("EmployeeEdit", [username, name, address, phone, gender, bod, nic, position, salary]);
        window.location.href = "/EmployeeEdit";
    }

    

    

    return (
    <div  class="dashboard-main-wrapper">
        <Navbar/>
        <div class="dashboard-wrapper">
            <div  style={{paddingTop:'4%',paddingLeft:'2%', width:'98%'}}>
                <br/>
                
                <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{color:'black'}}><i class="fas fa-home"></i>Admin Dashboard</h4>
                <hr/>

                    <div className="container-fluid bg-white" style={{paddingLeft:'5%', paddingTop:'2%' ,paddingBottom:'2%', paddingRight:'5%'}} >

                     <center>
                          <h1 style={{color:"#422057FF",textAlign:"center",textTransform: "uppercase"}} >SL Car Sale Employee Management</h1>
                     </center>

                     <div className="text-end mt-5">
                    </div>
                    
                    <div className=" pt-1 mt-5">
                        <h6>Search Name</h6>
                        <MDBInput  className="mt-3 bg-white" id='form1' type='text'  onChange={(e) =>{
                            setsearchName(e.target.value);
                            }}/>
                    </div>

                    

                    

                    <h4 className='mt-5' id="#current" style={{color:"#606060FF",paddingBottom:"1%"}}><u>Current Employees</u></h4>
                     
                     <MDBTable className="mt-2" hover>
                        <MDBTableHead className="bg-warning">
                            <tr>
                                <th scope='col' ><h6 className="text-black" style={{fontWeight:'300',letterSpacing:'2px',fontSize:'18px'}}>Employee Name</h6></th>
                                <th scope='col' ><h6 className="text-black" style={{fontWeight:'100',letterSpacing:'2px',fontSize:'18px'}}>Employee NIC</h6></th>
                                <th scope='col' ><h6 className="text-black" style={{fontWeight:'100',letterSpacing:'2px',fontSize:'18px'}}>Address</h6></th>
                                <th scope='col' ><h6 className="text-black" style={{fontWeight:'100',letterSpacing:'2px',fontSize:'18px'}}>Phone Number</h6></th>
                                <th scope='col' ><h6 className="text-black" style={{fontWeight:'100',letterSpacing:'2px',fontSize:'18px'}}>Position</h6></th>
                                <th scope='col' ><h6 className="text-black" style={{fontWeight:'100',letterSpacing:'2px',fontSize:'18px'}}>Actions</h6></th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                          {Employees.map((Employee,key) => (
                            <tr className="bg-light">
                                <td style={{fontSize:'17px'}}>{Employee.name}</td>
                                <td style={{fontSize:'17px'}}>{Employee.nic}</td>
                                <td style={{fontSize:'17px'}}>{Employee.address}</td>
                                <td style={{fontSize:'17px'}}>{Employee.phone}</td>
                                <td style={{fontSize:'17px'}}>{Employee.position}</td>
                                <td>
                                    <MDBBtn size='lg' className="shadow-0" rounded outline color="danger" style={{fontWeight:"bold",fontSize:"12px"}} onClick={() => remove(Employee.username)}>Delete Employee</MDBBtn>{''}&nbsp;&nbsp;
                                    <MDBBtn size='lg' className="shadow-0" rounded outline color="success" style={{fontWeight:"bold",fontSize:"12px"}}   onClick={() => editEmployeeProfile(Employee.username,Employee.name,Employee.address,Employee.phone,Employee.gender,Employee.bod,Employee.nic,Employee.position,Employee.salary)}>Edit Employee</MDBBtn>
                                </td>
                            </tr>
                            ))}
                        </MDBTableBody>
                        </MDBTable>

                     <h4 style={{paddingTop: '7%',color:"#606060FF",paddingBottom:"1%"}} id="#Pending"><u>Pending Employees</u></h4>
                     <MDBTable className="mt-2" hover>
                        <MDBTableHead className="bg-warning">
                            <tr>
                                <th scope='col' ><h6 className="text-black" style={{fontWeight:'100',letterSpacing:'2px',fontSize:'18px'}}>Employee Name</h6></th>
                                <th scope='col' ><h6 className="text-black" style={{fontWeight:'100',letterSpacing:'2px',fontSize:'18px'}}>Employee NIC</h6></th>
                                <th scope='col' ><h6 className="text-black" style={{fontWeight:'100',letterSpacing:'2px',fontSize:'18px'}}>Address</h6></th>
                                <th scope='col' ><h6 className="text-black" style={{fontWeight:'100',letterSpacing:'2px',fontSize:'18px'}}>Phone Number</h6></th>
                                <th scope='col' ><h6 className="text-black" style={{fontWeight:'100',letterSpacing:'2px',fontSize:'18px'}}>Birthay</h6></th>
                                <th scope='col' ><h6 className="text-black" style={{fontWeight:'100',letterSpacing:'2px',fontSize:'18px'}}>Action</h6></th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                          {PEmployees.map((PEmployee,key) => (
                            <tr className="bg-light">
                                <td style={{fontSize:'16px'}}>{PEmployee.name}</td>
                                <td style={{fontSize:'16px'}}>{PEmployee.nic}</td>
                                <td style={{fontSize:'16px'}}>{PEmployee.address}</td>
                                <td style={{fontSize:'16px'}}>{PEmployee.phone}</td>
                                <td style={{fontSize:'16px'}}>{PEmployee.bod}</td>
                                <td>
                                    <MDBBtn size='lg' className="shadow-0" rounded outline color="success" style={{fontWeight:"bold",fontSize:"12px"}} onClick={() => view(PEmployee.username,PEmployee.name,PEmployee.address,PEmployee.phone,PEmployee.gender,PEmployee.bod,PEmployee.nic)}>View Employee</MDBBtn>
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


export default EmployeeDashboard;