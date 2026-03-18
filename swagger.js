const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts API',
        description: 'Read, store, edit, or delete contact information.'
    },
    host: 'project-01-contacts.onrender.com',
    schemes: ['https']
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);
