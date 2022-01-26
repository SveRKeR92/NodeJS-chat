const express = require('express');
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get('/',
    /**
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @param {express.NextFunction} next 
     */
    async function (req, res, next) {


        const allUsers = await prisma.users.findMany()
        res.json(allUsers);
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