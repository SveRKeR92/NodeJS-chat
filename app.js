
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const logger       = require('morgan');
const formidable   = require('express-formidable');

const logger = require('morgan');


// const { Server }   = require("socket.io");
// import { PrismaClient } from '@prisma/client'
// import { createServer } from 'http';
const viewsRouter = require('./routes/views');
const apiRouter = require('./routes/api');

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

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(formidable())

app.use('/', viewsRouter);
app.use('/api', apiRouter);


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
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    }
);

module.exports = app;