// set up ========================
var express = require('express');
var app = express();                               // create our app w/ express
var path = require('path');
var mysql = require('mysql');
var cors = require('cors');
const allowCrossDomain = (req, res, next) => {
      res.header(`Access-Control-Allow-Origin`, `*`);
      res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
      res.header(`Access-Control-Allow-Headers`, `Content-Type`);
      next();
};

bodyParser = require('body-parser');


// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(allowCrossDomain);

// configuration =================
app.use(express.static(path.join(__dirname, '/dist/auto-kino/browser')));  //TODO rename to your app-name

// listen (start app with node server.js) ======================================
app.listen(8080, function () {
      console.log("App listening on port 8080");
});

// application -------------------------------------------------------------
app.get('/', function (req, res) {
      res.sendFile('index.html', { root: __dirname + '/dist/auto-kino/browser' });    //TODO rename to your app-name
});
var con = mysql.createConnection({
      database: "autokino",
      host: "127.0.0.1",
      port: "3306",
      user: "root",
      password: "Egal!234"
});

app.get('/filme', function (req, res) {
      con.connect(function (err) {
            if (err) throw err;
            console.log("Connected");

            con.query("SELECT * FROM filme",
                  function (error, results, fields) {
                        if (error) throw error;
                        res.send(results);
<<<<<<< Updated upstream

                        con.end(function (err) {
                              if (err) throw err;
                              console.log("Disconnected");

                        });
=======
>>>>>>> Stashed changes
                  }
            );
      });
});

app.get('/genre', function (req, res) {
      con.connect(function (err) {
            if (err) throw err;

            con.query("SELECT genre FROM filme WHERE filmtitel = 'Drachenzähmen'",
                  function (error, results, fields) {
                        if (error) throw error;
                        res.send(results);
                  }
            );
      });
});

app.get('/laufzeit', function (req, res) {
      con.connect(function (err) {
            if (err) throw err;

            con.query("SELECT laufzeit FROM filme WHERE filmtitel = 'Drachenzähmen'",
                  function (error, results, fields) {
                        if (error) throw error;
                        res.send(results);
                  }
            );
      });
});

app.get('/schauspieler', function (req, res) {
      con.connect(function (err) {
            if (err) throw err;

            con.query("SELECT Schauspieler FROM filme WHERE filmtitel = 'Drachenzähmen'",
                  function (error, results, fields) {
                        if (error) throw error;
                        res.send(results);
                  }
            );
      });
});

app.get('/bewertung', function (req, res) {
      con.connect(function (err) {
            if (err) throw err;

            con.query("SELECT bewertung FROM filme WHERE filmtitel = 'Drachenzähmen'",
                  function (error, results, fields) {
                        if (error) throw error;
                        res.send(results);
                  }
            );
      });
});