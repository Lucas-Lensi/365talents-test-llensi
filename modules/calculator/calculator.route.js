import express from 'express';

import { addVar } from './calculator.service.js';

const router = express.Router();

router.route('/').post(async (req, res) => {
  try {
    const { a, b } = req.body;
    const response = await addVar(a, b);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
});

export default router;
