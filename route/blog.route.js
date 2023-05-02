const express=require("express")
const blogRoute=express.Router()
const {connection}=require("../db")
const {blogModel}=require("../model/blog.model")

/**
 * @swagger
 * tags:
 *  name: Blogs
 *  description: All the API routes realeted the Blogs
 */

/**
 * @swagger
 * /articles/:
 *  get:
 *      summary: This will give a list of all articles from the DataBase
 *      tags: [Blogs]
 *      responses:
 *          200:
 *              description: Returns a list of all articles
 *          400:
 *              description: Inccorect Request!!!!
 */
/**
 * @swagger
 * /articles/:id:
 *  get:
 *      summary: This will find Articles base on Id from the DataBase
 *      tags: [Blogs]
 *      responses:
 *          200:
 *              description: Returns articles
 *          400:
 *              description: Inccorect Request!!!!
 */

/**
 * @swagger
 * /articles/add:
 *  post:
 *      summary: This will Add New Articles in DatBase
 *      tags: [Blogs]
 *      responses:
 *          200:
 *              description: New articals added
 *          400:
 *              description: Inccorect Request!!!!
 */



blogRoute.get("/",async(req,res)=>{
// try {
    
//     const data=await blogModel.find()
//     res.status(200).json(data)
// } catch (error) {
//     console.log(error)
// }

try {
    const {page}=req.query
let limit=2
let skipdata=(page==0? 1: page-1)*limit
let data=await blogModel.find().skip(skipdata).limit(limit)
res.status(200).json(data)
} catch (error) {
    console.log(error)
}

})

blogRoute.post("/add",async(req,res)=>{
    try {
        const data=req.body
    let uplode=new blogModel(data)
    await uplode.save()
    res.status(200).send({message:'New articals added'})
    } catch (error) {
        console.log(error)
    }
})

blogRoute.get("/:id",async(req,res)=>{
    try {
        const {id}=req.params
    let data=await blogModel.findById({_id:id})
    res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
})

blogRoute.patch("/edit/:id",async(req,res)=>{
    try {
        const {id}=req.params
        const updata=req.body
        let data=await blogModel.findByIdAndUpdate({_id:id},updata)
        res.status(200).send({message:'Articales updated'})
    } catch (error) {
        console.log(error)
    }
})
blogRoute.delete("/rem/:id",async(req,res)=>{
    try {
        const {id}=req.params 
    let data=await blogModel.findByIdAndDelete({_id:id})
    res.status(200).send({message:'Articales deleted'})
    } catch (error) {
        console.log(error)
    }
})
module.exports={
    blogRoute
}