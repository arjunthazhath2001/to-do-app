const mongoose= require('mongoose')


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

const AdminModel= mongoose.model('admin', adminSchema)
const CoursesModel= mongoose.model('courses', courseSchema)
const PurchaseModel= mongoose.model('purchases', purchaseSchema)
const UserModel= mongoose.model('user',userSchema)


module.exports={
    AdminModel,
    CoursesModel,
    PurchaseModel,
    UserModel
}