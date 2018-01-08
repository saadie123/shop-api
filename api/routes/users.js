const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const router = express.Router()
const User = require('../models/user')

router.post('/signup',(req,res,next)=>{
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
})

router.delete('/:userId',(req,res,next)=>{
    const id = req.params.userId
    User.findByIdAndRemove(id).then(user=>{
        if(!user){
          return res.status(404).send()            
        }
        res.status(200).send({user})
    }).catch(e=>{
        res.status(400).send()
    })
})

module.exports = router