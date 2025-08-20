import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Evently API",
    description: "API documentation for Evently, a platform for event management.",
  },
  servers: [
    {
      url: "http://localhost:8000/api/v1",
      description: "Local server",
    },
  ],

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
    schemas: {
      LoginRequest: {
        identifier: "fridoa",
        password: "123456",
      },
    },
  },
};

const OutputFile = "./swagger-output.json";
const endpointsFile = ["./src/routes/api.ts"];

swaggerAutogen({
  openapi: "3.0.0",
})(OutputFile, endpointsFile, doc);
