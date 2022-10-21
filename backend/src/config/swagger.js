const swaggerUI = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.1",
    info: {
      version: "1.0.0",
      title: "8LOGGING API DOCS",
      description: "팔로깅 API 문서입니다.",
    },
    servers: [
      {
        url: "http://kdt-ai5-team08.elicecoding.com:3002/api",
        description: "",
      },
    ],
  },
  apis: [__dirname + '/../../public/apiDocs/*.yaml'],
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUI,
  specs,
};
