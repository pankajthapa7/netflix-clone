import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import authRoutes from "./routes/auth";
import moviesRouter from "./routes/movies";

dotenv.config();

const app = express();

// Enable CORS
app.use(cors());

// Enable JSON body parsing middleware (must come before routes)
app.use(express.json());

// Register routes
app.use("/api/auth", authRoutes);
app.use("/api/movies", moviesRouter);

// Health check / root route
app.get("/", (_req, res) => res.send("✅ Backend running"));

// Debug route to verify environment variables
app.get("/debug-env", (_req, res) => {
  res.json({
    port: process.env.PORT || 4000,
    tmdbKey: process.env.TMDB_API_KEY ? "✅ Loaded" : "❌ Missing",
  });
});

// Start backend server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
