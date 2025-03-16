const {Router}= require('express')
const {courseSchema} = require('../db')

const coursesRouter= Router()

coursesRouter.get('/videos', function(req,res){})


module.exports={
    coursesRouter: coursesRouter
}