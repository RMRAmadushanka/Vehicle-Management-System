const router = require('express').Router();
let payment = require('../models/payment');

router.route('/addPayment').post((req,res) => {
    const accountHold = req.body.accountHold;
    const cardNumber = req.body.cardNumber;
    const expireDate = req.body.expireDate;
    const ccv = req.body.ccv;
    const paymentMethod = req.body.paymentMethod;
    const reasons = req.body.reason;
    const Amount = req.body.Amount;
    const userName = req.body.userName;
    const paymentTitle = req.body.paymentTitle;
    const brand = req.body.brand;
    const model = req.body.model;
    const status = "Pending";
    const reason = reasons+" "+brand+" "+model;

    const paymentAdd = new payment({accountHold, cardNumber, expireDate, ccv, paymentMethod, reason, Amount, userName, paymentTitle, status});

    paymentAdd.save()
        .then(() => res.json('Payment Add!'))
        .catch((err) => {
            console.log(err);
                res.status(500).send({status: "Error with Deleting Data",error: err.message});
        });
});

router.route("/allOrderVehiclePayment").get(async (req, res) => {
        payment.find({paymentTitle : 'Vehicle Order'})
                .then(ServiceBooking => res.json(ServiceBooking))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/allOrderVehiclePayment/:amount").get(async (req, res) => {
        let amount = req.params.amount;
        payment.find({Amount : { $regex: ".*" + amount + ".*"} , paymentTitle : 'Vehicle Order'})
                .then(ServiceBooking => res.json(ServiceBooking))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/allOrderADVERTISEMENT").get(async (req, res) => {
        payment.find({paymentTitle : 'ADVERTISEMENT'})
                .then(ServiceBooking => res.json(ServiceBooking))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/allOrderBooking").get(async (req, res) => {
        payment.find({paymentTitle : 'Booking'})
                .then(ServiceBooking => res.json(ServiceBooking))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/statusPaymentUpdate/:id").put(async (req,res) => {
        let id = req.params.id;
        const status = req.body.status;

        const statusUpdate={
          status
        }
        const update = await payment.findByIdAndUpdate(id,statusUpdate).then(() => {
            res.status(200).send({status :"Status Updated"});
        }).catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with Updating Data",error: err.message});
        });
});

router.route("/deletePayment/:id").delete(async (req, res) => {
        let id = req.params.id;
        payment.findByIdAndDelete(id).then(() => {
                res.status(200).send({status :"Payment Delted"});
        }).catch((err) => {
            console.log(err);
                res.status(500).send({status: "Error with Deleting Data",error: err.message});
        });
});

module.exports = router;