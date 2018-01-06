const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message: "Handling get order request"
    })
})

router.post('/',(req,res,next)=>{
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }
    res.status(201).send({
        message: "Handling post order request",
        order
    })
})


// <--------- Single Order Routes -------->

router.get('/:orderId',(req,res,next)=>{
    const id = req.params.orderId;
    res.status(200).json({
        id:id,
        message: "order get request"
    })
})


router.delete('/:orderId',(req,res,next)=>{
    const id = req.params.orderId;
    res.status(200).json({
        id:id,
        message: "order delete request"
    })
})

// <--------- Single Order Routes End! -------->


module.exports = router