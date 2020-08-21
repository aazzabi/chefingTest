var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');
var bodyParser = require('body-parser');
var passport = require('passport');
var cors = require('cors');

const port = process.env.PORT || 8080;

var mongoose = require('mongoose');

var usersRouter = require('./routes/Users');
var claimsRouter = require('./routes/Claims');

const url = "mongodb://localhost:27017/chefing";
mongoose.connect(url, {useNewUrlParser: true, useCreateIndex: true});
// mongoose.set({ usecreateIndexes: true });
var mongo = mongoose.connection;
mongo.on('connected', () => {
    console.log('Connected !')
});
mongo.on('open', () => {
    console.log('Open !')
});
mongo.on('error', (err) => {
    console.log(err)
});
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;


var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const fileUpload = require('express-fileupload');

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload({
    preserveExtension: true,
    useTempFiles: false
}));
app.use('/users', usersRouter);
app.use('/claims', claimsRouter);
app.use('/tasks', require('./routes/Tasks'));


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Cache-Control, Accept, Origin, X-Session-ID');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,TRACE,COPY,LOCK,MKCOL,MOVE,PROPFIND,PROPPATCH,UNLOCK,REPORT,MKACTIVITY,CHECKOUT,MERGE,M-SEARCH,NOTIFY,SUBSCRIBE,UNSUBSCRIBE,PATCH');
    res.header('Access-Control-Allow-Credentials', 'false');
    res.header('Access-Control-Max-Age', '1000');
    next();
});
app.use(passport.initialize());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});



if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
}

server.listen(3000, function() {
});
module.exports = app;
