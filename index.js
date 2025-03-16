const express= require('express')
const {userRouter} = require('./routes/userRoutes')
const {coursesRouter} = require('./routes/coursesRoutes')
const {adminRouter} = require('./routes/adminRoutes')
const app = express()

app.use('api/v1/users', userRouter)
app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/courses', coursesRouter)


app.listen(3000)