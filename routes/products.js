
const express = require('express');
const router = express.Router();
let Product = require('../models/product');

router.get('/products', (req, res) => {
    console.log('Rendering products.pug');
    Product.find().then((Products) => {
        res.render('Products', { Products });
    })
});

router.get('/products/new', checkPassword, (req, res) => {
    console.log('Rendering new product.pug');
        Product.find().then((Products) => {
            res.render('new', { Products })
        });
    });

router.post('/products/new', (req, res) => {
    console.log('Posting to products/new ' + req.body.name)
    console.log(req.body)
    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    });

    product.save((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Product Created!');
        }
    res.redirect('/products');
    });
});

router.get('/products/delete/:id', (req, res) => {
    console.log('Attempting to delete product');
    let product = Product.findById(req.params.id);
    product.remove((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Product Deleted');
        }
    res.redirect('/products');
    });
});


function checkPassword(req, res, next) {
    if (req.query.secretcode !== '1234'){
        res.send(401);
    } else {
        next()
    };
};

module.exports = router;