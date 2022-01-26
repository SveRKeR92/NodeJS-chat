const express = require('express');
const router = express.Router();

const {PrismaClient} = require('@prisma/client');

const client = new PrismaClient()

/* GET All User */

router.get('/',
    /**
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @param {express.NextFunction} next 
     */
    async (req, res, next) => {
        res.json({
            count: await client.users.count(),
            users: [await client.users.findMany()]
        })
    });


/* GET One User */

router.get('/:userId',
    /**
     * @param {express.Request<{userId: string}>} req 
     * @param {express.Response} res 
     * @param {express.NextFunction} next 
     */
    async (req, res, next) => {
        const userId = Number.parseInt(req.params.userId);
        const user = await client.users.findUnique({
            where: {
                id: userId,
            },
        }).catch((e) => {
            res.json({msg: 'Error :'+e.msg+' !', user : null}).status(e.status);
            throw e
        }).finally(async () => {
            await client.$disconnect()
        })

        res.json({user}).status(200);
    });


/* POST User */

router.post('/',
    /**
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @param {express.NextFunction} next 
     */
    async (req, res, next) => {
        const userData = req.fields;
        const newUser = await client.users.create({
            data: {
                username: userData.username,
                email: userData.email,
                password: userData.password,
            }
        }).catch((e) => {
            res.json({ msg: 'Error :' + e.msg + ' !', user: null }).status(e.status);
            throw e
        }).finally(async () => {
            await client.$disconnect()
        })
        res.json({ msg: 'User saved successfully!', user: newUser }).status(200);
    });


    
/* POST - Login User */

router.post('/login',
    /**
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @param {express.NextFunction} next 
     */
    async (req, res, next) => {
        const userData = req.fields;
        const user = await client.users.findFirst({
            where: {
                username : userData.username,
                password : userData.password
            },
        }).catch((e) => {
            res.json({msg: 'Error :'+e.msg+' !', user : null}).status(e.status);
            throw e
        }).finally(async () => {
            await client.$disconnect()
        })
        if(user){
            res.json({ msg: 'User finded!', user: user }).status(200);
        }else{
            res.json({ msg: 'User unfinded!', user: user }).status(200);
        }
        
    });


module.exports = router;