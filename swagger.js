const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts API',
        description: 'Read, store, edit, or delete contact information.'
    },
    host: 'localhost:9000',
    produces: ['application/json']
};

const outputFile = './swagger.json';
const routes = ['server.js'];

swaggerAutogen(outputFile, routes, doc);
