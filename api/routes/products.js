const express = require('express');
const router = express.Router();
const Product = require('../models/product')

router.get('/',(req,res,next)=>{
    Product.find().select("name price _id").then((products)=>{
        res.status(200).send({count:products.length,products})
    }).catch((e)=>{
        res.status(404).send()
    })
})

router.post('/',(req,res,next)=>{
    const product = new Product({
        name : req.body.name,
        price : req.body.price
    })
    product.save().then((product)=>{
        res.status(201).send({product})
    }).catch((e)=>{
        res.status(400).send()
    })
})


// <--------- Single Product Routes -------->

router.get('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    Product.findById(id).then((product)=>{
        if(!product){
            return res.status(404).send()
        }
        res.status(200).send({product})
    }).catch((e)=>{
        res.status(404).send()
    })
})

router.patch('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    const body = {
        name: req.body.name,
        price: req.body.price
    }
    Product.findByIdAndUpdate(id,{$set:body},{new:true}).then(product=>{
        res.status(200).send({product})
    }).catch(e=>{
        res.status(400).send()
    })
})

router.delete('/:productId',(req,res,next)=>{
    const id = req.params.productId;    
    Product.findByIdAndRemove(id).then((product)=>{
        res.status(200).send({product})
    }).catch((e)=>{
        res.send(400).send()
    })
})

// <--------- Single Product Routes End! -------->


module.exports = router