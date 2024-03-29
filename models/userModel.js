const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true ,
        unique: true,
        
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    following: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }]
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User