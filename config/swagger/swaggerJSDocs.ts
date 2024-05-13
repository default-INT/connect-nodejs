import swaggerJsdoc, { OAS3Definition } from 'swagger-jsdoc';
import { genSwaggerSchemas } from './genSwaggerSchemas';

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

export const swaggerJSDocs = async () => {
  const schemas = await genSwaggerSchemas();

  return swaggerJsdoc({
    apis: ['./src/services/**/*.ts'],
    definition: {
      ...definition,
      schemas,
      components: {
        ...definition.components,
        schemas,
      },
    },
  });
};
