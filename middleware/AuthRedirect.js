function AuthRedirect(req, res, next) {
  if (!req.cookies.c_id) {
    return res.send("login first");
  }
  next();
}

export default AuthRedirect;
