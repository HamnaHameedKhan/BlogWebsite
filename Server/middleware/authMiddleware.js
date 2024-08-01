const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  const token = req.header('x-auth-token');


  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

 
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      userId: decoded.userId,
      username: decoded.username, // Extract username from the token
    };
    next();
  } catch (err) {
    console.error('Something went wrong with auth middleware', err);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;
