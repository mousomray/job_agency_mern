const jwt = require('jsonwebtoken'); // For Token
const bcrypt = require('bcryptjs'); // For Password Hashing

// Compare password function
const comparePassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
};

// Fit token in API header
const EmployerAuth = async (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["x-access-employer-token"];
  if (!token) {
    return res.status(403).send({ message: "A token is required for authentication" });
  }
  try {
    const decoded = jwt.verify(token, process.env.EMPLOYER_API_KEY);
    req.user = decoded;
    console.log('Decord user for employer pannel...', req.user);
  } catch (err) {
    return res.status(401).send({ messaage: "Invalid Token" });
  }
  return next();
}

module.exports = { comparePassword, EmployerAuth };