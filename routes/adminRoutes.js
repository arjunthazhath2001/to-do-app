const {Router}= require('express')
const {AdminModel} = require('../db')

const adminRouter= Router()


adminRouter.get('/upload', function(req,res){})

module.exports={
    adminRouter:adminRouter
}