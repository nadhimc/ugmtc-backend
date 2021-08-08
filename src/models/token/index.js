const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Tokens = new Schema({
    user_id:{
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    expired:{
        type: String,
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model("Tokens", Tokens)