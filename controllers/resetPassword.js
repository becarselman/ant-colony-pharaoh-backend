const resetPasswordService = require('../services/resetPassword');
const errors = require('../configuration/errors');

exports.showResetPasswordForm = resetPasswordService.showResetPasswordForm;

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword, confirmPassword } = req.body;
  try {
    await resetPasswordService.resetPassword(token, newPassword, confirmPassword);
    res.status(200).send({ message: 'Password reset successful.' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
