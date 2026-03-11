// REQUIRE STATEMENTS **
const express = require('express');
const app = express();
require('dotenv').config();
const mongodb = require('./database/contacts');
const contactsRoute = require('./routes/contacts');

const port = process.env.PORT || 9000;

app.use('/', require('./routes'));
app.use('/contacts', contactsRoute);

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, console.log(`Web server is listening at port ${port}`));
    }
});
