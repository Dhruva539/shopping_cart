const shoppingRouter= require('./router/shoppingRouter');
const authApi=require('./auth/api');

module.exports = {
  init : function(app) {
    app.use('/api/shoppingcart',authApi);
    app.use('/shopping-cart',shoppingRouter);
  }
};