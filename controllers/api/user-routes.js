const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../models');

router.get('/login', async (req, res)=>{
    res.status(200).render('login')

})

router.get('/register', async (req, res)=>{
  res.status(200).render('register')

})


router.post('/register', (req, res, next) => {
  console.log('retistered route hit', req.body)
  User.findOne({where:{username: req.body.username}})
  .then(user => {
      if (user) {
          const err = new Error(`User ${req.body.username} already exists!`);
          err.status = 403;
          return next(err);
      } else {
          User.create(req.body)
          .then(user => {
              req.session.user = 'authenticated';
              req.session.userId = user.id
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.redirect('/');
          })
          .catch(err => next(err.message));
      }
  })
  .catch(err => next(err.message));
});

router.post('/login', (req, res, next) => {
  if(!req.session.user) {
    const username = req.body.username
    const password = req.body.password
      User.findOne({where: { username: username}})
      .then(async (user) => {
          if (!user) {
              const err = new Error(`User ${username} does not exist!`);
              err.status = 403;
              return next(err);
          } else {
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            console.log(isPasswordCorrect)
            if (!isPasswordCorrect) {
              const err = new Error('Your password is incorrect!');
              err.status = 403;
              return next(err); 
            }
          } 
          if (user.username === username) {
              req.session.user = 'authenticated';
              req.session.userId = user.id
              res.statusCode = 200;
              res.setHeader('Content-Type', 'text/plain');
              res.redirect('/posts')
          }
      })
      .catch(err => next(err));
  } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('You are already authenticated!');
  }
});

router.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  } else {
    const err = new Error('You are not logged in!');
    err.status = 403;
    return next(err);
  }
});

module.exports = router;