# Mongoose Existing Collection

Spinning up a new collection is easy with Mongoose. We simply create a Model, and Mongoose generates the collection. But, what if our app needs to connect to an existing Mongo collection?

This project connects Mongoose to a collection called 'movies' from the [Sample MFlix Dataset](https://docs.atlas.mongodb.com/sample-data/sample-mflix).

## TL;DR

- Q: I have data in a Mongo collection. How can I connect Mongoose to that existing data?
- A: Use the third parameter of `mongoose.model` to identify the populated collection.

  `const Movie = mongoose.model('Movie', new Schema({}), 'movies')`

## Do This First

- Install the the [Sample MFlix Dataset](https://docs.atlas.mongodb.com/sample-data/sample-mflix).
- Document your [Mongo Connection String](https://docs.mongodb.com/manual/reference/connection-string/).

## Build the Web App

1. Create a new project directory called `mongoose-existing-collection`.

1. In `mongoose-existing-collection` create the project files.

   - `app.js`: run Express server
   - `db.js`: connect Mongoose to Mongo Atlas
   - `.env`: store the Mongo connection string
   - `movieModel.js`: point to an existing collection

   You can create the required files with a single line of code.

   `$ touch app.js db.js .env movieModel.js`

1. Initialize npm

   `$ npm init`

1. Install required packages

   `$ npm i express dotenv mongoose nodemon`

1. Enable ES6 modules support.

   In `package.json`, add `"type": "module"`

   ```js
   "description": "",
   "main": "app.js",
   "type": "module",
   ```

1. Store your Mongo Connection String.

   In `.env`, add your [Mongo Connection String](https://docs.mongodb.com/manual/reference/connection-string/).

   `MONGO_URI = 'mongodb+srv://CONN_STRING'`

1. Configure a Mongoose connection.

   In `db.js` add the following.

   ```js
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
   ```

1. Point to an existing Mongo collection.

   In `movieModel.js`, define the Schema and compile it into a Model. The new model points to an existing collection called `movies`.

   ```js
   import mongoose from 'mongoose'
   const { Schema } = mongoose

   /* 
    The third parameter to mongoose.model() identifies 'movies'
    as an existing collection.
    */

   const Movie = mongoose.model('Movie', new Schema({}), 'movies')

   export default Movie
   ```

1. Configure Express.

   In `app.js` listen for connections and respond to GET `/`.

   ```js
   import express from 'express'
   import connectDB from './db.js'
   import dotenv from 'dotenv'
   import Movie from './movieModel.js'

   dotenv.config()

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
   ```

1. Start the server with `$ nodemon app`. You should see confirmation that the server and database are online.

   ```lang-bash
    $ nodemon app
    [nodemon] 2.0.6
    [nodemon] to restart at any time, enter `rs`
    [nodemon] watching path(s): *.*
    [nodemon] watching extensions: js,mjs,json
    [nodemon] starting `node app.js`
    MongoDB connected
    Server is online on port 5000
   ```

1. Test the database connection.

   Navigate to `http://localhost:5000`. The browser will return a JSON object containing information about movies titled 'Batman'.
