const express = require('express');
const router = express.Router();

/* GET login page. */

router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    res.json({msg: 'login Form'});
  });

/* POST subscription data. */

router.post('/login', function(req, res, next){
    // traitmant
    // ...
    // ...
})



module.exports = router;