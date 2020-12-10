import mongoose from 'mongoose'

const uri = 'mongo_uri'

const connectDB = async () => {
  try {
    const conn = mongoose.connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    console.log('MongoDB connected')
  } catch (error) {}
}

export default connectDB
