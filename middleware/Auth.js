import jwt from "jsonwebtoken";

function Auth(req, res, next) {
  const token = req.header("accessToken");
  if (!token) {
    return res.sendStatus(401).send("access denied");
  }
  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.sendStatus(400).send("Invalid Token");
  }
}

export default Auth;
