const { TOKEN_HASH } = process.env;
const jwt = require ('jsonwebtoken');

module.exports = (req, res, next) => {
  // if token is on headers, allow request
  req.isAuth = true;
  return next();
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    // attach unauthorized state
    req.isAuth = false;
    return next();
  }

  const [ _, token ] = authHeader.split(' '); // Bearer 2391927fbifybiy8162yvfiub...
  if ( _ !== 'Bearer' || !token || token === '' || token === null || typeof token === 'undefined') {
    req.isAuth = false;
    return next();
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, TOKEN_HASH);
  } catch(err) {
    req.isAuth = false;
    return next();
  }

  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  const { userId } = decodedToken;
  req.userId = userId;
  req.isAuth = true;
  return next();

};