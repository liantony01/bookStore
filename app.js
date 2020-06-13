const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
// models


//
 const adminRoutes = require('./routes/admin');
 const shopRoutes = require('./routes/shop');
// const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('5ee564c009009c0ec47517b8')
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

 app.use('/admin', adminRoutes);
 app.use(shopRoutes);
// app.use(authRoutes);

app.use(errorController.get404);
// associations
// BelongsTo associations are associations where the foreign key for the one-to-one relation exists on the source model.


mongoConnect(() => {
  app.listen(3000);
})