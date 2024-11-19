import swaggerJsdoc from 'swagger-jsdoc';
import CreateProdutorSchema from './schemas/create-produtor.schema.json';
import UpdateProdutorSchema from './schemas/update-produtor.schema.json';
import ProdutorSchema from './schemas/produtor.schema.json';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Produtor Rural',
      version: '1.0.0',
      description:
        'Documentação da API para gerenciamento de produtores rurais.',
    },
    components: {
      schemas: {
        CreateProdutorSchema,
        UpdateProdutorSchema,
        ProdutorSchema,
      },
    },
  },
  apis: ['./src/modules/**/*.controller.ts'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
export default swaggerSpec;
