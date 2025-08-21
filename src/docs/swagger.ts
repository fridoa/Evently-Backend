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
    {
      url: "https://evently-backend-zeta.vercel.app/api/v1",
      description: "Production server",
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
      RegisterRequest: {
        fullName: "string",
        username: "string",
        email: "string",
        password: "string",
        confirmPassword: "string",
      },
      ActivationRequest: {
        code: "string",
      },
      LoginRequest: {
        identifier: "string",
        password: "string",
      },
    },
  },
};

const OutputFile = "./src/docs/swagger-output.json";
const endpointsFile = ["./src/routes/api.ts"];

swaggerAutogen({
  openapi: "3.0.0",
})(OutputFile, endpointsFile, doc);
