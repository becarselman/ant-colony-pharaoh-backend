const tokenService = require('../services/validateToken');

function validateToken(req, res) {
  const { token } = req.body;
  const isValid = tokenService.validateToken(token);

  if (isValid) {
    res.status(200).json({ valid: true });
  } else {
    res.status(400).json({ valid: false });
  }
}

module.exports = {
  validateToken,
};
