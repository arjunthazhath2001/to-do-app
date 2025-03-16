const {Router} = require('express')
const {userSchema} = require('../db')

const userRouter= Router()

userRouter.get('/signup', async function(req,res){
    res.json("signed up")
})



userRouter.get('/signin', async function(req,res){})


module.exports={
    userRouter:userRouter
}