import express from 'express';
import mongoose from 'mongoose';
import router from './routes/router.mjs';
import cors from 'cors'

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors())
app.use(router);


const MONGODB_URI = "mongodb+srv://ilaymor:bJMYrepflmn0fDmC@cluster0.c1wocq5.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`server listening on port ${port}`)
    })
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });