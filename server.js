// REQUIRE STATEMENTS **
const express = require('express');
const app = express();

const port = process.env.PORT || 9000;

app.use('/', require('./routes'));

app.listen(port, () => console.log(`Web server listening at ${port}`));