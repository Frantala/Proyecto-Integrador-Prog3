import express from 'express';
import { PORT } from './config.js';
import cors from 'cors';
import { sequelize } from './database/db.js';

// importacion de los modelos para que Sequalize los reconozca y cree las tablas
import { User } from './models/User.js';
import Product from './models/Product.js';
import Order from './models/Order.js';

// importacion de las rutas 
import gorrasRoutes from "./routes/gorras.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Usamos el enrutador con un prefijo
app.use('/api', gorrasRoutes);


// Función para arrancar todo
async function main() {
    try {
        // Esta es la línea mágica que crea el archivo .sqlite
        await sequelize.sync({ alter: true }); 
        console.log('Conexión a la base de datos exitosa y modelos actualizados!');

        app.listen(PORT, () => {
            console.log('Server listening on port ' + PORT);
        });
    } catch (error) {
        console.error('Error al conectar la base de datos:', error);
    }
}

main();