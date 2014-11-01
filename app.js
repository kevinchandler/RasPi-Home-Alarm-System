var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');

var api = require('./routes/api');

var Alarm = require('./lib/alarm.js'),
    AlarmLog = require('./lib/alarmlog.js'),
    AfkBot = require('./lib/afkbot.js');

// AfkBot.findAlarm('545507d5da40e4032637d378', function(err, alarm) {
//   if (err || !alarm) { return new Error(err || 'no alarm found'); }
//   else {
//     AfkBot.createAlarmLog(alarm, 'motion detected', function(err, log) {
//       if (err || !log) { return new Error(err); }
//       else { console.log(log); }
//     });
//     AfkBot.shouldWeAlert(alarm, function(err, answer) {
//       if (err || !answer) { return new Error(err); }
//         else {
//           AfkBot.alert(alarm, function(err, success) {
//             if (err || !success) { return new Error(err); }
//             else {
//               console.log('you should have been alerted');
//             }
//           });
//         }
//     });
//   }
// });

// AfkBot.createAlarm(function(err, alarm) {
//   console.log(err, alarm);
//   AfkBot.createAlarmLog(alarm, 'motion detected', function(err, data) {
//       console.log(err, data);
//   })
// });


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
