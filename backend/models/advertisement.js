const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const advertisement = new Schema({
     adID: {
        type: String,
        required: true,
      
    },
     name: {
        type: String,
       
    },
     contactNo: {
        type: String,
       
    },
     title: {
        type: String,
       
    },
     description: {
        type: String,
       
    },
    image: {
        type: String,
       
    },
    status: {
        type: String,
       
    },
    userType: {
        type: String,
        
    },

}, {
timestamps: true
});
const advertisement_Schema = mongoose.model('advertisement', advertisement);
module.exports = advertisement_Schema;