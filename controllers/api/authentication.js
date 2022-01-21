module.exports = function auth (req, res, next) {
  if (!req.session.user) {
    console.log('form top', req.session)
    const err = new Error('You are not authenticated!');
    err.status = 401;
    return next(err);
  } else {
    if (req.session.user === 'authenticated') {
      return next();
    } else {
      console.log('form down')
      const err = new Error('You are not authenticated!');
      err.status = 401;
      return next(err);
    }
  }
}