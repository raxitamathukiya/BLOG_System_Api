const express=require("express")
const app=express()
const {userRoute}=require("./route/user.route")
const {blogRoute}=require("./route/blog.route")
const {auth}=require("./middlewear/auth.middleware")
const {connection}=require("./db")
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'BLOG API Documentation',
        version: '1.0.0',
      },
    },
    apis: ['./route/*.js'], 
  };
  
  const openapiSpecification = swaggerJsdoc(options);
  app.use("/blogapi",swaggerUi.serve,swaggerUi.setup(openapiSpecification))

app.use(express.json())
app.use("/users",userRoute)
app.use(auth)
app.use("/articles",blogRoute)

app.listen(8080,()=>{
    console.log("server start")
})