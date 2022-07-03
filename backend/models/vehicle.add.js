const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vehicle = new Schema({
     auctionDate: {
        type: String,
        required: true
    },
    vehicleType: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    }
    ,color: {
        type: String,
        required: true
    }
    ,condition: {
        type: String,
        required: true
    }
     ,status: {
        type: String,
        required: true
    } 
    ,Showroom: {
        type: String,
        required: true
    },BranchContact: {
        type: String,
        required: true
    }
}, {
timestamps: true
});
const vehicle_Schema = mongoose.model('vehicle', vehicle);
module.exports = vehicle_Schema;