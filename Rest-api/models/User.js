const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        max: 20,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    profilePhoto: {
        type: String,
        default: ""
    },
    coverPhoto: {
        type: String,
        default: ""
    },
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    desc: {
        type: String,
        max: 50,
        default:""
    },
    city: {
        type: String,
        max: 50
    },
    relationship: {
        type:Number
    },
    from: {
        type: String,
        max: 50
    }
},
{timestamps : true}
);

module.exports = mongoose.model("User", userSchema);