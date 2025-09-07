import { Router } from "express";
const router = Router();

// Example route
router.get("/", (req, res) => {
  res.json({ message: "Watchlist route working!" });
});

export default router;
