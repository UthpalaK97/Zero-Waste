const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    complaintAbout:{
        type:String,
        required:true
    },
    complaintDetails:{
        type:String,
        required:true
    },
    complaintCreatedAt: {
        type: Date,
        default: new Date(),
    },
    userId: {
        type: String,
        required:true
    },
    userName: {
        type: String,
        required:true
    },
    userEmail: {
        type: String,
        required:true
    }
});

module.exports = mongoose.model('Complaint', complaintSchema);