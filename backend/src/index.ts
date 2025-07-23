import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import leagueRoutes from "./routes/league";
import teamRoutes from "./routes/team";
import playerRoutes from "./routes/player";
import draftRoutes from "./routes/draft";
import matchupRoutes from "./routes/matchup";
import { errorHandler } from "./middleware/errorHandler";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(errorHandler);

// MongoDB connection
const mongoUrl =
  process.env.DATABASE_URL || "mongodb://localhost:27017/fantasy";
mongoose
  .connect(mongoUrl)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Placeholder route
app.get("/", (req, res) => {
  res.send("Fantasy Sports API is running");
});

// TODO: Import and use routes
app.use("/api/auth", authRoutes);
app.use("/api/leagues", leagueRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/players", playerRoutes);
app.use("/api/draft", draftRoutes);
app.use("/api/matchups", matchupRoutes);

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Fantasy Sports Draft & Scoring Platform API",
      version: "1.0.0",
      description: "API documentation for the Fantasy Sports platform",
    },
    servers: [{ url: "http://localhost:5000" }],
  },
  apis: ["./src/routes/*.ts", "./src/models/*.ts"],
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Socket.IO setup (placeholder)
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  // TODO: Add event handlers
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
