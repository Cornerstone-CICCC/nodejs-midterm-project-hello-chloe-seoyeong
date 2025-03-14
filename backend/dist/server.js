"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
// Create server
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)({
    origin: "https://",
    credentials: true,
}));
const SIGN_KEY = process.env.COOKIE_SIGN_KEY;
const ENCRYPT_KEY = process.env.COOKIE_ENCRYPT_KEY;
if (!SIGN_KEY || !ENCRYPT_KEY) {
    throw new Error("Missing keys! 🔑");
}
app.use((0, cookie_session_1.default)({
    name: "session",
    keys: [],
    maxAge: 5 * 60 * 1000,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// 404 Fallback
app.use((req, res) => {
    res.status(404).json({
        message: "Page not found!",
    });
});
// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
