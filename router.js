const express = require('express');
const router = express.Router();
const googleSheet = require('./googleSheets');


//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// Define the user route
router
.get('/user', function(req, res) {
  googleSheet.getUsers((result) => {
    res.send(result);
  });
})
.post('/user/validate', (req, res) =>{
  googleSheet.validateUser((result) => {
    res.send(result);
  }, req.body.name, req.body.pwd);
})
.post('/user/add', (req, res) =>{
  googleSheet.addUser((result) => {
    res.send(result);
  }, req.body);
})
.delete('/user/:name', (req, res) => {
  googleSheet.deleteUser((result) => {
    res.send(result);
  }, req.params.name);
});


// Define the about route
router.get('/items', function(req, res) {
  googleSheet.getItems((result) => {
    res.send(result);
  });
});

module.exports = router;