import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";
import {User} from "./User.js";

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    //guardamos los nombres de las gorras elegidas como texto
    detalleProductos: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        defaultValue: 'pendiente', // Estados: pendiente, pagado, enviado
        validate: {
            isIn: [['pendiente', 'pagado', 'enviado']]
        }
    },
    fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

// Definicion de la relacion (Agregacion)
// Un usurio tiene muchos Pedidos. Sequalize añade la FK 'UserId' automaticamente
User.hasMany(Order, {foreignKey: 'userId'});
Order.belongsTo(User, {foreignKey: 'userId'});

export default Order;