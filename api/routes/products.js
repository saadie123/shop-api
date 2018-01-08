const express = require('express')
const router = express.Router()
const multer = require('multer')

const checkAuth = require('../middleware/check-auth')
const ProductsController = require('../controllers/products')

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads/')
    },
    filename: function(req, file, cb){
        cb(null,file.originalname)
    }
})

const upload = multer({storage})

router.get('/', ProductsController.get_products)

router.post('/',checkAuth, upload.single('productImage'), ProductsController.save_product)


// <--------- Single Product Routes -------->

router.get('/:productId', ProductsController.get_product)

router.patch('/:productId',checkAuth, ProductsController.update_product)

router.delete('/:productId',checkAuth, ProductsController.delete_product)

// <--------- Single Product Routes End! -------->


module.exports = router