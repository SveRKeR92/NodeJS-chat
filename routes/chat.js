const express = require('express');
const router = express.Router();


/* GET chat page. */
router.get('/', function(req, res, next) {
    res.json({msg: 'Chat page'});
  });

/* GET last messages. */  
router.get('/last-messages', function(req, res, next) {
    // traitment
    // ...
    // ...
    res.json({msg: 'Last messages'});
})


/* POST Message */
router.post('/post-message', function(req, res, next){
    // traitment
    // ...
    // ...

    res.json({msg: 'message sent'});
})

/* DELETE messages */

router.post('/delete-message', function(req, res, next){
    // traitmant
    // ...
    // ...

    res.json({msg: 'message deleted'});
})



module.exports = router;