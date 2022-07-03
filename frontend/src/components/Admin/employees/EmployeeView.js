
import React, { useState , useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBBtn} from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import {reactLocalStorage} from 'reactjs-localstorage';
import Navbar from "../adminNav";

function EmployeeProfileView() {
    var Employee = reactLocalStorage.getObject('EmployeeView');
    const username = Employee[0];

    const [name, setname] = useState(Employee[1]);
    const [address, setaddress] = useState(Employee[2]);
    const [phone, setphone] = useState(Employee[3]);
    const [gender, setgender] = useState(Employee[4]);
    const [bod, setbod] = useState(Employee[5]);
    const [nic, setnic] = useState(Employee[6]);

    const [salary, setSalary] = useState('');
    const [position, setPosition] = useState('');

     function salaryStatus(e){
        e.preventDefault();
        const newFeedback ={salary,position}

        axios.put(global.APIUrl+"/employee/updateEmployeSalary/"+username,newFeedback).then(() =>{
            Swal.fire({  
                title: "Success!",
                text: "Profile Updated",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"}).then(okay => {
                if (okay) {
                    window.location.href = "/EmployeeDashboard";
                }
            });

        }).catch((err)=>{
            Swal.fire({  
                title: "Error!",
                text: "Profile Not Updated",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"})
        })
    }

    function Reject(e){
        e.preventDefault();
       

        axios.put(global.APIUrl+"/employee/rejectEmploye/"+username).then(() =>{
            Swal.fire({  
                title: "Success!",
                text: " Employee Rejected",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"}).then(okay => {
                if (okay) {
                    window.location.href = "/EmployeeDashboard";
                }
            });

        }).catch((err)=>{
            Swal.fire({  
                title: "Error!",
                text: "Employee Not Rejected",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"})
        })
    }

    return (
    <div  >
        
        <div >
            <div  style={{paddingTop:'3%',paddingLeft:'2%', width:'98%'}}>

                <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{color:'black'}}><i class="fas fa-home"></i>Admin Dashboard</h4>
                <hr/>

                <div className="container-fluid bg-white" style={{paddingLeft:'5%', paddingTop:'2%' ,paddingBottom:'2%', paddingRight:'5%'}} >

                        <div className="text-end mt-5">
                            <a href="EmployeeDashboard">
                                <MDBBtn className='btn-sm' style={{ fontSize:'20px', fontWeight:'100',letterSpacing:'2px' }} size="lg" rounded color="dark">
                                    Dashboard
                                </MDBBtn>
                            </a>
                        </div>

                    
                        <h1 className="text-uppercase"> {name} - Profile </h1>
                        <br/><br/>
                        
                        

                      <MDBRow>
                        <MDBCol sm='8'>

                            <MDBCard className='shadow-0'>
                            <MDBCardBody className="alert-dark alert">
                                <table className="w-50" style={{fontSize:"20px"}}>
                                    <tr>
                                        <th><b>User Name</b></th>
                                        <td>{username}</td>
                                    </tr>
                                     <tr>
                                        <td><b>Full Name</b></td>
                                        <td>{name}</td>
                                    </tr>
                                     <tr>
                                        <td><b>Address</b></td>
                                        <td>{address}</td>
                                    </tr>
                                     <tr>
                                        <td><b>Telephone</b></td>
                                        <td>{phone}</td>
                                    </tr>
                                     <tr>
                                        <td><b>Birth Day</b></td>
                                        <td>{bod}</td>
                                    </tr>
                                     <tr>
                                        <td><b>NIC</b></td>
                                        <td>{nic}</td>
                                    </tr>
                                      <tr>
                                        <td><b>Gender</b></td>
                                        <td>{gender}</td>
                                    </tr>
                                </table>
                            </MDBCardBody>
                            </MDBCard>
                        </MDBCol>

                        

                        <MDBCol sm='6'>
                            <MDBCard className='shadow-0'>
                            <MDBCardBody>
                                <form>

                                    <div class="mb-3 mt-5">
                                        <label for="exampleInputEmail1" class="form-label h5" style={{fontSize:"20px"}}>Enter Salary Amount</label>
                                        <input type="number" class="form-control" style={{fontSize:"18px"}} onChange={(e) =>{
                                            setSalary(e.target.value);
                                        }} required/>
                                        <br/>
                                    </div>

                                    <div class="mb-3">
                                        <label for="exampleInputEmail1" class="form-label h5" style={{fontSize:"20px"}}>Enter His/Her Position</label>
                                        <select class="form-select" style={{fontSize:"18px"}} onChange={(e) =>{
                                            setPosition(e.target.value);
                                        }} required>
                                                <option value="">Select Position</option>
                                                <option value="Car Salesman">Car Salesman</option>
                                                <option value="General Manager">General Manager</option>
                                                <option value="Finance Manager">Finance Manager</option>
                                        </select>
                                    </div>

                                    <div className="text-end">
                                        <br/>
                                        <button type="button" class="btn btn-success d-letter-spacing"  style={{fontSize:"18px"}} onClick={salaryStatus} >Add Employee</button>&nbsp;&nbsp;&nbsp;
                                        <button type="button" class="btn btn-danger d-letter-spacing " style={{fontSize:"18px"}} onClick={Reject} >Reject</button>
                                    </div>
                                 </form>
                            </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        </MDBRow>
                       
                 </div>
            </div>
        </div>
      </div>
      )
};


export default EmployeeProfileView;