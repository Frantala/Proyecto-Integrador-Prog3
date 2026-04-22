import { DataTypes } from "sequelize";
import { sequelize } from "../database/db";

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    marca: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {min: 0} //validacion: precio no negativo
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    imagenUrl: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

export default Product;