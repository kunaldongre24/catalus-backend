import jwt from "jsonwebtoken";

function Auth(req, res, next) {
  const token = req.header("accessToken");
  if (!token) {
    return res.sendStatus(401);
  }
  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.send(err);
  }
}

export default Auth;
