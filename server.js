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
      password: "Password1!"
});

app.get('/filme', function (req, res) {
    con.query("SELECT * FROM filme",
        function (error, results, fields) {
            if (error) throw error;
            res.send(results);
        }
    );
});

app.post('/loginaut', function (req, res) {
    const { mail, passwort } = req.body;
        const query = "SELECT * FROM kunden WHERE mail = ? AND passwort = ?";
        con.query(query, [mail, passwort], function (error, results) {
            if (error) throw error;
            if (results.length > 0) {
                res.send({ success: true, user: results[0] });
            } else {
                res.send({ success: false, message: "Invalid email or password" });
            }
        });
});


app.get('/kundendaten', function (req, res) {
    con.query("SELECT * FROM kunden",
      function (error, results, fields) {
        if (error) throw error;
        res.send(results);
      }
    );
});

