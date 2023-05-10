const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userRepository = require('../repositories/user');
const errors = require('../configuration/errors');

async function showResetPasswordForm(req, res) {
  const token = req.params.token;
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userRepository.getUserById(decodedToken.userId);

    if (!user) {
      return res.status(404).send(errors.USER_NOT_FOUND);
    }
    res.render('resetPassword', { token });
  } catch (error) {
    return res.status(400).send(errors.INVALID_TOKEN);
  }
}

async function resetPassword(token, newPassword, confirmPassword) {
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const user = await userRepository.getUserById(decodedToken.userId);

  if (!user) {
    throw new Error(errors.USER_NOT_FOUND);
  }
  if (decodedToken.exp < Date.now() / 1000) {
    throw new Error(errors.TOKEN_EXPIRED);
  }
  if (newPassword !== confirmPassword) {
    throw new Error(errors.PASSWORDS_DO_NOT_MATCH);
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  await userRepository.updateUserPassword(user._id, hashedPassword);
}

module.exports = {
  showResetPasswordForm,
  resetPassword,
};
