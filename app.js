const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
// models
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const orderItem =require('./models/order-items');

//
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findByPk(1)
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
app.use(authRoutes);

app.use(errorController.get404);
// associations
// BelongsTo associations are associations where the foreign key for the one-to-one relation exists on the source model.

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: orderItem })

sequelize
//  froce : true is only left in the development environment !!!!
   .sync({force: true})
  // .sync({ force: true }) // reset all the information insede the db 
  //.sync() // sync new infromation to db Mysql
  .then(result =>
    User.findByPk(1),
    // console.log(result);
  )
  .then((user) => {
    if (!user) {
      return User.create({ name: 'liantony', email: 'test@test.com' });
    }
    return user;
  })
  .then(user =>
    // console.log(user);
    user.createCart(),)
  .then((cart) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });//
