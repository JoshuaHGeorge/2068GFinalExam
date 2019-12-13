const express = require('express')
const router = express.Router()
const globals = require('../../config/globals');
const Order = require('../models/order');

// allow cross origin requests
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', globals.clientRoot);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    next()
})

router.get('/', (req, res) => {
    Order.find((err, orders) => {
        if (err) {
            return res.send(err).status(404);
        } else {
            res.json(orders).status(202);
        }
    }
    );
});

router.get('/:_id', (req, res) => {

    var id = req.params._id;

    Order.findById(id, (err, order) => {
        if (err) {
            return res.send(err).status(404)
        } else {
            res.json(task).status(202)
        }
    }
    );
});

router.post('/', (req, res) => {

    var costPer;

    if(req.body.size == "S"){
        costPer = 10;
    }
    if(req.body.size == "M"){
        costPer = 15;
    }
    if(req.body.size == "L"){
        costPer = 20;
    }

    var hold = costPer * req.body.quantity;

    // save a new order on mongoose or catch trying
    Order.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        type: req.body.type,
        size: req.body.size,
        quantity: req.body.quantity,
        total: hold
    }, (err, order) => {
        if (err) {
            return res.send(err).status(404)
        } else {
            res.json(order).status(201)
        }
    })
});

router.delete('/', (req, res) => {

    var id = req.params._id;

    Order.remove((err, order) => {
        if (err) {
            return res.send(err).status(404)
        }
        else {
            res.json(order).status(204)
        }
    })
});
router.delete('/:_id', (req, res) => {
    var id = req.params._id;
    Task.remove(id, (err, task) => {
        if (err) {
            return res.send(err).status(404)
        }
        else {
            res.json(task).status(204)
        }
    })
});

router.put('/:_id', (req, res) => {
    var id = req.params._id;
    Order.update(id, req.body, (err, task) => {
        if (err) {
            return res.send(err).status(404)
        }
        else {
            res.json(task).status(202)
        }
    })
})

module.exports = router
