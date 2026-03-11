const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts API',
        description: 'Read, store, edit, or delete contact information.'
    },
    host: 'localhost:9000'
};

const outputFile = './swagger-output.json';
const routes = ['server.js'];

swaggerAutogen(outputFile, routes, doc);
