import { User } from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../config.js";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validación de campos requeridos
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Nombre, email y contraseña son obligatorios." });
        }

        if (typeof name !== 'string' || name.trim().length < 3) {
            return res.status(400).json({ message: "El nombre debe tener al menos 3 caracteres." });
        }

        if (typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
            return res.status(400).json({ message: "El formato de email no es válido." });
        }

        if (typeof password !== 'string' || password.length < 6) {
            return res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres." });
        }

        const normalizedEmail = email.trim().toLowerCase();

        // Verificar si el usuario ya existe
        const userExists = await User.findOne({
            where: { email: normalizedEmail }
        });

        if (userExists) {
            return res.status(400).json({ message: "El correo electrónico ya se encuentra registrado." });
        }

        // Hasheo seguro de la contraseña
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword,
            role: "usuario"
        });

        return res.status(201).json({ 
            message: "Usuario registrado exitosamente.",
            userId: newUser.id 
        });
    } catch (error) {
        console.error("Error en registerUser:", error);
        return res.status(500).json({ message: "Error interno al registrar el usuario." });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email y contraseña son obligatorios." });
    }

    try {
        const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
        const user = await User.findOne({
            where: { email: normalizedEmail }
        });

        // Mensaje unificado para evitar enumeración de usuarios
        if (!user) {
            return res.status(401).json({ message: "Email y/o contraseña incorrectos" });
        }

        const comparacion = await bcrypt.compare(password, user.password);

        if (!comparacion) {
            return res.status(401).json({ message: "Email y/o contraseña incorrectos" });
        }

        const { id, role } = user;
        const token = jwt.sign({ id, email: user.email, role }, JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ 
            message: "Login exitoso",
            token: token,
            user: { id, email: user.email, role, name: user.name }
        });

    } catch (error) {
        console.error("Error en loginUser:", error);
        return res.status(500).json({ message: "Error interno al iniciar sesión." });
    }
};
