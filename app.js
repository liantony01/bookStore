const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const errorController = require('./controllers/error');
//const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const MONGODB_URI =  'mongodb+srv://liantony:XG6sWqbGIDJGzpaI@cluster0-hlsti.mongodb.net/shop';

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: ' sessions'
});

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const { collection } = require('./models/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({ 
    secret: 'my secret', 
    resave: false, 
    saveUninitialized: false,
    store: store, 
  }))

// make user cookies persist in a user odjet   
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    MONGODB_URI
  )
  .then(result => {
    User.findOne().then( user => {
      if (!user) {
         const user = new User ({
            name: 'liantony',
            email: 'test@gmail.com',
            cart: {
              items: []
            }
          });
          user.save();
      }
    })
    app.listen(3000);
  })
  .catch(err => {
    console.log(err); 
  });

 