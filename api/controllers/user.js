const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

exports.signup = (req,res,next)=>{
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err){
            return res.status(500).send()
        }else{
            const user = new User({
                email: req.body.email,
                password: hash
            })
            user.save().then(user=>{
                res.status(201).send({user})
            }).catch(e=>{
                res.status(400).send()
            })
        }
    })
}

exports.login = (req,res,next)=>{
    User.findOne({email:req.body.email}).then(user=>{
        if(!user){
           return res.status(404).send()
        }
        bcrypt.compare(req.body.password,user.password, (err,result)=>{
            if(result){
               const token = jwt.sign({email:user.email,userId:user._id},"crazystring",{
                   expiresIn:"1h"
               },) 
               return res.status(200).send({token})
            }
            res.status(401).send()
        })
    }).catch(e=>{
        res.status(404).send()
    })
}

exports.delete_user = (req,res,next)=>{
    const id = req.params.userId
    User.findByIdAndRemove(id).then(user=>{
        if(!user){
          return res.status(404).send()            
        }
        res.status(200).send({user})
    }).catch(e=>{
        res.status(400).send()
    })
}