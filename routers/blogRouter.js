const express = require("express")
const blogController = require("../controllers/blogController")

//blogs
const router = express.Router()

router.post("/add", (req, res) => {
    const { authorId, title, body, photoUrl, tags } = req.body
    blogController.PostBlog(authorId, title, body, photoUrl, JSON.parse(tags))
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})

router.patch("/update", (req, res) => {
    const { id, body } = req.body
    blogController.UpdateBlog(id, body).then((result) => res.send(result)).catch((error) => res.send(error))
})

router.delete("/delete", (req, res) => {
    blogController.DeleteBlog(req.body.id).then((result) => res.send(result)).catch((error) => res.send(error))
})

router.get("/latest", (req, res) => {
    blogController.GetLatestBlogs().then((result) => res.send(result)).catch((error) => res.send(error))
})

router.get("/author", (req, res) => {
    blogController.GetBlogsByAuthor(req.body.authorId).then((result) => res.send(result)).catch((error) => res.send(error))
})

router.get("/search-title", (req, res) => {
    blogController.GetBlogsByTitle(req.body.title).then((result) => res.send(result)).catch((error) => res.send(error))
})

router.get("/search-tag", (req, res) => {
    blogController.GetBlogsByTag(JSON.parse(req.body.tags)).then((result) => res.send(result)).catch((error) => res.send(error))
})

router.get("/following", (req, res) => {
    blogController.GetFollowing(req.body.userId).then((result) => res.send(result)).catch((error) => res.send(error))
})

module.exports = router