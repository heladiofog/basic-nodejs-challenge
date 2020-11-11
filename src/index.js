import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
// App middleware
import cors from 'cors';
// Routes
import cakeRoutes from './routes/cakes';
// Utils & vars
const PORT = process.env.PORT || 3000;

// App init & setting
const app = express();
app.use(cors());

// mongoose connection
// Setup default connection for mongoose
const dbName = process.env.dbName || 'wzl-cakes';
const mongoDBUri = `mongodb://localhost/${dbName}`;
const mongoDBOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  poolSize: 4,
};
mongoose.Promise = global.Promise;
// mongoose connection
mongoose.connect(mongoDBUri, mongoDBOptions);
// Get the default connection
const db = mongoose.connection;
db.on('connected', console.log.bind(console, 'MongoDB connection success!'));
db.on('error', console.error.bind(console, 'MongoDB connection error!'));

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to THE Cakes Shop!');
});
// Cake Routes
cakeRoutes(app);

app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}...`);
});
