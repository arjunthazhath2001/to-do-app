const jwt = require('jsonwebtoken')
function userMiddleware(req,res,next){
    const token = req.headers.token
    const decodedToken = jwt.verify(token,process.env.JWT_SECRET_USER)
    if(decodedToken){
        req.userId = decodedToken.id;
        next()
    }
    else{
        res.status(403).json({"message":"please login"})
    }
}

module.exports={
    userMiddleware:userMiddleware
}