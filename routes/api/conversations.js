const express = require('express');
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/conversation/:conv_id", 
    /**
    * @param {express.Request} req 
    * @param {express.Response} res 
    * @param {express.NextFunction} next 
    */
    async (req, res, next) => {
        const userId = Number.parseInt(req.params.userId);
        const theUser = await prisma.users.findUnique({where : {id: userId}})
        res.json(theUser).status(200);
    }
)