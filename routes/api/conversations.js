const express = require('express');
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/conversation/:convId", 
    /**
    * @param {express.Request} req 
    * @param {express.Response} res 
    * @param {express.NextFunction} next 
    */
    async (req, res, next) => {
        const convId = Number.parseInt(req.params.convId);
        const theConversation = await prisma.conversations.findUnique({where : {id: convId}})
        res.json(theConversation).status(200);
    }
)