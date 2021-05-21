function AuthRedirect(req, res, next) {
  if (!req.session.user) {
    return res.send("login first");
  }
  next();
}

export default AuthRedirect;
