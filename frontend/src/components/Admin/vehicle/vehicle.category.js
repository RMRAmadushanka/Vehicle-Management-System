import React, { useState, useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBTable, MDBTableHead, MDBTableBody, MDBInput, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from "../adminNav";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function VehicleCategory() {

    const [Category, setCategory] = useState("");
    

    const [AllCategories, setAllCategory] = useState([])

    function Save(e) {
        e.preventDefault();

        const vehicleCategory = { Category }

        axios.post(global.APIUrl + "/vehicle_category/addVehicle_category", vehicleCategory).then(() => {

            Swal.fire({
                title: "Success!",
                text: "Vehicle Category Added!",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"
            }).then(okay => {
                if (okay) {
                    window.location.href = "/Vehiclecategory";
                }
            });


        }).catch((err) => {

            Swal.fire({
                title: "Error!",
                text: "Vehicle Category Not Added!",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
        })
    }


//vehicle category report generate function
    function pdfDownload()
    { 
        const input = document.getElementById('divToPrint');
        html2canvas(input)
        .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
              
            pdf.setTextColor(254, 8, 8 );
            pdf.text(20, 20, 'Vehicle Category List')
            pdf.addImage(imgData, 'JPEG', 10, 10);
            // pdf.output('dataurlnewwindow');
            pdf.save("vehicle category.pdf");
        });
    }



    const [searchName, setsearchName] = useState("")
    if (searchName === '' || searchName === null) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            axios.get(global.APIUrl + "/vehicle_category/allVehicleCategory")
                .then(res => setAllCategory(res.data))
                .catch(error => console.log(error));
        });

    } else {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            axios.get(global.APIUrl + "/vehicle_category/VehicleCategorySearch/" + searchName)
                .then(res => setAllCategory(res.data))
                .catch(error => console.log(error));
        });
    }


//vehicle category remove function
    function remove(name) {
        axios.delete(global.APIUrl + "/vehicle_category/deleteCategory/" + name).then(() => {
            Swal.fire({
                title: "Success!",
                text: "Vehicle Category Delete",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"
            })

        }).catch((err) => {
            Swal.fire({
                title: "Error!",
                text: "Vehicle Category Not Delete",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
        })
    }

    function editEmployeeProfile(name) {

    }


    return (
        <div class="dashboard-main-wrapper" >
            <Navbar />
            <div class="dashboard-wrapper">
                <div style={{ paddingTop: '3%', paddingLeft: '2%', width: '98%' }}>
                    <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{ color: 'black' }}><i class="fas fa-home"></i>Admin Dashboard</h4>
                    <hr />
                    <div className="container-fluid bg-white" style={{ paddingLeft: '5%', paddingTop: '2%', paddingBottom: '2%', paddingRight: '5%' }} >
                        <center>
                            <h1 className="text-uppercase">Vehicle Categories </h1>
                            <br/>
                        </center>

                        <MDBRow className='mt-3'>
                            <MDBCol sm='5'>
                                <MDBCard className='shadow-0'>
                                    <MDBCardBody id="divToPrint">
                                    <div className='text-end'>
                                    <button type="button" class="btn btn-primary d-letter-spacing "  onClick={pdfDownload} ><MDBIcon fas icon="cloud-download-alt" /></button>
                                </div>
                                <div class="mb-3 mt-4">
                                     <MDBInput  className="mt-3 bg-white" id='form1' type='text'  onChange={(e) =>{
                                        setsearchName(e.target.value);
                                        }}/>
                                </div>


                                        <MDBTable borderless className='mt-3' >

                                            <MDBTableHead>
                                                <tr className="bg-dark">
                                                    <th scope='col' className="text-white d-letter-spacing h6" style={{fontSize:"20px"}}>Category Name</th>
                                                    <th scope='col' className="text-white d-letter-spacing h6 text-center" style={{fontSize:"20px"}}>Action</th>
                                                </tr>
                                            </MDBTableHead>

                                            <MDBTableBody>
                                                {AllCategories.map((AllCategory, key) => (
                                                    <tr className="bg-light">
                                                        <td>
                                                            <h6 style={{fontSize:"20px"}}>
                                                                {AllCategory.name}
                                                            </h6>
                                                        </td>
                                                        <td className="text-center">
                                                            <MDBBtn size='lg' className="shadow-0" color='danger' onClick={() => remove(AllCategory.name)}><MDBIcon fas icon="trash-alt" /></MDBBtn>{''}&nbsp;&nbsp;
                                                        </td>
                                                    </tr>
                                                ))}
                                            </MDBTableBody>
                                        </MDBTable>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                            <MDBCol sm='1'></MDBCol>
                            <MDBCol sm='6'>

                                <MDBCard className='shadow-0'>
                                    <MDBCardBody className="bg-light">
                                        <div class="mb-3">
                                            <label for="exampleFormControlInput1" class="form-label h6" style={{fontSize:"20px"}}>New Category</label>
                                            <input type="text" class="form-control" style={{fontSize:"18px",fontWeight:"bold"}}
                                                onChange={(e) => {
                                                    setCategory(e.target.value);
                                                }} />
                                        </div>
                                        <div className="text-end">
                                            <button type="button" class="btn btn-dark d-letter-spacing " style={{fontSize:"13px"}} onClick={Save} >Save</button>&nbsp;&nbsp;&nbsp;
                                            <a href="VehicleDashboard">
                                                <MDBBtn className='btn-sm' outline style={{ fontSize: '15px', fontWeight: '500', letterSpacing: '2px' }} color='dark'>
                                                    Back
                                                </MDBBtn>
                                            </a>&nbsp;&nbsp;&nbsp;
                                        </div>
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


export default VehicleCategory;