const router = require('express').Router();
let vehicle_category_schema = require('../models/vehicle.category');

router.route('/addVehicle_category').post((req,res) => {
    const name = req.body.Category;
    const category = new vehicle_category_schema({name});

    category.save()
        .then(() => res.json('Vehicle category Add!'))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/addVehicle_newcategory').post((req,res) => {
    const name = req.body.NewCategory;
    const category = new vehicle_category_schema({name});

    category.save()
        .then(() => res.json('Vehicle category Add!'))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route("/allVehicleCategory").get(async (req, res) => {
        vehicle_category_schema.find()
                .then(VehicleCategory => res.json(VehicleCategory))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/VehicleCategorySearch/:SearchCategory").get(async (req, res) => {
         const SearchCategory = req.params.SearchCategory;
        vehicle_category_schema.find({name: { $regex: ".*" + SearchCategory + ".*"}})
                .then(VehicleCategory => res.json(VehicleCategory))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/deleteCategory/:name").delete(async (req, res) => {
        let name = req.params.name;
        vehicle_category_schema.findOneAndDelete({name : name}).then(() => {
                res.status(200).send({status :"Category Delted"});
        }).catch((err) => {
            console.log(err);
                res.status(500).send({status: "Error with Deleting Data",error: err.message});
        });
});

module.exports = router;