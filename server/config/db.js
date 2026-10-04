import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/netflix_clone');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // If the local database isn't running, gracefully fallback to an in-memory database
    if (error.message.includes('ECONNREFUSED') || error.message.includes('failed to connect')) {
      console.log('⚠️ Local MongoDB not found (ECONNREFUSED).');
      console.log('🚀 Starting temporary In-Memory MongoDB Server instead...');
      
      try {
        const mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        
        const conn = await mongoose.connect(mongoUri);
        console.log(`✅ In-Memory MongoDB Connected: ${conn.connection.host}`);
        console.log('⚠️ NOTE: Because this is an in-memory database, data will be lost when you stop this terminal server.');
      } catch (inMemoryError) {
         console.error(`In-Memory DB Error: ${inMemoryError.message}`);
         process.exit(1);
      }
    } else {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  }
};

export default connectDB;
