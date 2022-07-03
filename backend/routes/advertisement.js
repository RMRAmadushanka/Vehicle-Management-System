const router = require('express').Router();
let advertisement_schema = require('../models/advertisement');

router.route('/addAdvertisement').post((req,res) => {
    const adID = (Math.random() + 1).toString(36).substring(7);
    const name = req.body.name;
    const contactNo = req.body.contactNo;
    const title = req.body.title;
    const description = req.body.description;
     const image = req.body.picture;
    const status ="Published";
    const userType = "Admin";

    const advertisement = new advertisement_schema({adID, name, contactNo, title, description, image, status, userType});

    advertisement.save()
        .then(() => res.json('Advertisement Add!'))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/addAdvertisementUser').post((req,res) => {
    const adID = (Math.random() + 1).toString(36).substring(7);
    const name = req.body.name;
    const contactNo = req.body.contactNo;
    const title = req.body.title;
    const description = req.body.description;
    const image = req.body.picture;
    const status ="Pending";
    const userType = req.body.userName;

    const advertisement = new advertisement_schema({adID, name, contactNo, title, description, image, status, userType});

    advertisement.save()
        .then(() => res.json('Advertisement Add!'))
        .catch(err => res.status(400).json('Error: '+err));
});


router.route("/allAdvertisements").get(async (req, res) => {
        advertisement_schema.find({userType : 'Admin'})
                .then(Advertisements => res.json(Advertisements))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/allAdvertisementDetails/:Name").get(async (req, res) => {
        const Name = req.params.Name;
        advertisement_schema.find({name : { $regex: ".*" + Name + ".*"}})
                .then(Advertisements => res.json(Advertisements))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/allAdvertisementsPublished").get(async (req, res) => {
        advertisement_schema.find({status : 'Published'})
                .then(Advertisements => res.json(Advertisements))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/allYourAdvertisements/:userName").get(async (req, res) => {
        const userType = req.params.userName;
        advertisement_schema.find({userType : userType})
                .then(Advertisements => res.json(Advertisements))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/allAdvertisementsUser").get(async (req, res) => {
     
        advertisement_schema.find({ userType : { $ne: "Admin" } , status :  'Pending'})
                .then(Advertisements => res.json(Advertisements))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/allAdvertisementsUserReject").get(async (req, res) => {
     
        advertisement_schema.find({ userType : { $ne: "Admin" } , status :  'Reject'})
                .then(Advertisements => res.json(Advertisements))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/allAdvertisementsUserPublished").get(async (req, res) => {
     
        advertisement_schema.find({ userType : { $ne: "Admin" } , status :  'Published'})
                .then(Advertisements => res.json(Advertisements))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/oneAdvertisment/:id").get(async (req, res) => {
        const id = req.params.id;
        advertisement_schema.find({adID : id})
                .then(Advertisements => res.json(Advertisements))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/deleteAdvertisements/:id").delete(async (req, res) => {
        let id = req.params.id;
        advertisement_schema.findOneAndDelete({adID : id}).then(() => {
                res.status(200).send({status :"Advertisements Delted"});
        }).catch((err) => {
            console.log(err);
                res.status(500).send({status: "Error with Deleting Data",error: err.message});
        });
});

router.route("/rejectAdvertisment/:id").put(async (req,res) => {
        let id = req.params.id;
        const status = req.body.status;

        const statusUpdate={status}

        const update = await advertisement_schema.findOneAndUpdate({adID : id},statusUpdate).then(() => {
            res.status(200).send({status :"Status Updated"});
        }).catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with Updating Data",error: err.message});
        });
});


router.route("/editAdvertisment/:id").put(async (req,res) => {

         let id = req.params.id;

         const name = req.body.name;
         const contactNo = req.body.contactNo;
         const title = req.body.title;
         const description = req.body.description;

        const editAdvertisment={
           name, contactNo, title, description
        }
        const update = await advertisement_schema.findOneAndUpdate({adID : id},editAdvertisment).then(() => {
            res.status(200).send({status :"Advetisment Updated"});
        }).catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with Updating Data",error: err.message});
        });
});

module.exports = router;