const express= require('express')
const {userRouter} = require('./routes/userRoutes')
const {coursesRouter} = require('./routes/coursesRoutes')
const {adminRouter} = require('./routes/adminRoutes')
const app = express()
const mongoose= require('mongoose')
    
app.use('api/v1/users', userRouter)
app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/courses', coursesRouter)


async function main(){    
    mongoose.connect("mongodb+srv://arjunta32:Jayasreemp555@cluster0.w6ojk.mongodb.net/coursera")
    app.listen(3000)
    console.log("listening")
}

main()