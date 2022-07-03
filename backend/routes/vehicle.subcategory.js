const router = require('express').Router();
let vehicle_subcategory_schema = require('../models/vehicle.subcategory');

router.route('/addVehicle_subcategory').post((req,res) => {
    const category = req.body.category;
    const subcategory = req.body.subcategory;
    const addsubcategory = new vehicle_subcategory_schema({category,subcategory});

    addsubcategory.save()
        .then(() => res.json('Vehicle Sub category Add!'))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route("/allVehicleSubCategory").get(async (req, res) => {
        vehicle_subcategory_schema.find()
                .then(subcategory => res.json(subcategory))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/VehicleSubCategorySearch/:SearchSubCategory").post(async (req, res) => {
        vehicle_subcategory_schema.find({subcategory:req.params.SearchSubCategory})
                .then(VehicleSubCategory => res.json(VehicleSubCategory))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/deleteSubCategory/:subcategory").delete(async (req, res) => {
        let subcategory = req.params.subcategory;
        vehicle_subcategory_schema.findOneAndDelete({subcategory : subcategory}).then(() => {
                res.status(200).send({status :"Sub-Category Delted"});
        }).catch((err) => {
            console.log(err);
                res.status(500).send({status: "Error with Deleting Data",error: err.message});
        });
});

router.route("/allVehicleSubCategory/:SubCategory").get(async (req, res) => {
         const SubCategory = req.params.SubCategory;
        vehicle_subcategory_schema.find({subcategory: { $regex: ".*" + SubCategory + ".*"}})
                .then(VehicleCategory => res.json(VehicleCategory))
                .catch(err => res.status(400).json('No Data'))
});

module.exports = router;