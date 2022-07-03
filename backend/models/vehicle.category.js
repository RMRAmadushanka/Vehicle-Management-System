const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vehicle_category = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
}, {
timestamps: true
});
const vehicle_category_Schema = mongoose.model('vehicle_category', vehicle_category);
module.exports = vehicle_category_Schema;