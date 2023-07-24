const express = require('express')
const mongoose = require("mongoose");
var cors = require('cors')
const app = express();
const port = 4000;
const songsRoutes = require('./routes/songs');

app.use(express.json());
app.use(cors())

app.use(songsRoutes);

const MONGODB_URI = "mongodb+srv://ilaymor:SFj2ZgNpcJmTbSWW@cluster0.c1wocq5.mongodb.net/?retryWrites=true&w=majority";

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
