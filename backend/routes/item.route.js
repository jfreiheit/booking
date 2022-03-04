const express = require('express');
const router = express.Router();

const Item = require('../models/item.model');

// post one item
router.post('/', async(req, res) => {
    console.log('booking req', req)
    const newItem = new Item({
        title: req.body.item.titel,
        amount: req.body.item.betrag,
        date: req.body.item.datum,
        user_id: req.body.item.user_id
    })
    console.log('newItem', newItem)
    await newItem.save();
    res.send(newItem);

});

// get all items for user_id
router.get('/', async(req, res) => {
    try {
        const item = await Item.find({ user_id: req.session.user_id });
        res.send(item);
    } catch {
        res.status(404);
        res.send({
            error: "User does not exist!"
        });
    }
});

// delete one item via id
router.delete('/:id', async(req, res) => {
    try {
        await Item.deleteOne({ _id: req.params.id })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "Item does not exist!" })
    }
});

module.exports = router;