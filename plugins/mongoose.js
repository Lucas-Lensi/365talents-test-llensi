import mongoose from 'mongoose';

export default async () => {
  const settings = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  // Get the default connection
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  // Bind connection to error event (to get notification of connection errors)
  mongoose.connect(process.env.MONGODB_URI, settings, (err, dbref) => {
    if (!err) {
      console.log('Mongodb connected');
      db = dbref;
    } else {
      console.log(`Error while connecting to mongoDB${err}`);
    }
  });

  // Get Mongoose to use the global promise library
  mongoose.Promise = global.Promise;
};
