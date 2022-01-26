const express = require('express');
const router = express.Router();

const usersRouter = require('./users');
const loginRouter = require('./login');
const subscriptionRouter = require('./subscription');
const chatRouter = require('./chat');

/* GET home page. */
router.get('/',
    /**
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {express.NextFunction} next
     */
    function (req, res, next) {
        res.json({
            msg: 'default route'
        });
    });

router.use('/users', usersRouter);
router.use('/login', loginRouter);
router.use('/subscription', subscriptionRouter);
router.use('/chat', chatRouter);

module.exports = router;