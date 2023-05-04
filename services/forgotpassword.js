const User = require('../db/models/User');

exports.resetPassword = async (resetToken, newPassword) => {
  try {
    const user = await User.findOne({
      resetToken,
      resetTokenExpirationDate: { $gt: Date.now() }
    });

    if (!user) {
      throw new Error('Invalid or expired reset token');
    }

    user.password = newPassword;
    user.resetToken = undefined;
    user.resetTokenExpirationDate = undefined;
    await user.save();

    return user;
  } catch (err) {
    throw err;
  }
};