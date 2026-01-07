import path from "path";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJsdoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "GNTech API",
      version: "1.0.0",
      description: "API para consulta do clima, integrada com Redis e Postgres",
      contact: {
        name: "Mateus Silva",
        email: "mateushls01@gmail.com",
        url: "https://github.com/mateushlsilva",
      },
    },

    components: {
      schemas: {
        Climate: {
          type: "object",
          properties: {
            // id: { type: "string", example: "uuid" },
            temp_c: { type: "number", example: 26.3 },
            humidity: { type: "number", example: 54 },
            cloud: { type: "number", example: 75 },
            feelslike_c: { type: "number", example: 28.2 },
            pressure_mb: { type: "number", example: 1018 },
            precip_mm: { type: "number", example: 0.9 },
            uv: { type: "number", example: 1.4 },
            wind_degree: { type: "number", example: 131 },
            wind_kph: { type: "number", example: 9.4 },
            condition_code: { type: "number", example: 1003 },
            condition_text: { type: "string", example: "Partly cloudy" },
            last_updated: {
              type: "string",
              example: "2026-01-06 15:00",
            },
            city: {
              type: "object",
              properties: {
                // id: { type: "string", example: "uuid" },
                name: { type: "string", example: "London" },
                country: { type: "string", example: "United Kingdom" },
              },
            },
          },
        },

        ClimatePagination: {
          type: "object",
          properties: {
            climate: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Climate",
              },
            },
            total: { type: "number", example: 100 },
            page: { type: "number", example: 1 },
            limit: { type: "number", example: 10 },
          },
        },
      },
    },
  },
  apis: [path.join(__dirname, "../routes/*.ts")], 
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}