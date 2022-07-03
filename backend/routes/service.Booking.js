const router = require('express').Router();
let service_booking_schema = require('../models/service.booking');

router.route('/addServiceBooking').post((req,res) => {
    const name = req.body.name;
    const email = req.body.email;
    const telephone1 = req.body.telephone1;
    const serviceType = req.body.serviceType;
    const vehicleType = req.body.vehicleType;
    const serviceCenter = req.body.serviceCenter;
    const userName = req.body.userName;
    const status = "Send";

    const service_booking = new service_booking_schema({name, email, telephone1, serviceType, vehicleType, serviceCenter, status, userName});

    service_booking.save()
        .then(() => res.json('Service Booking Add!'))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route("/allServiceBooking").get(async (req, res) => {
        service_booking_schema.find()
                .then(ServiceBooking => res.json(ServiceBooking))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/allServiceBooking/:userName").get(async (req, res) => {
        service_booking_schema.find({userName : req.params.userName , status : 'Send'})
                .then(ServiceBooking => res.json(ServiceBooking))
                .catch(err => res.status(400).json('No Data'))
});


router.route("/allServiceUnBooking/:userName").get(async (req, res) => {
        service_booking_schema.find({userName : req.params.userName , status : 'Unbooking'})
                .then(ServiceBooking => res.json(ServiceBooking))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/allServiceUnbooking").get(async (req, res) => {
        service_booking_schema.find({status : 'Unbooking'})
                .then(ServiceBooking => res.json(ServiceBooking))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/Servicebooking").get(async (req, res) => {
        service_booking_schema.find({status : 'Send'})
                .then(ServiceBooking => res.json(ServiceBooking))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/ServicebookingAccept").get(async (req, res) => {
        service_booking_schema.find({status : 'Accept'})
                .then(ServiceBooking => res.json(ServiceBooking))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/allServiceComplete").get(async (req, res) => {
        service_booking_schema.find({status : 'Complete'})
                .then(ServiceBooking => res.json(ServiceBooking))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/ServicebookingReject").get(async (req, res) => {
        service_booking_schema.find({status : 'Reject'})
                .then(ServiceBooking => res.json(ServiceBooking))
                .catch(err => res.status(400).json('No Data'))
});


router.route("/statusUpdateServiceBooking/:id").put(async (req,res) => {
        let id = req.params.id;
        const status = 'Unbooking';

        const statusUpdate={
          status
        }
        const update = await service_booking_schema.findByIdAndUpdate(id,statusUpdate).then(() => {
            res.status(200).send({status :"Status Updated"});
        }).catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with Updating Data",error: err.message});
        });
});

router.route("/statusUpdate/:id").put(async (req,res) => {
        let id = req.params.id;
        const status = req.body.status;

        const statusUpdate={
          status
        }
        const update = await service_booking_schema.findByIdAndUpdate(id,statusUpdate).then(() => {
            res.status(200).send({status :"Status Updated"});
        }).catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with Updating Data",error: err.message});
        });
});

router.route("/AcceptUpdateServiceBooking/:id").put(async (req,res) => {
        let id = req.params.id;
        const status = 'Accept';

        const statusUpdate={
          status
        }
        const update = await service_booking_schema.findByIdAndUpdate(id,statusUpdate).then(() => {
            res.status(200).send({status :"Status Updated"});
        }).catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with Updating Data",error: err.message});
        });
});

router.route("/editServiceBooking/:id").put(async (req,res) => {
        let id = req.params.id;
        const serviceType = req.body.serviceType;
        const vehicleType = req.body.vehicleType;
        const serviceCenter = req.body.serviceCenter;

        const statusUpdate={
          serviceType, vehicleType, serviceCenter
        }
        const update = await service_booking_schema.findByIdAndUpdate(id,statusUpdate).then(() => {
            res.status(200).send({status :"Status Updated"});
        }).catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with Updating Data",error: err.message});
        });
});

router.route("/deleteserviceBooking/:id").delete(async (req, res) => {
        let id = req.params.id;
        service_booking_schema.findByIdAndDelete(id)
        .then(() => {
                res.status(200).send({status :"Booking Delted"});
        }).catch((err) => {
            console.log(err);
                res.status(500).send({status: "Error with Deleting Data",error: err.message});
        });
});

module.exports = router;