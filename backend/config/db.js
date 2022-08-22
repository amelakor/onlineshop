import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewurlParser: true,
    });

    console.log(connection.connection.host.green, 'connection');
  } catch (e) {
    console.error(e.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
