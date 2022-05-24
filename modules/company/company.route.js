import express from 'express';

import { getCompanies } from './company.constroller.js';

const router = express.Router();

router.route('/').get(async (req, res) => {
  try {
    const params = req.query;
    const response = await getCompanies(params);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
});

export default router;
