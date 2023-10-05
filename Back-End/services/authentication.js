require('dotenv').config()
const jwt = require('jsonwebtoken')
function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    console.log("Auth Header: ", authHeader)
    const token = authHeader && authHeader.trim().split(' ')[1]
    
    if(token == null){
        console.log("Token: ", token)
        console.log("Error with token")
        return res.sendStatus(401)// Unauthorized
    }
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, response) => {
        if(err){
            return res.sendStatus(403) //forbidden error
        }
        else{
            res.locals =  response
            next()
        }
    })
}
module.exports = {
    authenticateToken : authenticateToken
}