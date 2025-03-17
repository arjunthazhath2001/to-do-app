const jwt = require('jsonwebtoken')

function adminMiddleware(req,res,next){
    const token = req.headers.token
    const decodedToken = jwt.verify(token,process.env.JWT_SECRET_ADMIN)
    if(decodedToken){
        req.userId= decodedToken.id 
        next()
    } else {
        res.status(403).json({"messsage":"please login"})
    }
    
}


module.exports={
    adminMiddleware:userMiddleware
}