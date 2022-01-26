const express = require('express');
const router = express.Router();

router.get('/',
    /**
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @param {express.NextFunction} next 
     */
    function (req, res, next) {
        res.json({
            count: 15,
            users: [{
                    id: 1,
                    name: 'Crewmate',
                    isConnected: true
                },
                {
                    id: 2,
                    name: 'Amogus',
                    isConnected: false
                }
            ]
        })
    });

router.get('/:userId',
    /**
     * @param {express.Request<{userId: string}>} req 
     * @param {express.Response} res 
     * @param {express.NextFunction} next 
     */
    (req, res, next) => {
        const userId = Number.parseInt(req.params.userId);
        res.json({userId}).status(200);
    });

router.post('/:userId',
    /**
     * @param {express.Request<{userId: string}>} req 
     * @param {express.Response} res 
     * @param {express.NextFunction} next 
     */
    (req, res, next) => {
        res.json(req.params.userId).status(200);
    });

module.exports = router;