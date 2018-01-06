const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT || 5000;

const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/shopApp')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers','*')

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET')
        return res.status(200).send()
    }
   next() 
})

//  <---------- Routes to handle requests ---------->
app.use('/products',productRoutes)
app.use('/orders',orderRoutes)
//  <---------- Routes to handle requests ---------->


app.use((req, res, next)=>{
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})
app.use((error, req, res, next)=>{
    res.status(error.status || 500)
    res.json({
        errors:{
            message: error.message,
        }
    })
})

app.listen(port,()=>{
    console.log("Server Started on port "+port)
})