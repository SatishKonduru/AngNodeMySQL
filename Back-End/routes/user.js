const express = require('express')
const nodeMailer = require('nodemailer') 
const connection = require('../connection')
const router = express.Router();
const jwt = require('jsonwebtoken')
require('dotenv').config()
var auth = require('../services/authentication')
var checkRole = require('../services/checkRole')

var transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})


router.post('/signup', (req, res) => {
    let user = req.body
    query = 'select email from user where email = ?'
    connection.query(query, [user.email],(err, results)=>{
        if(!err){
            if(results.length <= 0){
                query = "insert into user (name,contactNumber,email,password,status,role) values(?,?,?,?,'false','user')"
                connection.query(query, [user.username, user.cnumber, user.email, user.password], (err, results) => {
                    if(!err){
                        return res.status(200).json({message: 'Registered Successfully'})
                    }   
                    else{
                        return res.status(500).json(err)
                    }
                })
            }
            else{
                return res.status(400).json({message: 'Email already exist.'})
            }
        }
        else{
            return res.status(500).json(err)
        }
    })
    
})

router.post('/forgotPassword',(req, res)=> {
    const user =req.body
    query = "select email, password from user where email=?"
    connection.query(query, [user.email],(err, results)=>{
        if(!err){
            console.log("No. of Records found: ", results.length)
            if(results.length <= 0){
                return res.status(200).json({message:'Password sent successfully to your email'})
            }
            else{
                var mailOptions = {
                    from: process.env.EMAIL,
                    to: results[0].email,
                    subject: 'Password by RSK Helpline',
                    html: '<p><b>Email: </b>'+results[0].email+'<br><b>Password: '+results[0].password+'</b><br><a href="http://localhost:4200/">Click here to Login...</a></p>'
                }
                transporter.sendMail(mailOptions, function(error, info){
                    if(error){
                        console.log("Error....:",error)
                    }
                    else{
                        console.log("Email sent: ", info.response)
                    }
                })
                return res.status(200).json({message:'OK. Password sent to your email'})
            }
        }else{
                return res.status(500).json(err)
        }
    })
})

router.post('/login', (req, res) => {
    const user = req.body
    query = "select email, password, role, status from user where email = ?"
    connection.query(query,[user.email],(err, results) => {
        if(!err){
            if(results.length <= 0 || results[0].password != user.password){
                return res.status(401).json({message: "Incorrect Username or Password"})
            }
            else if(results[0].status == 'false'){
                return res.status(401).json({message: "Wait for Admin Approval."})
            }
            else if(results[0].password == user.password){
                console.log("So far OK", results[0].email,results[0].role)
                const response = {email : results[0].email, role: results[0].role}
                const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, {expiresIn: '2h'})
                console.log("Access Token: ", accessToken)
                return res.status(200).json({token: accessToken})
            }
            else{
                return res.status(400).json({message: "Something Went Wrong..."})
            }
        }
        else{
            return res.status(500).json(err)
        }
    })
})

router.post('/changePassword',(req, res) => {
    const user = req.body
    var query = "select * from user where email=? and password=?"
    connection.query(query, [user.email, user.oldPassword], (err, results)=>{
        if(!err){
           if(results.length <= 0){
                return res.status(400).json({message: 'Incorrect old password'})
            }
            else if(results[0].password == user.oldPassword){
                query = "update user set password=? where email=?"
                    connection.query(query,[user.newPassword, user.email], (err, results) => {
                        if(!err){
                            return res.status(200).json({message: 'Password Updated Successfully.'})
                        }
                        else{
                            return res.status(500).json(err)
                        }
                    })
                }
                else{
                    return res.status(400).json({message:'Something went wrong. Please try later.'})
                }
            }
             
        else{
            return res.status(400).json(err)
        }
    })
})
module.exports = router