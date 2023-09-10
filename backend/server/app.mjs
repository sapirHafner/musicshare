import express from 'express';
import mongoose from 'mongoose';
import router from './routes/router.mjs';
import cors from 'cors'
import { populateDatabase } from './populateDatabase.mjs';

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors())
app.use(router);


const MONGODB_URI = "mongodb://127.0.0.1:27017";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`server listening on port ${port}`)
      populateDatabase();
    })
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
