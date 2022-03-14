const express = require('express');
const cors = require('cors');
const https = require('https');
const http = require('http');

const fs = require('fs');

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
const port_s = process.env.PORT_S || 3001;
const mongodatabase = process.env.DB_CONNECTION || 'mongodb://127.0.0.1:27017/bookings';
// Listen both http & https ports
const httpServer = http.createServer(app);
const httpsServer = https.createServer({
  key: fs.readFileSync('/etc/letsencrypt/live/freiheit.f4.htw-berlin.de/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/freiheit.f4.htw-berlin.de/fullchain.pem'),
}, app);

httpServer.listen(port, () => {
    console.log(`HTTP Server running on port ${port}`);
});

httpsServer.listen(port_s, () => {
    console.log(`HTTPS Server running on port ${port_s}`);
});

// connect to mongoDB
mongoose.connect(mongodatabase, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(
        () => { console.log('connected to DB'); },
        err => { console.error.bind(console, 'connection error:') }
    );