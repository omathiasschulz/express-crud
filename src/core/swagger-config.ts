import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Produtor Rural',
      version: '1.0.0',
      description:
        'Documentação da API para gerenciamento de produtores rurais.',
    },
  },
  apis: ['./src/modules/**/*.controller.ts'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
export default swaggerSpec;
