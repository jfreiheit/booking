const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
require('dotenv').config();

// Routes to Handle Request
const userRoute = require('./routes/user.route');
const itemRoute = require('./routes/item.route');

// Setup Express.js and Cors
const app = express();
app.use(express.json());
app.use(cors());

app.use(session({
    secret: 'key that will sign the cookie',
    resave: false,
    saveUninitialized: false
}));

// API Routes
app.use('/user', userRoute);
app.use('/item', itemRoute);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log('Connected to port ' + port)
})

// connect to mongoDB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(
        () => { console.log('connected to DB'); },
        err => { console.error.bind(console, 'connection error:') }
    );