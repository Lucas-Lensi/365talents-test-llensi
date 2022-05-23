import express from 'express';
import plugins from './plugins/index.js';
import 'dotenv/config';

const startServer = async () => {
  const app = express();

  await plugins({ app });

  app.listen(process.env.PORT, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Server running on port : ${process.env.PORT}`);
  });
};

startServer();
