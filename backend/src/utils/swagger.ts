import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Fantasy Sports Draft & Scoring Platform API",
      version: "1.0.0",
      description: "API documentation for Fantasy App",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Path to the API routes
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
// // Swagger setup
// const swaggerOptions = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Fantasy Sports Draft & Scoring Platform API",
//       version: "1.0.0",
//       description: "API documentation for the Fantasy Sports platform",
//     },
//     servers: [{ url: "http://localhost:5000" }],
//     components: {
//       securitySchemes: {
//         bearerAuth: {
//           type: "http",
//           scheme: "bearer",
//           bearerFormat: "JWT",
//         },
//       },
//     },
//     security: [{ bearerAuth: [] }],
//   },
//   apis: ["./src/routes/*.ts", "./src/models/*.ts"],
// };
// const swaggerSpec = swaggerJSDoc(swaggerOptions);
// app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
