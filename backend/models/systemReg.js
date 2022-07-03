const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const systemRegSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
}, {
timestamps: true
});
const system_Reg_Schema = mongoose.model('user', systemRegSchema);
module.exports = system_Reg_Schema;