import express from 'express';
import dotenv from 'dotenv';
import MongoDbConnection from './db/connection.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    MongoDbConnection.connect();
    console.log(`Server is listning at http://localhost:${PORT}`);
});