import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import MongoDbConnection from './config/db/connection.js';
import FirebaseConnection from './config/firebase/connection.js';
import router from './routes/router.js';


const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

//* Using Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api', router);

app.listen(PORT, () => {
    MongoDbConnection.connect();
    FirebaseConnection.connect();
    console.log(`Server is listning at http://localhost:${PORT}`);
});