require('dotenv').config()
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
    try{    
     await mongoose.connect(process.env.MONGODB_URL)
     console.log("CONNECTION SUCCESSFUL")
    }catch(errror){
        console.log("DB CONNECTION FAILED")
    }
    //only once database is connected our server should start
    app.listen(process.env.PORT, 
        ()=>{
            console.log("listening")
        }
    )
    
}

main()