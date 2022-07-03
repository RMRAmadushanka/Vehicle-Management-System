import React, { useState, useEffect } from 'react';
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBBtn,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBDropdownLink,
    MDBCollapse,
    MDBCardImage,
    MDBCarouselInner,
    MDBCarouselItem,
    MDBCarouselElement,
    MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol
} from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { reactLocalStorage } from 'reactjs-localstorage';
import Navbar from './main_parts/navbar.js';
import Footer from './main_parts/footer.js';

function Home() {
    const [showBasic, setShowBasic] = useState(false);
    const [showNavRight, setShowNavRight] = useState(false);

    function publishAdd() {

        const tel = sessionStorage.getItem('user_name');
        if (tel === null) {
            Swal.fire({
                title: "Error!",
                text: "To access web site, First of all you must fill login form.",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            }).then(okay => {
                if (okay) {
                    window.location.href = "/UserLogin";
                }
            });
        } else {
            window.location.href = "/UserViewAdvertisement";
        }

    }

    const [AllCategory, setAllCategory] = useState([])
    useEffect(() => {
        axios.get(global.APIUrl + "/vehicle_category/allVehicleCategory")
            .then(res => setAllCategory(res.data))
            .catch(error => console.log(error));
    });

    return (
        <div>
            <div className="pt-1 pb-1" style={{ backgroundColor: '#F4F4F4' }}>
                <center>
                    <small style={{ fontSize: '14px', letterSpacing: '2px' }} className="text-muted text-capitalize">The Largest Autobile Service Hub In The Sri Lanka</small>
                </center>
            </div>
            <Navbar />

            <header class="bg-dark py-5">
                <div class="container px-5">
                    <div class="row gx-5 align-items-center justify-content-center">
                        <div class="col-lg-8 col-xl-7 col-xxl-6">
                            <div class="my-5 text-center text-xl-start">
                                <h1 class="display-5 fw-bolder text-white mb-2 text-uppercase">
                                    visit Our showrooms<br />
                                    <span
                                        class="txt-rotate text-warning"
                                        data-period="2000"
                                        data-rotate='[ "COLOMBO", "KOLLUPITIYA", "negombo", "piliyandala"]'></span>
                                </h1>
                                <p class="lead fw-normal text-white-50 mb-4" style={{ fontSize: '16px' }}>SL Car Sale is a pioneer in the automotive industry and has been a trusted supplier of brand new and reconditioned vehicles since 1977. Vehicles travel across the world from our trusted supplies in Asia and Europe to reach the hands of our clients.</p>
                                <div class="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
                                    <a class="btn btn-danger btn-lg px-4 me-sm-3" href="/UserLogin" style={{ letterSpacing: '1px' }} >Offers</a>
                                    <a class="btn btn-outline-danger btn-lg px-4" style={{ letterSpacing: '1px' }} href="#!">Shop</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-5 col-xxl-6 d-none d-xl-block text-center"><img class="img-fluid rounded-3 my-5" src="./img/bg.png" alt="..." /></div>
                    </div>
                </div>
            </header>
            <section className="container mt-5 pt-5 pb-5 mb-5">
                <h2 className="text-uppercase text-center" style={{ color: '#19011C' }}>Vehicle Category</h2>
                <div className="container">
                    <MDBRow className="mt-4">
                        <MDBCol sm='3'>
                            <a href="importVehicleUser?id=Car">
                                <div className="shopBox">
                                    <MDBCardImage position='top' src='https://cdn.dribbble.com/users/2427999/screenshots/4867670/media/c9e9f5f9670779b82593cb6b5cd3f756.png?compress=1&resize=400x300' alt='...' height="200" width="500" />
                                    <p className='text-center h5 text-dark'><br />Car</p>
                                </div>
                            </a>
                        </MDBCol>
                        <MDBCol sm='3'>
                            <a href="importVehicleUser?id=Van">
                                <div className="shopBox">
                                    <MDBCardImage position='top' src='https://thumbs.dreamstime.com/b/contour-delivery-van-vector-cargo-coloring-book-minivan-isolated-white-background-driver-s-side-door-217633452.jpg' alt='...' height="200" width="500" />
                                    <p className='text-center h5 text-dark'><br />Van</p>
                                </div>
                            </a>
                        </MDBCol>
                        <MDBCol sm='3'>
                            <a href="importVehicleUser?id=Bike">
                                <div className="shopBox">
                                    <MDBCardImage position='top' src='https://i.ytimg.com/vi/QACDEp0xNZo/mqdefault.jpg' alt='...' height="200" width="500"/>
                                    <p className='text-center h5 text-dark'><br />Bike</p>
                                </div>
                            </a>
                        </MDBCol>
                        <MDBCol sm='3'>
                            <a href="importVehicleUser?id=Heavy Vehicle">
                                <div className="shopBox">
                                    <MDBCardImage position='top' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJnsa-lyvj8R6xlcFaftg3L2Npb1J6rKxUaL2xsiemnlKvju9cDR-NfBsKeHEuG6E8v54&usqp=CAU' alt='...' height="200" width="500" />
                                    <p className='text-center h5 text-dark'><br />Heavy Vehicle</p>
                                </div>
                            </a>
                        </MDBCol>


                    </MDBRow>
                    <div className="text-end text-capitalize mt-4" data-bs-toggle="modal" data-bs-target="#staticBackdrop">

                        Vehicle Categories <MDBIcon fas icon="chevron-circle-right" />

                    </div>

                </div>
            </section>
            <div class="modal fade bg-light" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered  modal-xl">
                    <div class="modal-content">
                        <div class="modal-header bg-dark ">
                            <h4 class="modal-title text-white" id="staticBackdropLabel">All  Vehicle Categories</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row ">

                                {AllCategory.map((Category, key) => (
                                    <div class="col-sm-4">
                                        <a href={"importVehicleUser?id=" + Category.name}>

                                            <div className="alert alert-dark">
                                                <h2 className="text-capitalize">{Category.name}</h2>
                                            </div>

                                        </a>
                                    </div>
                                ))}



                            </div>
                        </div>
                        <div class="modal-footer border-0">
                            <button type="button" class="btn btn-dark" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <section className="container mt-5 pt-5 pb-5 mb-5">
                <h2 className="text-uppercase text-center" style={{ color: '#19011C' }}>Shop by brand</h2>
                <div className="container">
                    <MDBRow className="mt-4">
                        <MDBCol sm='2'>
                            <div className="shopBox">
                                <MDBCardImage position='top' src='https://www.carmax.com/cars/images/brand-logos/ford.png' alt='...' />
                            </div>
                        </MDBCol>
                        <MDBCol sm='2'>
                            <div className="shopBox">
                                <MDBCardImage position='top' src='https://www.carmax.com/cars/images/brand-logos/toyota.png' alt='...' />
                            </div>
                        </MDBCol>
                        <MDBCol sm='2'>
                            <div className="shopBox">
                                <MDBCardImage position='top' src='https://www.carmax.com/cars/images/brand-logos/jeep.png' alt='...' />
                            </div>
                        </MDBCol>
                        <MDBCol sm='2'>
                            <div className="shopBox">
                                <MDBCardImage position='top' src='https://www.carmax.com/cars/images/brand-logos/nissan.png' alt='...' />
                            </div>
                        </MDBCol>
                        <MDBCol sm='2'>
                            <div className="shopBox">
                                <MDBCardImage position='top' src='https://i.imgur.com/XMAEe5f.png' alt='...' />
                            </div>
                        </MDBCol>
                        <MDBCol sm='2'>
                            <div className="shopBox">
                                <MDBCardImage position='top' src='https://i.imgur.com/8FVsMRk.jpeg' alt='...' />
                            </div>
                        </MDBCol>
                    </MDBRow>
  
                </div>
            </section>
            <section>
                <div class="jumbotron jumbotron-fluid" style={{ background: 'url(https://i.imgur.com/BswFpbb.png)', width: '100%', backgroundRepeat: 'no-repeat', backgroundCover: 'center' }}>
                    <div class="container text-center" style={{ paddingTop: '10%', paddingBottom: '10%' }}>
                        <h1 class="display-4 fw-bold text-warning">PUBLISH ADVERTISEMENT</h1>
                        <button type="button" class="btn btn-outline-light btn-lg" style={{ fontSize: '18px' }} onClick={publishAdd}>Go <MDBIcon fas icon="angle-right" /></button>
                    </div>
                </div>
            </section>
            <section className="container" style={{ marginTop: '10%', marginBottom: '8%' }}>
                <div class="row">
                    <div class="col-sm-6">
                        <div class="card border-0 shadow-0">
                            <h3 style={{ lineHeight: '0px' }} className="mb-0 pb-4">Our Location</h3>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15843.194046863206!2d79.9729445!3d6.9146775!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x2c63e344ab9a7536!2sSri%20Lanka%20Institute%20of%20Information%20Technology!5e0!3m2!1sen!2slk!4v1631374842039!5m2!1sen!2slk" width="700" height="500" style={{ border: '0' }} allowfullscreen="" loading="lazy"></iframe>
                            <p class="text-muted pt-3 text-left">SLIIT Malabe Campus, New Kandy Rd, Malabe 10115</p>
                        </div>
                    </div>
                    <div class="col-sm-1"></div>
                    <div class="col-sm-5">
                        <div class="card border-0 shadow-0 bg-light p-5">
                            <h3 style={{ lineHeight: '0px' }} className="mb-0 pb-0 text-danger">Openning Time</h3>
                            <div className="ms-3 pt-5">
                                <div class="mb-3 row">
                                    <div class="col-sm-4">
                                        <h5 className="text-dark">Monday : </h5>
                                    </div>
                                    <div class="col-sm-8">
                                        <h5>10.00 AM. - 10.00 P.M.</h5>
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <div class="col-sm-4">
                                        <h5 className="text-dark">Tuesday : </h5>
                                    </div>
                                    <div class="col-sm-8">
                                        <h5>10.00 AM. - 10.00 P.M.</h5>
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <div class="col-sm-4">
                                        <h5 className="text-dark">Wednesday : </h5>
                                    </div>
                                    <div class="col-sm-8">
                                        <h5>10.00 AM. - 10.00 P.M.</h5>
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <div class="col-sm-4">
                                        <h5 className="text-dark">Thursday : </h5>
                                    </div>
                                    <div class="col-sm-8">
                                        <h5>10.00 AM. - 10.00 P.M.</h5>
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <div class="col-sm-4">
                                        <h5 className="text-dark">Friday : </h5>
                                    </div>
                                    <div class="col-sm-8">
                                        <h5>10.00 AM. - 10.00 P.M.</h5>
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <div class="col-sm-4">
                                        <h5 className="text-dark">Saturday : </h5>
                                    </div>
                                    <div class="col-sm-8">
                                        <h5>10.00 AM. - 08.00 P.M.</h5>
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <div class="col-sm-4">
                                        <h5 className="text-dark">Sunday : </h5>
                                    </div>
                                    <div class="col-sm-8">
                                        <h5>10.00 AM. - 08.00 P.M.</h5>
                                    </div>
                                </div>
                                <hr />
                                <div class="mb-3 row">
                                    <div class="col-sm-4">
                                        <h5 className="text-muted">Holidays : </h5>
                                    </div>
                                    <div class="col-sm-8">
                                        <h5 className="text-muted">New Year Week / Poyaday</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <br />
            <Footer />
        </div>
    )
};

export default Home;