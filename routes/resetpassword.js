const express = require('express');
const router = express.Router();
const { resetPassword } = require('../services/forgotpassword');

router.patch('/:resetToken', async (req, res, next) => {
  try {
    const { resetToken } = req.params;
    const { password, passwordConfirm } = req.body;

    if (!password || !passwordConfirm || password !== passwordConfirm) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const user = await resetPassword(resetToken, password);

    res.status(200).json({ message: 'Password reset successful', user });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
