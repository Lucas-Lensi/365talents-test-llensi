import calculatorRoutes from '../modules/calculator/calculator.route.js';

export default async ({ app, cors }) => {
  app.use('/calculator', cors(), calculatorRoutes);

  app.use('*', (req, res) => {
    res
      .status(404)
      .send({ 'bad-request 404': 'The requested route is not implemented' });
  });
};
