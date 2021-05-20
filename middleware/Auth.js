import jwt from "jsonwebtoken";

function Auth(req, res, next) {
  const authHeader = req.cookies.jwt;
  console.log(authHeader);
  const token = authHeader;
  console.log(token);
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) res.sendStatus(403);
    req.user = user;
    next();
  });
}

export default Auth;
