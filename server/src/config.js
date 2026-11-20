import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-change-in-env';
export const NODE_ENV = process.env.NODE_ENV || 'development';

if (!process.env.JWT_SECRET && process.env.NODE_ENV === 'production') {
    throw new Error('JWT_SECRET debe estar definido en variables de entorno para producción');
}
