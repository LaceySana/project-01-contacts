// REQUIRE STATEMENTS **
const express = require('express');
const app = express();
require('dotenv').config();
const mongodb = require('./database/contacts');
const contactsRoute = require('./routes/contacts');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const port = process.env.PORT || 9000;

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', require('./routes'));
app.use('/contacts', contactsRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, console.log(`Web server is listening at port ${port}`));
    }
});
