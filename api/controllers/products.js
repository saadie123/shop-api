const Product = require('../models/product')

exports.get_products = (req,res,next)=>{
    Product.find().select("name price _id productImage").then((products)=>{
        res.status(200).send({count:products.length,products})
    }).catch((e)=>{
        res.status(404).send()
    })
}

exports.save_product = (req,res,next)=>{
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
}

exports.get_product = (req,res,next)=>{
    const id = req.params.productId;
    Product.findById(id).then((product)=>{
        if(!product){
            return res.status(404).send()
        }
        res.status(200).send({product})
    }).catch((e)=>{
        res.status(404).send()
    })
}

exports.update_product = (req,res,next)=>{
    const id = req.params.productId;
    const body = req.body
    Product.findByIdAndUpdate(id,{$set:body},{new:true}).then(product=>{
        res.status(200).send({product})
    }).catch(e=>{
        res.status(400).send()
    })
}

exports.delete_product = (req,res,next)=>{
    const id = req.params.productId;    
    Product.findByIdAndRemove(id).then((product)=>{
        if(!product){
           return res.status(404).send()
        }
        res.status(200).send({product})
    }).catch((e)=>{
        res.status(400).send()
    })
}