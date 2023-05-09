const forgotPasswordService = require("../services/forgotPassword");
const errors = require("../configuration/errors");

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {

    const token = await forgotPasswordService.forgotPassword(email);
    console.log(token);
    res.status(200).json({ token });
  } catch (error) {
    console.error('Failed to send forgot password email:', error);
    res.status(500).send({ error: errors.FAILED_TO_SEND_EMAIL });
  }
  
};
