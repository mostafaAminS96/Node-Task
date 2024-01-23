const user = require("../models/userModel")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")


const Register = async (email, password, name) => {
    try {
        const hash = await bcrypt.hash(password, 10)
        await user.create({ email, password: hash, name })
        return { message: "user was registered successfully!" }
    } catch (error) {
        return { error }
    }
}

const Login = async (email, password) => {
    try {
        const u = await user.findOne({ email })
        if (!u) return { error: "no user is associated with this email" }

        const correctPassword = await bcrypt.compare(password, u.password)
        if (!correctPassword) return { error: "wrong password" }

        return { message: "logged in successfully" }
    } catch (error) {
        return { error }
    }
}

const FollowUser = async (currentUserId, toFollowUserId) => {
    try {
        await user.UpdateOne({ _id: currentUserId }, { $push: { following: toFollowUserId } })
        return { message: "user added to following!" }
    } catch (error) {
        return { error }
    }
}

const UnfollowUser = async (currentUserId, toUnfollowUserId) => {
    try {
        await user.UpdateOne({ _id: currentUserId }, { $pull: { following: toUnfollowUserId } })
        return { message: "user removed from following!" }
    } catch (error) {
        return { error }
    }
}

module.exports = { Register, Login, FollowUser, UnfollowUser }