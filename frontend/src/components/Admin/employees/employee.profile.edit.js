
import React, { useState , useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBBtn} from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import {reactLocalStorage} from 'reactjs-localstorage';
import NumberFormat from 'react-number-format';
import Navbar from "../adminNav";
import jsPDF from 'jspdf';

function EmployeeProfileEdit() {
    var Employee = reactLocalStorage.getObject('EmployeeEdit');

    const username = Employee[0];
    const [name, setname] = useState(Employee[1]);
    const [address, setaddress] = useState(Employee[2]);
    const [phone, setphone] = useState(Employee[3]);
    const [gender, setgender] = useState(Employee[4]);
    const [bod, setbod] = useState(Employee[5]);
    const [nic, setnic] = useState(Employee[6]);
    const [salary, setSalary] = useState(Employee[8]);
    const [position, setPosition] = useState(Employee[7]);

     function profileUpdate(e){
        e.preventDefault();
        const EmployeProfile ={ address,phone,salary,position}

        axios.put(global.APIUrl+"/employee/updateEmployeProfile/"+username,EmployeProfile).then(() =>{
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

    function generatePDF(){
        var doc = new jsPDF('p', 'pt');
        
        doc.setTextColor(254, 8, 8 );
        doc.setFontSize(25);
        doc.text(130, 130, name+ ' Profile Report')
        doc.setDrawColor(255, 8, 8)
        doc.line(20, 25, 580, 25);

        doc.addFont('calibri', 'bold')
        doc.setFontSize(15);
        doc.setTextColor(3, 3, 3);
        doc.text(50, 180, 'Employee Name : '+name)
        doc.text(50, 210, 'Employee Address : '+address)      
        doc.text(50, 240, 'Telephone Number : '+phone)      
        doc.text(50, 270, 'Gender : '+gender)      
        doc.text(50, 300, 'Birth Day : '+bod)      
        doc.text(50, 330, 'NIC : '+nic)      
        doc.text(50, 360, 'Salary : '+salary)      
        doc.text(50, 390, 'Position : '+position)

        doc.save(name+' profile details.pdf')
      } 

    

    return (
    <div class="dashboard-main-wrapper" >
        <Navbar/>
        <div class="dashboard-wrapper">
            <div  style={{paddingTop:'3%',paddingLeft:'2%', width:'98%'}}>
                
                <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{color:'black'}}><i class="fas fa-home"></i>Admin Dashboard</h4>
                <hr/>

                 <div className="container-fluid bg-white" style={{paddingLeft:'5%', paddingTop:'2%' ,paddingBottom:'2%', paddingRight:'5%'}} >
                    
                    <div className="text-end mt-5">
                         <a href="EmployeeDashboard">
                            <MDBBtn className='btn-sm' style={{ fontSize:'20px', fontWeight:'100',letterSpacing:'2px' }} rounded color="dark">
                                Dashboard
                            </MDBBtn>
                        </a>
                    </div>

                     
                    <h1 className="text-uppercase">{name} - Profile </h1>
                     

                     

                      <MDBRow>

                        <MDBCol sm='8'>
                            <MDBCard className='shadow-0'>
                            <MDBCardBody >
                                <div class="mb-3 mt-2">
                                    <label for="exampleInputEmail1" class="form-label h5" style={{fontSize:"20px"}}>  Username</label>
                                    <input type="text" class="form-control" style={{fontSize:"18px"}}  value={username} disabled required/>
                                </div>
                                
                                <div class="mb-3 mt-2">
                                    <label for="exampleInputEmail1" class="form-label h5" style={{fontSize:"20px"}}>NIC Number</label>
                                    <input type="text" class="form-control" style={{fontSize:"18px"}} value={nic} disabled required/>
                                </div>
                                <div class="mb-3 mt-2">
                                    <label for="exampleInputEmail1" class="form-label h5" style={{fontSize:"20px"}}> Gender</label>
                                    <input type="text" class="form-control" style={{fontSize:"18px"}} value={gender} disabled required/>
                                </div>
                                <div class="mb-3 mt-2">
                                    <label for="exampleInputEmail1" class="form-label h5" style={{fontSize:"20px"}}> Birth Of Date</label>
                                    <input type="text" class="form-control" style={{fontSize:"18px"}} value={bod} disabled required/>
                                </div>
                            </MDBCardBody>
                            </MDBCard>
                        </MDBCol>

                        <MDBCol sm='1'></MDBCol>

                        <MDBCol sm='8'>
                            <MDBCard className='shadow-0'>
                            <MDBCardBody>
                                <form>
                                    <div class="mb-3">
                                        <label for="exampleFormControlInput1" class="h5 form-label" style={{fontSize:"20px"}}>Telephone Number</label>
                                        <NumberFormat  format="0## ### ####" value={phone} class="form-control" placeholder="071 110 1111" style={{fontSize:"18px"}}  onChange={(e) =>{
                                        setphone(e.target.value);
                                    }} />    
                                    </div>

                                    
                                                                    
                                    <div class="mb-3">
                                        <label for="exampleFormControlInput1" class="h5 form-label" style={{fontSize:"20px"}}>Address</label>
                                        <input type="text" class="form-control" value={address} style={{fontSize:"18px"}} onChange={(e) =>{
                                            setaddress(e.target.value);
                                        }} required/>
                                    </div>

                                    <div class="mb-3 mt-3">
                                        <label for="exampleInputEmail1" class="form-label h5" style={{fontSize:"20px"}}>Salary</label>
                                        <input type="text" class="form-control" value={salary} style={{fontSize:"18px"}} onChange={(e) =>{
                                            setSalary(e.target.value);
                                        }}  required/>
                                    </div>

                                    <div class="mb-3">
                                        <label for="exampleInputEmail1" class="form-label h5" style={{fontSize:"20px"}}>Position</label>
                                        <select class="form-select" style={{fontSize:"18px"}} onChange={(e) =>{
                                            setPosition(e.target.value);
                                        }} required>
                                                <option value={position}>{position}</option>
                                                
                                                <option value="Car Salesman">Car Salesman</option>
                                                <option value="General Manager">General Manager</option>
                                                <option value="Finance Manager">Finance Manager</option>
                                        </select>
                                    </div>

                                    <div className="text-end">
                                        <br/>
                                        <button type="button" class="btn btn-success d-letter-spacing " style={{fontSize:"18px"}} onClick={profileUpdate} >Update Details</button>&nbsp;&nbsp;&nbsp;
                                        <button type="button" class="btn btn-primary d-letter-spacing " style={{fontSize:"18px"}} onClick={generatePDF} >Print Details</button>
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


export default EmployeeProfileEdit;