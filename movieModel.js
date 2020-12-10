import mongoose from 'mongoose'
const { Schema } = mongoose

/* 
 The third parameter to mongoose.model() identifies 'movies'
 as an existing named collection.
*/

const Movie = mongoose.model(
  'Movie',
  new Schema({
    title: String,
    rating: String,
    plot: String,
    year: Date,
    runtime: Number,
  }),
  'movies'
)

export default Movie
