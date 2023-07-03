const tokenService = require('../services/validateToken');

async function validateToken(req, res) {
  const { token } = req.body;
  const isValid = await tokenService.validateToken(token); 

  res.status(isValid ? 200 : 400).json({ valid: isValid });
}

module.exports = {
  validateToken,
};
