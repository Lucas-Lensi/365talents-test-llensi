import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';

import routeurLoader from './router.js';

export default async ({ app }) => {
  app.use(cors());
  app.use(
    morgan('combined', {
      skip(req, res) {
        return res.statusCode < 400;
      },
    })
  );
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  await routeurLoader({ app, cors });

  app.get('*', (req, res) => {
    res
      .status(404)
      .send({ 'bad-request 404': 'The requested route is not implemented' });
  });

  return app;
};
