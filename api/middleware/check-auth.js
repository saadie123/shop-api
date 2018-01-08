const jwt = require('jsonwebtoken')
module.exports = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token,"crazystring");
        req.userData = decoded
        next()
    } catch(e){
        return res.status(401).send()
    }
}