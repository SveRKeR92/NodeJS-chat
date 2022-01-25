var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',
    /**
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {express.NextFunction} next
     */
    function(req, res, next) {
  res.json({msg: 'default route'})
});

module.exports = router;
