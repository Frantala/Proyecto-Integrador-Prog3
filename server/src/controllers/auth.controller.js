import { User } from "../models/User.js";
import bcrypt from 'bcrypt';


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

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid)
            return res.status(400).send({ message: "Contraseña incorrecta" });

        res.json({
            id: user.id,
            name: user.name,
            email: user.email
        });
    } catch (error) {
        res.status(500).send({ message: "Error al iniciar sesión", error });
    }
}