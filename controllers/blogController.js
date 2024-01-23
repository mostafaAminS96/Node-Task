const blog = require("../models/blogModel")
const user = require("../models/userModel")
const mongoose = require("mongoose")

//Create Operation
const PostBlog = async (authorId, title, body, photoUrl, tags) => {
    try {
        await blog.create({ authorId, title, body, photoUrl, tags, createdTime: Date.now() })
        return { message: "blod added!" }
    } catch (error) {
        return { error: `Error adding blog ${error}` }
    }
}

// Update Operation
const UpdateBlog = async (_id, body) => {
    try {
        await blog.UpdateOne({ _id }, { body })
        return { message: "blod updated!" }
    } catch (error) {
        return { error }
    }
}

// Delete Operation
const DeleteBlog = async (_id) => {
    try {
        await blog.DeleteOne({ _id })
        return { message: "blod deleted!" }
    } catch (error) {
        return { error }
    }
}

//Latest blogs from 10 days ago untill now.
const GetLatestBlogs = async (timeAgo = 1000 * 60 * 60 * 24 * 10) => {
    try {
        return await blog.find({ createdTime: {$gt: Date.now() - timeAgo} })
    } catch (error) {
        return { error }
    }
}

//search using author
const GetBlogsByAuthor = async (authorId) => {
    try {
        return await blog.find({ authorId })
    } catch (error) {
        return { error }
    }
}

//search using title
const GetBlogsByTitle = async (title) => {
    try {
        return await blog.find({ title })
    } catch (error) {
        return { error }
    }
}

//search using tag
const GetBlogsByTag = async (tags) => {
    try {
        return await blog.find({ tags: { $in: tags } })
    } catch (error) {
        return { error }
    }
}

//See page with followed authors blogs
const GetFollowing = async (_id) => {
    try {
        const currentUser = await user.findOne({ _id })
        return await blog.find({ authorId: { $in: currentUser.following } })
    } catch (error) {
        return { error }
    }
}



module.exports = { PostBlog, UpdateBlog, DeleteBlog, GetLatestBlogs, GetBlogsByAuthor, GetBlogsByTitle, GetBlogsByTag, GetFollowing }