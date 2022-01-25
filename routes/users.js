var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/',
    /**
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {express.NextFunction} next
     */
    function(req, res, next) {
  res.status(200).json({msg: 'hello world'})
});

module.exports = router;
