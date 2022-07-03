const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vehicle_import = new Schema({
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
    ,milage: {
        type: String,
        required: true
    }
    ,m_year: {
        type: String,
        required: true
    }
    ,engine_cc: {
        type: String,
        required: true
    }
    ,transmission: {
        type: String,
        required: true
    }
    ,fuel: {
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
    ,auctionPrice: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {
timestamps: true
});
const vehicle_import_Schema = mongoose.model('vehicle_import', vehicle_import);
module.exports = vehicle_import_Schema;