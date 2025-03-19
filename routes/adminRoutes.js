const {Router}= require('express')
const {AdminModel, CoursesModel} = require('../db')
const {adminMiddleware} = require('../middlewares/admin')
const adminRouter= Router()
const { z } = require('zod')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
//best practices-----> 1. input validation using zod, 2. hashing the password using bcrypt before storing in db, 3. storing important variables in .env file and making sure they are not pushed into github(.gitignore), 4. Using async await and try catch block whenever interacting with the database, 5. SEPERATE JWT_SECRET for different users

adminRouter.post('/signup', async function(req,res){
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
        await AdminModel.create({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: hashedPassword
    })}catch(error){
        res.json("Sign up failed")
    }
    res.json("Signed up") })


adminRouter.post('/signin',async function(req,res){
    const requiredBody= z.object({
        email: z.string().email(),
        password:z.string()
    })
    const parsedBody = requiredBody.safeParse(req.body)   
    
    if(!parsedBody.success){
        res.json({"message" : parsedBody.error.issues[0].message})
        return
    }
    const {email, password} = req.body
    console.log(email)
    try{
    const admin= await AdminModel.findOne({
        email:email
    })
    console.log(admin)
    if(admin){
        const verified = await bcrypt.compare(password,admin.password)
        console.log(verified)
        if(verified){
            const token = jwt.sign({id:admin._id},process.env.JWT_SECRET_ADMIN)
            console.log(token)
            res.json({"token": token})
        }else{
            res.json("Wrong credentials")
        }

    }else{
        res.json("User not found")
    }}catch(error){
        res.json("SOME ERROR OCCURED")
    }
})


adminRouter.post('/createcourse',adminMiddleware, async function(req,res){

    const adminId= req.userId;
    const {title,description,price,imageUrl} = req.body

    try{
    const course= await CoursesModel.create({
        title: title,
        description: description,
        price:price,
        imageUrl:imageUrl,
        creatorId: adminId
    })
        if(course){
            res.json({"Course created with id" : course._id})
        }
    } catch(error){
        res.json("Course not created")
    }
})


adminRouter.put('/modifycourse',adminMiddleware,async function(req,res){
    
    const {title, description, price, imageUrl} = req.body;

    const adminId = req.userId;
    const courseId = req.body.courseId;
    try{
    const course =await CoursesModel.updateOne({_id:courseId,
        creatorId: adminId
    },{
        title: title,
        description: description,
        price:price,
        imageUrl:imageUrl,
    })
    console.log(course)
    if(course){
    res.json("Changes made")
    } else{
        res.json("Couldnt find course")
    }
}catch(error){
    res.json("Some error login again")
}

})


adminRouter.get('/getcourses', adminMiddleware, async function(req,res){
    const adminId = req.userId
    console.log(adminId)
    try{const courses= await CoursesModel.find({
        creatorId: adminId
    })
    console.log(courses)
    if(courses){
    res.json({"courses": courses})
}else{
    res.json("no courses")
}
}catch(e){
    res.json("some error try again")
}
})


module.exports={
    adminRouter:adminRouter
}