import swaggerJSDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
  openapi: "3.0.0",
  info: {
    title: "Task Management API",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3030",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer"
      },
    },
    schemas: {
      user: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
            example: "test@gmail.com"
          },
          password: {
            type: "string",
            example: "test123"
          },
        },
      },
      task: {
        type: "object",
        required: ["title", "description", "status", "deadline"],
        properties: {
          title: {
            type: "string",
            example: "Do Homework"
          },
          description: {
            type: "string",
            example: "Do my database homework"
          },
          status: {
            type: "boolean",
            example: false
          },
          deadline: {
            type: "string",
            example: "2022-07-20"
          },
          comments: {
            type: "array",
            items: {
                type: "string"
            },
            example: ["str1", "str2", "str3"]
          },
          responsible: {
            type: "string"
          },
          tags: {
            type: "array",
            items: {
                type: "string"
            },
            example: ["str1", "str2", "str3"]
          }
        },
      },
    }
  },
};

const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"],
};

export default swaggerJSDoc(swaggerOptions);