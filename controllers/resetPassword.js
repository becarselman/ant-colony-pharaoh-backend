const resetPasswordService = require('../services/resetPassword');
const errors = require('../configuration/errors');

exports.resetPassword = async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const { newPassword } = req.body;
  
  try {
    const message = await resetPasswordService.resetPassword(token, newPassword);
    res.status(200).send({ message });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
