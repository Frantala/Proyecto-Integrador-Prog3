import { User } from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken' 


export const registerUser = async (req , res) => {
    const {name, email, password} = req.body;

    const user = await User.findOne({
        where: {
            email
        }
    });

    if (user)
        return res.status(400).send({message: "Usuario existente"});

    // hash the password

    const saltRounds = 10;

    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        role: "usuario"
    })

    res.json(newUser.id);
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({
            where: {
                email
            }
        });

        if (!user)
            return res.status(400).send({ message: "Usuario no encontrado" });

        const comparasion = await bcrypt.compare(password, user.password);

        if (!comparacion)
            return res.status(400).send({ message: "Email y/o contraseña incorrecta" });

        // extraemos el id y el role  del usuario de la base de datos
        const {id, role } = user;
        // generate token
        const secretKey = 'proyecto-2026';

        const token = jwt.sign({ id,email, role }, secretKey, { expiresIn: '1h' });

        return res.json(token);
    } catch (error) {
        res.status(500).send({ message: "Error al iniciar sesión", error });
    }
}