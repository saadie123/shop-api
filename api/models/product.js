const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true,
        minlength: 3
    },
    price:{
        type: Number,
        required: true
    },
    productImage:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Product',productSchema)