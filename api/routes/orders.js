const express = require('express');
const router = express.Router();

const Order = require('../models/order')
const Product = require('../models/product')
const checkAuth = require('../middleware/check-auth')

router.get('/',checkAuth,(req,res,next)=>{
    Order.find().populate('productId').then(orders=>{
        res.status(200).send({orders})
    }).catch(e=>{
        res.send(404).semd()
    })
})

router.post('/',checkAuth,(req,res,next)=>{
    Product.findById(req.body.productId).then(product=>{
        if(!product)
        {
           return res.status(404).send()
        }
        const order = new Order({
            productId: req.body.productId,
            quantity: req.body.quantity
        })
       return order.save()
    })
    .then((order)=>{
        res.status(201).send({order})
    }).catch(e=>{
        res.status(400).send()
    })
})


// <--------- Single Order Routes -------->

router.get('/:orderId',checkAuth,(req,res,next)=>{
    const id = req.params.orderId;
    Order.findById(id).then(order=>{
        if(!order){
            return res.status(404).send()
        }
        res.status(200).send({order})
    }).catch(e=>{
        res.status(404).send()
    })
})


router.delete('/:orderId',checkAuth,(req,res,next)=>{
    const id = req.params.orderId;
    Order.findByIdAndRemove(id).then(order=>{
        if(!order){
            return res.status(404).send()
        }
        res.status(200).send({order})
    }).catch(e=>{
        res.status(400).send()
    })
})

// <--------- Single Order Routes End! -------->


module.exports = router