const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

// path to main product page 
router.get('/products', shopController.getProducts);

// obtain product details
router.get('/products/:productId', shopController.getProduct);

// go to the shopping cart page 
router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/create-order', shopController.postOrder);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

router.post('/cart-delete-item', shopController.postCartDeleteProduct);

module.exports = router;
