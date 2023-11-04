import mongoose from "mongoose";

class MongoDbConnection {
    static async connect() {
        try {
            const DATABASE_URI = process.env.DATABASE_URI;
            await mongoose.connect(DATABASE_URI);
            console.log('Database connected successfully');
        }catch(error) {
            console.log('Error while connected to Database');
        }
    }
}

export default MongoDbConnection;