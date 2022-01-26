
const createError  = require('http-errors');
const express      = require('express');
const path         = require('path');
const cookieParser = require('cookie-parser');
const logger       = require('morgan');

// const { Server }   = require("socket.io");

const indexRouter  = require('./routes/index');
const usersRouter  = require('./routes/users');
const loginRouter  = require('./routes/login');
const chatRouter   = require('./routes/chat');
const subscriptionRouter = require('./routes/subscription');
// import { PrismaClient } from '@prisma/client'
// import { createServer } from 'http';

const app = express();
// const httpServer = createServer(app);


// view engine setup

// const io = new Server(httpServer, { 
//     cors: {
//         origin: ""
//     }
// })



// io.on("connection", (socket) => {
//     console.log("someone is connected")
// })

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/subscription', subscriptionRouter);
app.use('/chat', chatRouter);


// catch 404 and forward to error handler
app.use(
    /**
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {express.NextFunction} next
     */
    function (req, res, next) {
        next(createError(404));
    });

// error handler
app.use(
    /**
     * @param {Error} err
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {express.NextFunction} next
     */
    function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error   = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });

module.exports = app;
