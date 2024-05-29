import swaggerJsdoc, { OAS3Definition } from 'swagger-jsdoc';
import schema from './type-schemas.json';

const definition: OAS3Definition = {
  openapi: '3.0.0',
  info: {
    title: 'Connect API',
    version: '0.0.1',
    description: 'This is API for connect-mobile',
  },
  security: [{
    Bearer: [],
  }],
  servers: [
    {
      url: 'http://localhost:3001',
    },
  ],
  components: {
    securitySchemes: {
      Bearer: {
        type: 'http',
        scheme: 'Bearer',
      },
    },
  },
};

export const swaggerJSDocs = () => {
  const schemas = schema.definitions;

  const options = {
    apis: ['./src/services/**/*.ts'],
    definition: {
      ...definition,
      definitions: schemas,
    },
  };

  return swaggerJsdoc(options);
};
