const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs")

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get('/',
    /**
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @param {express.NextFunction} next 
     */
    async (req, res, next) => {


        const allUsers = await prisma.users.findMany()
        res.json(allUsers);
    });

router.get('/:userId',
    /**
     * @param {express.Request<{userId: string}>} req 
     * @param {express.Response} res 
     * @param {express.NextFunction} next 
     */
    async (req, res, next) => {
        const userId = Number.parseInt(req.params.userId);
        const theUser = await prisma.users.findUnique({where: {id: userId}})
        res.json({theUser}).status(200);
    });

router.post('/:userId',
    /**
     * @param {express.Request<{userId: string}>} req 
     * @param {express.Response} res 
     * @param {express.NextFunction} next 
     */
    async (req, res, next) => {
        res.json(req.params.userId).status(200);
    });

router.get('/create',
    /**
     * @param {express.Request<{userId: string}>} req 
     * @param {express.Response} res 
     * @param {express.NextFunction} next 
     */
    async (req, res, next) => {
    const createUser = await prisma.users.create({
            data: {
                id: 2,
                username: "MAXIME A TORD 11.6%",
                email: "CHCICHA@KALOUD.COM",
                password:("Bebou"),
            }
        })
        res.json({createUser}).status(200);
    });

module.exports = router;