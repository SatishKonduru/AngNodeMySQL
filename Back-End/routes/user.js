const express = require('express')
const nodeMailer = require('nodemailer') 
const connection = require('../connection')
const router = express.Router();

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


module.exports = router