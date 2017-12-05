var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var FCM = require('fcm-push');
var fileUpload = require('express-fileupload');


var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/')));
app.use(express.static('uploads'));
app.use(fileUpload());

app.get('/experience', function(req, res){
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/user', function(req, res){
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/login', function(req, res){
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/signup', function(req, res){
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/subscription', function(req, res){
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/send_messages', function(req, res){
  res.sendFile(path.join(__dirname, '/notification_send.html'));
});

app.post('/send_messages', function(req, res){
  console.log(req);
  var postData = req.body;
  var serverKey = 'AAAA11vtSoM:APA91bFLPitYUjto3dMv6zCRV17TVttYVOg2Ci9Q864uR_dI-wv1hoH6xSd5IxDAI4unzSzhp923FZzJOVYjM46a9H9mYVd0cWum8ATbZbYQEaz8djunrERdu5Hel56L9CPfTm0YhGFG';

  var fcm = new FCM(serverKey);

  postData.tokens.forEach(function (token) {
    var message = {
        to: token, // required fill with device token or topics
        data: {
            your_custom_data_key: 'your_custom_data_value'
        },
        notification: {
            title: postData.title,
            body: postData.body,
            icon: postData.icon,
            click_action: postData.click_action == undefined ? "" : 'http://localhost:3000/uploads/' + postData.click_action
        }
    };

    //promise style
    fcm.send(message)
    .then(function(response){
      console.log("Successfully sent with response: ", response);
    })
    .catch(function(err){
        console.log("Something has gone wrong!");
        console.error(err);
    });
  });
  res.json({msg: "success"});
});

app.post('/upload', function(req, res) {
  console.log(req.files);
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
  var file = req.files.file;
 
  // Use the mv() method to place the file somewhere on your server 
  file.mv(path.join(__dirname, '/uploads/') + file.name, function(err) {
    if (err)
      return res.status(500).send(err);
 
    res.json({filename: file.name});
  });

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
