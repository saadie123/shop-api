const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth')
const OrdersController = require('../controllers/orders')

router.get('/',checkAuth,OrdersController.get_all_orders)

router.post('/',checkAuth, OrdersController.save_order)


// <--------- Single Order Routes -------->

router.get('/:orderId',checkAuth,OrdersController.get_order)


router.delete('/:orderId',checkAuth,OrdersController.delete_order)

// <--------- Single Order Routes End! -------->


module.exports = router