import express from 'express';
import { PORT } from './config.js';
import cors from 'cors';
import { sequelize } from './database/db.js';

// importacion de los modelos para que Sequalize los reconozca y cree las tablas
import {User} from './models/User.js';
import {Product} from './models/Product.js';
import {Order} from './models/Order.js';

const app = express();

app.listen(PORT);
console.log('Server listening on port ' + PORT);