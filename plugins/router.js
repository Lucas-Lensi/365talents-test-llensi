import scraperRoutes from '../modules/scraper/scraper.route.js';

export default async ({ app, cors }) => {
  app.use('/scraper', cors(), scraperRoutes);

  app.use('*', (req, res) => {
    res
      .status(404)
      .send({ 'bad-request 404': 'The requested route is not implemented' });
  });
};
