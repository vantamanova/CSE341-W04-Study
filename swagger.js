const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Lesson 8 API',
    description: 'API documentation for Lesson 8 activity',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
