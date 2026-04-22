// este modelo gestiona la autenticacion y los trs roles obligatorios
import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {isEmail: true} //validacion de formato email
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'usuario',
        validate: {
            isIn: [['super-admin', 'admin', 'usuario']] //roles requeridos
        }
    }
});

export default User;