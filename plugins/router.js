import companyRoutes from '../modules/company/company.route.js';

export default async ({ app, cors }) => {
  app.use('/company', cors(), companyRoutes);

  app.use('*', (req, res) => {
    res
      .status(404)
      .send({ 'bad-request 404': 'The requested route is not implemented' });
  });
};
