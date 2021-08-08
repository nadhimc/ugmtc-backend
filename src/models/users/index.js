const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Users = new Schema({
    nama_tim: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    asal: {
        type: String,
        required: true
    },
    manager: {
        type: String,
        required: true
    },
    no_manager: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model("Users", Users)