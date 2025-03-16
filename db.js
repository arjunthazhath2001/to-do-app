const mongoose= require('mongoose')

console.log("connected to mongoose")
mongoose.connect("mongodb+srv://arjunta32:Jayasreemp555@cluster0.w6ojk.mongodb.net/coursera")

const Schema = mongoose.Schema

const ObjectId= mongoose.Types.ObjectId


const userSchema = new Schema({
    firstname: String,
    lastname: String,
    email: {type:String, unique: true},
    password: String,
})

const adminSchema = new Schema({
    firstname: String,
    lastname: String,
    email: {type:String, unique: true},
    password: String,
})

const courseSchema = new Schema({
    title: String,
    description: String,  
    price: String,  
    imageUrl: String,  
    creatorId: ObjectId,
})

const purchaseSchema = new Schema({
    userId: ObjectId,
    courseId: ObjectId

})

mongoose.model('admin', adminSchema)
mongoose.model('courses', courseSchema)
mongoose.model('purchases', purchaseSchema)
mongoose.model('user',userSchema)


module.exports={
    userSchema:userSchema,
    adminSchema:adminSchema,
    courseSchema:courseSchema,
    purchaseSchema:purchaseSchema
}