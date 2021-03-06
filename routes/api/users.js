const express = require('express');
const router = express.Router();
const bcryptjs = require("bcryptjs")
const jwt = require('jsonwebtoken');

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const client = new PrismaClient()

/* GET All User */

router.get('/',
    /**
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @param {express.NextFunction} next 
     */
    async (req, res, next) => {
        let token = jwt.sign({foo : "bar"}, 'shhhhh')
        res.json({
            count: await client.users.count(),
            users: [await client.users.findMany()],
            token: token,
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

router.post('/create',
    /**
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @param {express.NextFunction} next 
     */
    async (req, res, next) => {
        const userData = req.fields;
        console.log(userData)
        const password = bcryptjs.hashSync(userData.password);
        const newUser = await client.users.create({
            data: {
                username: userData.username,
                email: userData.email,
                password: password,
            }
        }).catch((e) => {
            res.json({ msg: 'Error :' + e.msg + ' !', user: null }).status(e.status);
            throw e
        }).finally(async () => {
            await client.$disconnect()
        })
        res.json({ msg: 'User saved successfully!', user: newUser }).status(200);
    });

router.delete('/:userId',
    /**
     * 
     * @param {express.Request<{userId: string}>} req 
     * @param {express.Response} res 
     * @param {express.NextFunction} next 
     */
    async (req, res, next) => {
        const userId = Number.parseInt(req.params.userId)
        const user = await prisma.users.delete({
            where: {
                id: userId
            }
        })
        res.json({
            success: true,
            payload : user
        })
    }
)

/* POST - Login User */

router.post('/login',
    /**
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @param {express.NextFunction} next 
     */
    async(req, res, next) => {
        // console.log(req.fields)
        prisma.users.findUnique({
            where:{
                email: req.fields.email
            }
        }).then(user => {
            if(!user){
                res.status(401).json({error : "User not found"});
            }
            // console.log(user)
            bcryptjs.compare(req.fields.password, user.password)
            .then(valid => {
                // console.log(valid)
                if(!valid){
                    res.status(401).json({error : "Wrong password"});
                }
                res.status(200).json({
                    userId: user.id,
                    token: jwt.sign(
                        { userId: user.id},
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h'}
                    )
                })
            })
            .catch(e => res.status(500).json({e}))
        })
        .catch(e => res.status(500).json({e})) 
    }
);


module.exports = router;