module.exports = function shoppingController(router) {

  router.get('/items',(req,res) => {
    res.send("Success")
  })
}