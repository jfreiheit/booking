const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user.model');

// get all users
router.get('/', async(req, res) => {
    const allUsers = await User.find();
    console.log(allUsers);
    res.send(allUsers);
});

// post one user
router.post('/', async(req, res) => {
    const saltRounds = 10;
    let pwHash = '';
    await bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (errHash, hash) => {
            pwHash = hash;
            const newUser = new User({
                account: req.body.account,
                password: pwHash
            });
            console.log('newUser', newUser);
            newUser.save();
            res.send(newUser);
        });
    });

});

// get one user via account and password
router.post('/login/:account', async(req, res) => {
    try {
        const user = await User.findOne({ account: req.params.account });
        let sendPw = req.body.password;
        let userPW = user.password;
        bcrypt.compare(sendPw, userPW, (err, result) => {
            if (result) {
                console.log('Passwort korekt!');
                res.send(user);
            } else {
                console.log('falsches Passwort!');
                res.status(403);
                res.send({
                    error: "Wrong password!"
                });
            }
        });
    } catch {
        res.status(404);
        res.send({
            error: "User does not exist!"
        });
    }
});

// get one user via account
router.get('/:account', async(req, res) => {
    try {
        const user = await User.findOne({ account: req.params.account });

        console.log(req.params);
        res.send(user._id);
    } catch {
        res.status(404);
        res.send({
            error: "User does not exist!"
        });
    }
});

module.exports = router;