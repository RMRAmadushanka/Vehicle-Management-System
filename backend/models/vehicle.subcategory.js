const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vehicle_subcategory = new Schema({
    category: {
        type: String,
        required: true,
    },subcategory: {
        type: String,
        required: true,
        unique: true
    },
}, {
timestamps: true
});
const vehicle_category_Schema = mongoose.model('vehicle_subcategory', vehicle_subcategory);
module.exports = vehicle_category_Schema;