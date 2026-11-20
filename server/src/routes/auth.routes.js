import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { registerUser, loginUser } from '../controllers/auth.controller.js';

const router = Router();

// Limitador de intentos para prevenir ataques de fuerza bruta y DoS
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 15, // máximo 15 intentos por ventana
    message: { message: "Demasiados intentos desde esta IP. Intenta nuevamente en 15 minutos." },
    standardHeaders: true,
    legacyHeaders: false,
});

router.post("/register", authLimiter, registerUser);
router.post("/login", authLimiter, loginUser);

export default router;
