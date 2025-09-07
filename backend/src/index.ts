process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";

import authRoutes from "./routes/auth";
import moviesRouter from "./routes/movies";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/movies", moviesRouter);

app.get("/", (_req, res) => res.send("✅ Backend running"));

// Debug route to check env vars
app.get("/debug-env", (_req, res) => {
  res.json({
    port: process.env.PORT || 4000,
    tmdbKey: process.env.TMDB_API_KEY ? "✅ Loaded" : "❌ Missing",
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
