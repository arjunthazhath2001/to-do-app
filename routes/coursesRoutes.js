const {Router}= require('express')
const {CoursesModel, PurchaseModel} = require('../db')
const { userMiddleware } = require('../middlewares/users')

const coursesRouter= Router()

coursesRouter.post('/purchases', userMiddleware, async function(req,res){
    const userId= req.userId
    const courseId= req.body.courseId
    try{const courses= await PurchaseModel.create({
        userId: userId,
        courseId: courseId
    })

    if(courses){
         res.json("course purchased")
    }}catch(e){
        res.json("Some error occured")
    }
})

coursesRouter.get('/preview', async function(req,res){
    try{
    const courses = await CoursesModel.find({})

    if(courses){
        res.json(courses)
    }

    } catch(e){
        res.json("Some error in fetching courses")
    }

})

module.exports={
    coursesRouter: coursesRouter
}