const mongoose=require("mongoose")
const connection=require("../db")
const blogSchema=mongoose.Schema({
    title: String,
    body: String,
    user: String,
    userID: String,
    category: String,
    live: Boolean
})

const blogModel=mongoose.model("Artical",blogSchema)

module.exports={
    blogModel
}
