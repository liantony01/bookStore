const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  User.findById('5f00ac0727f6a409a70c7ffb')
  .then(user => {
    req.session.isLoggedIn = true;
    req.session.user = user;
    //  res.redirect('/');
    req.session.save(err => {
      console.log(err);
      res.redirect('/');
    })
  })
  .catch(err => console.log(err));
  
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect('/');
  })
};

