const express = require('express')
const router = express.Router()
const multer = require('multer')
const Product = require('../models/product')
const checkAuth = require('../middleware/check-auth')

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads/')
    },
    filename: function(req, file, cb){
        cb(null,file.originalname)
    }
})

const upload = multer({storage})

router.get('/',(req,res,next)=>{
    Product.find().select("name price _id productImage").then((products)=>{
        res.status(200).send({count:products.length,products})
    }).catch((e)=>{
        res.status(404).send()
    })
})

router.post('/',checkAuth, upload.single('productImage'), (req,res,next)=>{
    console.log(req.file)
    const product = new Product({
        name : req.body.name,
        price : req.body.price,
        productImage: req.file.path
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

router.patch('/:productId',checkAuth,(req,res,next)=>{
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

router.delete('/:productId',checkAuth,(req,res,next)=>{
    const id = req.params.productId;    
    Product.findByIdAndRemove(id).then((product)=>{
        if(!product){
           return res.status(404).send()
        }
        res.status(200).send({product})
    }).catch((e)=>{
        res.status(400).send()
    })
})

// <--------- Single Product Routes End! -------->


module.exports = router