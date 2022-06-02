import express from 'express';

import { scrapCompanies, scrapCompanyInformations } from './scraper.constroller.js';

const router = express.Router();

router.route('/')
.get(async (req, res) => {
  try {
    const queryParams = req.query;
    const response = await scrapCompanies(queryParams.company);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
});

router.route('/:company')
.get(async (req, res) => {
  try {
    const params = req.params;
    const response = await scrapCompanyInformations(params.company);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
});

export default router;
