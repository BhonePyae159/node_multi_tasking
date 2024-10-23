import mysql from 'mysql2';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Setup MySQL connection
export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: process.env.DB_WAIT_FOR_CONNECTIONS === 'true', // Convert to boolean
    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT),
    queueLimit: Number(process.env.DB_QUEUE_LIMIT)
});
