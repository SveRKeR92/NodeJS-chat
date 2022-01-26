const express = require('express');
const router = express.Router();

/* GET subscription page. */

router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    res.json({msg: 'Subscription Form'});
  });

/* POST subscription data. */

router.post('/subscription', function(req, res, next){
    // traitment
    // ...
    // ...
})


module.exports = router;