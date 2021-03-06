const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB connection established successfully');
});

const userRouter = require('./routes/users');
const bookRouter = require('./routes/books');

app.use('/users', userRouter);
app.use('/books', bookRouter);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Server listening on port no ', port);
});
