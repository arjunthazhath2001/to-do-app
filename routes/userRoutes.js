const {Router} = require('express')
const {UserModel} = require('../db')
const { z } = require('zod')
const bcrypt = require('bcrypt')

const userRouter= Router()

userRouter.post('/signup', async function(req,res){
    const requiredBody = z.object({
        firstname: z.string().min(2).max(100),
        lastname: z.string().min(2).max(100),
        password: z.string().min(2).max(100),
        email: z.string().email().min(2).max(100),
      });
    const parsedBody = requiredBody.safeParse(req.body)

    if(!parsedBody.success){
        res.json(parsedBody.error)
    }

    const {firstname, lastname, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password,5)
    try{
        await UserModel.create({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: hashedPassword
    })}catch(error){
        res.json("Sign up failed")
    }
    res.json("Signed up")

})



userRouter.get('/signin', async function(req,res){})


module.exports={
    userRouter:userRouter
}