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
import authRoutes from "./routes/auth.routes.js";
import usersRoutes from "./routes/users.routes.js";


const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Usamos el enrutador con un prefijo
app.use('/api', gorrasRoutes);
app.use("/api", authRoutes);
app.use("/api/users", usersRoutes);

// Función para arrancar todo
async function main() {
    try {
        // Esta es la línea mágica que crea el archivo .sqlite
        await sequelize.sync(); 
        console.log('Conexión a la base de datos exitosa y modelos actualizados!');

        app.listen(PORT, () => {
            console.log('Server listening on port ' + PORT);
        });
    } catch (error) {
        console.error('Error al conectar la base de datos:', error);
    }
}

main();