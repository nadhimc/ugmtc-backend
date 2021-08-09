const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SpeedKicks = new Schema({
    user_id:{
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    nama:{
        type: String,
        required: true
    },
    tgl_lahir:{
        type: String,
        required: true
    },
    jk:{
        type: String,
        required: true
    },
    berat:{
        type: Number,
        required: true
    },
    sabuk:{
        type: String,
        required: true
    },
    kelas:{
        type: String,
        required: true
    },
    foto:{
        type: String,
        required: true
    },
    youtube:{
        type: String,
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model("SpeedKicks", SpeedKicks)