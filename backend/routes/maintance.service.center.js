const router = require('express').Router();
let service_center_schema = require('../models/maintance.service.center');

router.route('/addService_center').post((req,res) => {
    const location = req.body.location;
    const address = req.body.address;
    const telephone1 = req.body.telephone1;
    const email = req.body.email;
    const telephone2 = req.body.telephone2;
    const image = req.body.picture;

    const Service_center = new service_center_schema({location , address , telephone1 , email , telephone2 , image});

    Service_center.save()
        .then(() => res.json('Service center Add!'))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route("/allService_center").get(async (req, res) => {
        service_center_schema.find()
                .then(Service_center => res.json(Service_center))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/deleteService_center/:location").delete(async (req, res) => {
        let location = req.params.location;
        service_center_schema.findOneAndDelete({location : location}).then(() => {
                res.status(200).send({status :"Service Center Delted"});
        }).catch((err) => {
            console.log(err);
                res.status(500).send({status: "Error with Deleting Data",error: err.message});
        });
});

router.route("/Service_centerUpdate/:id").put(async (req,res) => {
        let id = req.params.id;
        const {address , telephone1 ,email, telephone2}= req.body;

        const Service_centerUpdate={
           address,telephone1,email, telephone2
        }
        const update = await service_center_schema.findByIdAndUpdate(id,Service_centerUpdate).then(() => {
            res.status(200).send({status :"Service Center Updated"});
        }).catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with Updating Data",error: err.message});
        });
});
module.exports = router;