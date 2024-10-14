import mongoose from 'mongoose';

const connectToDatabase = () => {
  if (mongoose.connection.readyState === 0) {
    return mongoose.connect(process.env.DATABASE_URI!);
  }
};

export default connectToDatabase;
