import express from 'express'
import connectDB from './db.js'
import Movie from './movieModel.js'

const app = express()
const port = 5000

connectDB()

app.get('/', async (req, res) => {
  try {
    const data = await Movie.find({ title: 'Batman' }).limit(5)
    res.json(data)
  } catch (error) {
    console.log(error)
  }
})

app.listen(port, () => {
  console.log('Server is online on port ' + port)
})
