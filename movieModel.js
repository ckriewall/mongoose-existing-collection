import mongoose from 'mongoose'
const { Schema } = mongoose

/* 
 The third parameter to mongoose.model() identifies 'movies'
 as an existing named collection.
*/

const Movie = mongoose.model('Movie', new Schema({}), 'movies')

export default Movie
