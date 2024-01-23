const express = require("express")
const mongoose = require("mongoose")
const userRouter = require("./routers/userRoute")
const blogRouter = require("./routers/blogRouter")

mongoose.connect("mongodb://localhost:27017/blogapp")
    .then(() => console.log("connected to db"))
    .catch((error) => console.log(error))

const app = express()

app.get("/", (req, res) => res.send("Hello harsh, sad, cruel world!"))
app.use(express.urlencoded({ extended: false }))
app.use("/users", userRouter)
app.use("/blogs", blogRouter)

app.listen(5000, () => console.log("server is running.."))
