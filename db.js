import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const conn = mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    console.log('MongoDB connected')
  } catch (error) {}
}

export default connectDB
