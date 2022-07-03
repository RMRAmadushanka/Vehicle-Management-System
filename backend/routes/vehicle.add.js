const router = require('express').Router();
let vehicle_add_schema = require('../models/vehicle.add');

router.route('/addVehicles').post((req,res) => {
   
    const auctionDate = req.body.auctionDate;
    const vehicleType = req.body.vehicleType;
    const brand = req.body.brand;
    const model = req.body.model;
    const color = req.body.color;
    const condition = req.body.condition;
    const Showroom = req.body.Showroom;
    const BranchContact = req.body.BranchContact;
    const status = "Request";
   

    const vehicle_import_data = new vehicle_add_schema({auctionDate, vehicleType, brand, model, color, condition,status, Showroom, BranchContact});

    vehicle_import_data.save()
        .then(() => res.json('Vehicle import Add!'))
        .catch((err) => {
            console.log(err);
                res.status(500).send({status: "Error with Deleting Data",error: err.message});
                });
});




router.route("/allVehicle").get(async (req, res) => {
        vehicle_add_schema.find()
                .then(Vehicles => res.json(Vehicles))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/allVehicleRequest").get(async (req, res) => {
        vehicle_add_schema.find({status : 'Request'})
                .then(Vehicles => res.json(Vehicles))
                .catch(err => res.status(400).json('No Data'))
});


router.route("/deleteVehicle/:id").delete(async (req, res) => {
        let id = req.params.id;
        vehicle_add_schema.findByIdAndDelete(id).then(() => {
                res.status(200).send({status :"vehicle Delted"});
        }).catch((err) => {
            console.log(err);
                res.status(500).send({status: "Error with Deleting Data",error: err.message});
        });
});

router.route("/vehicleUpdate/:id").put(async (req,res) => {
        let id = req.params.id;
        const {auctionDate, vehicleType, brand, model, color, condition}= req.body;

        const vehicleUpdate={
           auctionDate, vehicleType, brand, model, color, condition
        }
        const update = await vehicle_add_schema.findByIdAndUpdate(id,vehicleUpdate).then(() => {
            res.status(200).send({status :"Vehicle Updated"});
        }).catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with Updating Data",error: err.message});
        });
});

router.route("/vehicleAvailability/:id").put(async (req,res) => {
        let id = req.params.id;
        const status = req.body.status;

        const vehicleUnavaluable={
           status
        }
        const update = await vehicle_add_schema.findByIdAndUpdate(id,vehicleUnavaluable).then(() => {
            res.status(200).send({status :"Vehicle Updated"});
        }).catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with Updating Data",error: err.message});
        });
});

module.exports = router;