import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import pinoHttp from "pino-http";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import authRoutes from "./routes/auth";
import leagueRoutes from "./routes/league";
import teamRoutes from "./routes/team";
import playerRoutes from "./routes/player";
import draftRoutes from "./routes/draft";
import matchupRoutes from "./routes/matchup";
import { errorHandler } from "./middleware/errorHandler";
import { swaggerSpec } from "./utils/swagger";

const app = express();

// Swagger UI setup
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Security headers
app.use(helmet());

// Rate limiting
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// Logging
app.use(pinoHttp());

// CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

// JSON body parser
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Fantasy Sports API is running");
});
app.use("/api/auth", authRoutes);
app.use("/api/leagues", leagueRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/players", playerRoutes);
app.use("/api/draft", draftRoutes);
app.use("/api/matchups", matchupRoutes);

// Error handler
app.use(errorHandler);

export default app;
