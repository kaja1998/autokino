 // set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express
var path     = require('path');
var mysql    = require('mysql');

bodyParser = require('body-parser');


// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

 // configuration =================
app.use(express.static(path.join(__dirname, '/dist/auto-kino/browser')));  //TODO rename to your app-name

 // listen (start app with node server.js) ======================================
app.listen(8080, function(){
     console.log("App listening on port 8080");
});

 // application -------------------------------------------------------------
app.get('/', function(req,res)
{
      //res.send("Hello World123");
      res.sendFile('index.html', { root: __dirname+'/dist/auto-kino/browser' });    //TODO rename to your app-name
});

