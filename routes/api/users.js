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

router.post('/',
    async(req, res, next) => {
        const userId = Number.parseInt(req.params.userId);
        const theUser = await prisma.users.findUnique({where : {id: userId}})
        res.json(theUser).status(200);
    }
);

// router.post('/get:userId',
//     /**
//      * @param {express.Request<{userId: string}>} req 
//      * @param {express.Response} res 
//      * @param {express.NextFunction} next 
//      */
//     async (req, res, next) => {
//         res.json(req.params.userId).status(200);
//     });

router.post('/create',
    /**
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @param {express.NextFunction} next 
     */
    async (req, res, next) => {
        const userData = req.fields;
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

//         const password = bcryptjs.hashSync("Bebou")
//         const createUser = await prisma.users.create({
//             data: {
//                 username: "MAXIME A TORD 11.6%",
//                 email: "chichakaloudmaximator11.6666@gmail.com",
//                 password: password,
//             }
//         })
//         res.json(createUser).status(200);
//     }
// );

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