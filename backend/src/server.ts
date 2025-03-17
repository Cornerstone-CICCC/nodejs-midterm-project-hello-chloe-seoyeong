import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cookieSession from "cookie-session";
import cors from "cors";
import pageRouter from "./routes/page.routes";
import userRoutes from "./routes/user.routes";
import gameRouter from "./routes/game.routes";
dotenv.config();

// Create server
const app = express();

// Middlewares
app.use(
  cors({
    origin: "http://localhost",
    credentials: true,
  })
);
const SIGN_KEY = process.env.COOKIE_SIGN_KEY;
const ENCRYPT_KEY = process.env.COOKIE_ENCRYPT_KEY;
if (!SIGN_KEY || !ENCRYPT_KEY) {
  throw new Error("Missing keys! 🔑");
}
app.use(
  cookieSession({
    name: "session",
    keys: [SIGN_KEY, ENCRYPT_KEY],
    maxAge: 5 * 60 * 1000,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/boardgame", gameRouter);
app.use("/user", userRoutes);
app.use("/", pageRouter);

// 404 Fallback
app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: "Page not found! ❌",
  });
});

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT} 🚀`);
});
