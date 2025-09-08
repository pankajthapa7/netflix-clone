// backend/src/routes/movies.ts
import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// ✅ Middleware to verify token
function authenticateToken(req: Request, res: Response, next: Function) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid or expired token" });
    (req as any).user = user; // attach decoded user info to request
    next();
  });
}

// ✅ Protected GET /api/movies
router.get("/", authenticateToken, async (req: Request, res: Response) => {
  try {
    const movies = await prisma.movie.findMany();
    res.json(movies);
  } catch (error) {
    console.error("❌ Failed to fetch movies:", error);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});

export default router;
