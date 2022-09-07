const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = 'mongodb+srv://johns:password1234@cluster0.cr9e0xj.mongodb.net/finalProject?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlparser: true, useCreateIndex: true, useUnifiedTopology: true }
);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

const attractionRouter = require('./Routes/attractions');
const contactRouter = require('./Routes/contact')
app.use('/attractions', attractionRouter);
app.use('/contact', contactRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client/build'))
    })
  }

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});