const jwt = require('jsonwebtoken')

function adminMiddleware(req,res,next){
    const token = req.headers.token
    try{
    const decodedToken = jwt.verify(token,process.env.JWT_SECRET_ADMIN)
    if(decodedToken){
        req.userId= decodedToken.id 
        next()
    } else {
        res.status(403).json({"messsage":"please login"})
    }}catch(error){
        res.json("Some error. Login again")
    }
    
}


module.exports={
    adminMiddleware:adminMiddleware
}