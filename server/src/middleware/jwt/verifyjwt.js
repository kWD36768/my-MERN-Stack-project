
const jwt = require("jsonwebtoken")

const verifyjwt = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).json({ message: "no token provided" });
  }

  const token = auth.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "no token provided" });
  }

  jwt.verify(token, process.env.JWT_KEY, (error, decode) => {
    if (error) {
      console.log(error);
      return res.status(401).json({ message: "invalid token" });
    }

    req.decode = decode;

    console.log("hello middleware");
    console.log(req.headers.authorization);
console.log(token);
console.log(process.env.STRIPE_SECRET_KEY);

    next(); // ✅ yahan hona chahiye
  });
};
module.exports = verifyjwt ;