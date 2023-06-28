function validateToken(token) {
    const validToken = 'valid_token';
    const tokenExpired = false;
  
    if (token === validToken && !tokenExpired) {
      return true;
    } else {
      return false;
    }
  }
  
  module.exports = {
    validateToken
  };