import mysql2 from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const connectionToDatabase = mysql2.createPool({
    host : process.env.HOST,
    user : process.env.USER,
    port : process.env.PORT,
    database : process.env.DATABASE,
    password : process.env.PASSWORD
});

export const executeQuery = async (query, parameter = []) => {
    const connection = await connectionToDatabase.getConnection();
    try {
        const [data] = await connection.execute(query, parameter);
        return data;
    } catch (error) {
        console.error('Error executing query', error.message);
        throw error;
    } finally {
        connection.release();
    }
}