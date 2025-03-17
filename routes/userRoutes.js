
const {Router} = require('express')
const {UserModel} = require('../db')
const { z } = require('zod')
const bcrypt = require('bcrypt')
const userRouter= Router()
const jwt = require('jsonwebtoken')

userRouter.post('/signup', async function(req,res){
    const requiredBody = z.object({
        firstname: z.string().regex(/^[A-Za-z]+$/).min(2).max(100),
        lastname: z.string().regex(/^[A-Za-z]+$/).min(2).max(100),
        password: z.string().min(2).max(100),
        email: z.string().email().min(2).max(100),
      });
    
    const parsedBody = requiredBody.safeParse(req.body)
    if(!parsedBody.success){
        res.json(parsedBody.error)
        return
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



userRouter.post('/signin', async function(req,res){
    const requiredBody= z.object({
        email: z.string().email().max(100),
        password: z.string()
    })
    const parsedBody = requiredBody.safeParse(req.body)

    if(!parsedBody.success){
        res.json({"error": parsedBody.error.issues[0].message})
        return
    }

    const email= req.body.email
    const password = req.body.password
    try{
    const user= await UserModel.findOne({
        email:email
    })
    console.log(user)
    const verified =  await bcrypt.compare(password, user.password)
    console.log(verified)
    if(verified){
        console.log("hi")
        const token= await jwt.sign({id: user._id}, process.env.JWT_TOKEN_USER)
        console.log(token)
        res.json({token: token, message:"All good"})
    } else{
        res.json({message:"Wrong password"})
    }
    } catch(error){
        res.json({"Cannot find user": error})
    }
})


module.exports={
    userRouter:userRouter
}