const router = require('express').Router();
let vehicle_import_schema = require('../models/vehicle.import');

router.route('/addvehicle_imported').post((req,res) => {
    const auctionDate = req.body.auctionDate;
    const vehicleType = req.body.vehicleType;
    const brand = req.body.brand;
    const model = req.body.model;
    const milage = req.body.milage;
    const m_year = req.body.m_year;
    const engine_cc = req.body.engine_cc;
    const transmission = req.body.transmission;
    const fuel = req.body.fuel;
    const color = req.body.color;
    const condition = req.body.condition;
    const auctionPrice = req.body.auctionPrice;
    const image = req.body.image;

    const vehicle_import_data = new vehicle_import_schema({auctionDate, vehicleType, brand, model, milage, m_year, engine_cc, transmission, fuel, color, condition, auctionPrice, image});

    vehicle_import_data.save()
        .then(() => res.json('Vehicle import Add!'))
        .catch((err) => {
            console.log(err);
                res.status(500).send({status: "Error with Deleting Data",error: err.message});
        });
});

router.route("/allImportVehicle").get(async (req, res) => {
        vehicle_import_schema.find()
                .then(Vehicles => res.json(Vehicles))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/allImportVehicle/:model").get(async (req, res) => {
         let model = req.params.model;
        vehicle_import_schema.find({model: { $regex: ".*" + model + ".*"}})
                .then(Vehicles => res.json(Vehicles))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/deleteImportVehicle/:id").delete(async (req, res) => {
        let id = req.params.id;
        vehicle_import_schema.findByIdAndDelete(id).then(() => {
                res.status(200).send({status :"vehicle Delted"});
        }).catch((err) => {
            console.log(err);
                res.status(500).send({status: "Error with Deleting Data",error: err.message});
        });
});

router.route("/vehicleUpdate/:id").put(async (req,res) => {
        let id = req.params.id;
        const {auctionDate, vehicleType, brand, model, milage, m_year, engine_cc, transmission, fuel, color, condition, auctionPrice}= req.body;

        const vehicleUpdate={
           auctionDate, vehicleType, brand, model, milage, m_year, engine_cc, transmission, fuel, color, condition, auctionPrice
        }
        const update = await vehicle_import_schema.findByIdAndUpdate(id,vehicleUpdate).then(() => {
            res.status(200).send({status :"Vehicle Updated"});
        }).catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with Updating Data",error: err.message});
        });
});

router.route("/allCars").get(async (req, res) => {
        vehicle_import_schema.find({vehicleType : 'Car'})
                .then(Vehicles => res.json(Vehicles))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/allVan").get(async (req, res) => {
        vehicle_import_schema.find({vehicleType : 'Van'})
                .then(Vehicles => res.json(Vehicles))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/allBike").get(async (req, res) => {
        vehicle_import_schema.find({vehicleType : 'Bike'})
                .then(Vehicles => res.json(Vehicles))
                .catch(err => res.status(400).json('No Data'))
});


router.route("/allHeavyVehicle").get(async (req, res) => {
        vehicle_import_schema.find({vehicleType : 'Heavy Vehicle'})
                .then(Vehicles => res.json(Vehicles))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/homePageView/:id").get(async (req, res) => {
        let id = req.params.id;
        vehicle_import_schema.find({vehicleType : id})
                .then(Vehicles => res.json(Vehicles))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/homePageOneVehicleView/:id").get(async (req, res) => {
        let id = req.params.id;
        vehicle_import_schema.findById(id)
                .then(Vehicles => res.json(Vehicles))
                .catch(err => res.status(400).json('No Data'))
});

module.exports = router;