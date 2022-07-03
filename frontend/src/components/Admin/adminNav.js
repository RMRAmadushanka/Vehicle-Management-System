import React, { Component } from "react";
import Swal from 'sweetalert2';
import { MDBIcon, MDBCardImage,
 MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol , MDBBtn } from 'mdb-react-ui-kit';

class Navbar extends Component { 
render() {
    function logout(){
        
          	Swal.fire({  
                title: "Success!",
                text: "Logout Success",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"}).then(okay => {
                    if (okay) {
                        window.location.href = "/AdminLogin";
                    }
            });
    }
return (
  <div>
      <div class="dashboard-header">
            <nav class="navbar navbar-expand-lg bgTopNav fixed-top">
                <a class="navbar-brand h1 fw-bold" style={{fontSize:'25px'}} href="Admin"><MDBIcon fas icon="car-alt" className="text-danger" size='2x' /> <span className="text-danger">&nbsp;SL</span><span className="text-dark">-CAR SALE</span></a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul class="navbar-nav ml-auto navbar-right-top">
                        <li class="nav-item square border border-0">
                            
                        </li>

                        
                        <li class="nav-item dropdown nav-user">
                            <a class="nav-link nav-user-img" href="#" id="navbarDropdownMenuLink2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-fw fa-user"></i></a>
                            <div class="dropdown-menu dropdown-menu-right nav-user-dropdown" aria-labelledby="navbarDropdownMenuLink2">
                                <div class="nav-user-info">
                                    <h5 class="mb-0 text-white nav-user-name">Mr. Kannangara </h5>
                                    <span class="status"></span><span class="ml-2">Available</span>
                                </div>
                                <a class="dropdown-item" href="#"><i class="fas fa-user mr-2"></i>Account</a>
                                <a class="dropdown-item" href="#"><i class="fas fa-cog mr-2"></i>Setting</a>
                                <a class="dropdown-item" href="#" onClick={logout}><i class="fas fa-power-off mr-2"></i>Logout</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        
        <div class="nav-left-sidebar sidebar-dark">
            <div class="menu-list" style={{paddingBottom:'40%'}}>
                <nav class="navbar navbar-expand-lg navbar-light shadow-0">
                    <a class="d-xl-none d-lg-none" href="#">Dashboard</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav flex-column">
                           <h4 className="mt-4 mb-4 text-warning">&nbsp;&nbsp;&nbsp;Admin Dashboard</h4>
                            <li class="nav-item ">
                                <a class="nav-link" style={{fontSize:'17px'}} href="http://localhost:3000/UserDashboard"  aria-expanded="false" data-target="#submenu-1" aria-controls="submenu-1"> User </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="ImportDashboard" style={{fontSize:'17px'}}  aria-expanded="false" data-target="#submenu-2" aria-controls="submenu-2"> Import</a>
                            </li>
                            <li class="nav-item ">
                                <a class="nav-link " style={{fontSize:'17px'}} href="VehicleDashboard"  aria-expanded="false" data-target="#submenu-1" aria-controls="submenu-1"> Showroom </a>
                            </li>
                            <li class="nav-item ">
                                <a class="nav-link " style={{fontSize:'17px'}} href="PaymentDashboard"  aria-expanded="false" data-target="#submenu-1" aria-controls="submenu-1"> Payment </a>
                            </li>
                            <li class="nav-item ">
                                <a class="nav-link " style={{fontSize:'17px'}} href="EmployeeDashboard"  aria-expanded="false" data-target="#submenu-1" aria-controls="submenu-1"> Employees </a>
                            </li>
                            <li class="nav-item ">
                                <a class="nav-link " style={{fontSize:'17px'}} href="MarketingDashboard"  aria-expanded="false" data-target="#submenu-1" aria-controls="submenu-1"> Marketing </a>
                            </li>
                            <li class="nav-item ">
                                <a class="nav-link " style={{fontSize:'17px'}} href="DashboardFeedback"  aria-expanded="false" data-target="#submenu-1" aria-controls="submenu-1"> Feedback </a>
                            </li>
                            <li class="nav-item ">
                                <a class="nav-link " style={{fontSize:'17px'}} href="http://localhost:3000/MaintanceDashboard"  aria-expanded="false" data-target="#submenu-1" aria-controls="submenu-1"> Maintenance </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    </div>
   );
 }
}
export default Navbar; 