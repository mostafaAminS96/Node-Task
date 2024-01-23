const express = require("express")
const userController = require("../controllers/userController")
const bcrypt = require("bcrypt")

//users
const router = express.Router()

router.post("/register", (req, res) => {
    const { email, password, name } = req.body
    userController.Register(email, password, name).then((result) => res.send(result)).catch((error) => res.send(error))
})

router.post("/login", (req, res) => {
    const { email, password } = req.body
    userController.Login(email, password).then((result) => res.send(result)).catch((error) => res.send(error))
})

router.post("/follow", (req, res) => {
    const { currentUserId, toFollowUserId } = req.body
    userController.FollowUser(currentUserId, toFollowUserId).then((result) => res.send(result)).catch((error) => res.send(error))
})

router.post("/unfollow", (req, res) => {
    const { currentUserId, toUnfollowUserId } = req.body
    userController.UnfollowUser(currentUserId, toUnfollowUserId).then((result) => res.send(result)).catch((error) => res.send(error))
})

module.exports = router