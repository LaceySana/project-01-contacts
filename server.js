// REQUIRE STATEMENTS **
const express = require('express');
const app = express();
require('dotenv').config();
const mongodb = require('./database/contacts');
const bodyParser = require('body-parser');

const port = process.env.PORT || 9000;

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});
app.use('/', require('./routes'));

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, console.log(`Web server is listening at port ${port}`));
    }
});
