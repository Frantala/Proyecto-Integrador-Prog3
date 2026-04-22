// aqui ira nuestra conexion con la base de datos SQLite

import { Sequelize } from 'sequelize';

// Configuramos la base de datos SQLite
export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './gorras.db' // Aquí se guardarán todos tus datos
});