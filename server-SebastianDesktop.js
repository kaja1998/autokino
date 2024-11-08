// set up ========================
var express = require('express');
var app = express();                               // create our app w/ express
var path = require('path');
var mysql = require('mysql');
var cors = require('cors');
var socket = require('socket.io');
const string_decoder = require("string_decoder");
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
var server = app.listen(8080, function () {
      console.log("App listening on port 8080");
});

//START websockets

var io = socket(server)
io.on('connection',(socket)=>{
  socket.on('goUpdateTicketCounter',(counter,v_nr)=>{
      io.emit('updateTicketCounter',counter,v_nr);
  });
  socket.on('goUpdatePlaetze',(currentIndex)=>{
    io.emit('updatePlaetze',currentIndex);
});
  
  socket.on('createConnection',(msg)=>{
    io.emit('updateTicketCounter');
});

});
//END websockets

// application -------------------------------------------------------------
app.get('/', function (req, res) {
      res.sendFile('index.html', { root: __dirname + '/dist/auto-kino/browser' });    //TODO rename to your app-name
});
var con = mysql.createConnection({
      database: "autokino",
      host: "127.0.0.1",
      port: "3306",
      user: "root",
      password: "My3qlP@ssword"
});
app.post('/insertticket', function (req, res) {
  const sql = "INSERT INTO ticket (ticket_nr, kunden_id, veranstaltungs_nr, erwachsene, ermaessigte, kinder) VALUES (?, ?, ?, ?, ?, ?)";
  const { ticket_nr, kunden_id, veranstaltungs_nr, erwachsene, ermaessigte, kinder } = req.body;

  con.query(sql, [ticket_nr, kunden_id, veranstaltungs_nr, erwachsene, ermaessigte, kinder], function(err, result) {
    if (err) {
      console.error(err);
      res.status(500).send({error: 'Database query failed'});
      return;
    }
    res.status(200).send({message: 'Records inserted'});
  });
});


app.post('/setplaetze', function (req, res) {
  const sql = "UPDATE veranstaltungen SET plaetze = ? WHERE veranstaltungs_nr = ?;";
  const { platz, v_nr } = req.body;
  con.query(sql, [platz, v_nr], function(err, result) {
    if (err) {
      console.error(err);
      res.status(500).send({error: 'Database query failed'});
      return;
    }
    res.status(200).send({message: 'Records inserted'});
  });
});

app.get('/loadticket', function (req, res) {
  const query = "SELECT * FROM ticket";
  con.query(query, function (error, results) {
    if (error) {
      console.error(error);
      res.status(500).send("Error occurred during the query.");
      return;
    }
    res.status(200).json(results);
  });
});

app.post('/getusertickets', function (req, res) {
    const userId = req.body.userId;

    const query = `
    SELECT
      t.ticket_nr, t.kinder, t.ermaessigte, t.erwachsene, t.veranstaltungs_nr,
      v.filmtitel, v.datum, v.ort
    FROM
      ticket t
    JOIN
      veranstaltungen v ON t.veranstaltungs_nr = v.veranstaltungs_nr
    WHERE
      t.kunden_id = ?
  `;

    con.query(query, [userId], function (error, results) {
        if (error) {
            throw error;
        } else {
            res.json(results);
        }
    });
});

app.get('/filmeMitDatum', function (req, res) {
  con.query(`

    SELECT f.filmtitel, f.beschreibung, f.bildpfad, v.datum
    FROM filme f
    LEFT JOIN veranstaltungen v ON f.filmtitel = v.filmtitel
  `,
  function (error, results) {
    if (error) throw error;
    //reduce : Format für results wird festgelegt
    //acc ist der Akkumulator, der das Ergebnis speichert.
    //row ist das aktuelle Element, das von der Abfrage zurückgegeben wurde.
    const filme = results.reduce((acc, row) => {
      // Für jede Zeile (row) wird geprüft, ob ein Film mit dem gleichen filmtitel bereits im Akkumulator vorhanden ist.
      const film = acc.find(f => f.filmtitel === row.filmtitel);
      if (film) {
        film.veranstaltungen.push({ datum: row.datum });
      } else {
        acc.push({
          filmtitel: row.filmtitel,
          beschreibung: row.beschreibung,
          bildpfad: row.bildpfad,
          //Wenn row.datum definiert ist, wird ein Objekt mit dem Datum hinzugefügt, ansonsten wird ein leeres Array erstellt.
          veranstaltungen: row.datum ? [{ datum: row.datum }] : []
        });
      }
      return acc;
    }, []);
    res.json(filme);
  });
});

app.get('/getfilmHighlights', function (req, res) {
  const query = `
    SELECT f.filmtitel, f.beschreibung, f.bildpfad, v.datum
    FROM filme f
    LEFT JOIN veranstaltungen v ON f.filmtitel = v.filmtitel
    WHERE f.filmtitel IN ("Dune II", "Chihiros Reise ins Zauberland", "Drachenzähmen leicht gemacht", "Minions", "Der Schuh des Manitu", "Transformers")
  `
  con.query(query,
    function (error, results, fields) {
      if (error) throw error;
      const filme = results.reduce((acc, row) => {
        const film = acc.find(f => f.filmtitel === row.filmtitel);
        if (film) {
          film.veranstaltungen.push({ datum: row.datum });
        } else {
          acc.push({
            filmtitel: row.filmtitel,
            beschreibung: row.beschreibung,
            bildpfad: row.bildpfad,
            veranstaltungen: row.datum ? [{ datum: row.datum }] : []
          });
        }
        return acc;
      }, []);
      res.json(filme);
    });
});

app.post('/certainFilme', function (req, res) {
  const userInput  = '%' + req.body.userInput +'%';
  const query = `
    SELECT f.filmtitel, f.beschreibung, f.bildpfad, v.datum
    FROM filme f
    LEFT JOIN veranstaltungen v ON f.filmtitel = v.filmtitel
    WHERE f.filmtitel LIKE ?
  `
  con.query(query, [userInput],
    function (error, results, fields) {
      if (error) throw error;
      const filme = results.reduce((acc, row) => {
        const film = acc.find(f => f.filmtitel === row.filmtitel);
        if (film) {
          film.veranstaltungen.push({ datum: row.datum });
        } else {
          acc.push({
            filmtitel: row.filmtitel,
            beschreibung: row.beschreibung,
            bildpfad: row.bildpfad,
            veranstaltungen: row.datum ? [{ datum: row.datum }] : []
          });
        }
        return acc;
      }, []);
      res.json(filme);
    });
});

app.post('/loginaut', function (req, res) {
    const { mail, passwort } = req.body;
        const query = "SELECT * FROM kunden WHERE mail = ? AND passwort = ?";
        con.query(query, [mail, passwort], function (error, results) {
            if (error) throw error;
            if (results.length > 0) {
                res.send({ success: true, user: results[0] });
            } else {
                res.send({ success: false, message: "Achtung: Die E-Mail-Adresse oder das Passwort stimmen nicht mit den bei uns hinterlegten Daten überein. Bitte überprüfe deine Eingaben und versuche es noch mal." });
            }
        });
});

app.post('/deletekunde', function (req, res) {
  const { id } = req.body;
  const query = "DELETE FROM kunden WHERE id=?";
  con.query(query, [id], function (error, results) {
    if (error) {
      res.send({ success: false, message: "Fehler beim Löschen des Kontos" });
    } else {
      res.send({ success: true, message: "Konto erfolgreich gelöscht" });
    }
  });
});

app.post('/checkEmailExists', function (req, res) {
    const { email } = req.body;
    const query = "SELECT * FROM kunden WHERE mail = ?";
    con.query(query, [email], function (error, results) {
        if (error) throw error;
        if (results.length > 0) {
            res.send({ exists: true, message: "Diese E-Mail-Adresse ist bereits registriert." });
        } else {
            res.send({ exists: false });
        }
    });
});

app.post('/registerCustomer', function (req, res) {
    const { id, vorname, nachname, strasseUndNr, plz, stadt, geburtsdatum, zahlungsmittel, email, choosepassword } = req.body;
    const query = "INSERT INTO kunden (id, vorname, nachname, strasseUndNr, plz, stadt, geburtsdatum, zahlungsmittel, mail, passwort) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    con.query(query, [id, vorname, nachname, strasseUndNr, plz, stadt, geburtsdatum, zahlungsmittel, email, choosepassword], function (error, results) {
        if (error) {
            res.send({ success: false, message: "Registrierung fehlgeschlagen" });
        } else {
            res.send({ success: true, message: "Registrierung erfolgreich." });
        }
    });
});

app.post('/updatekundendaten', function (req, res) {
  const { id, vorname, nachname, strasseUndNr, plz, stadt, geburtsdatum, zahlungsmittel, passwort } = req.body;

  const query = `
    UPDATE kunden
    SET vorname = ?, nachname = ?, strasseUndNr = ?, plz = ?, stadt = ?, zahlungsmittel = ?, passwort = ?
    WHERE id = ?
  `;

  con.query(query, [vorname, nachname, strasseUndNr, plz, stadt, zahlungsmittel, passwort, id], function (error, results) {
    if (error) {
      res.send({ success: false, message: "Fehler beim Aktualisieren der Kundendaten:", error });
    } else {
      res.send({ success: true, message: "Kundendaten erfolgreich aktualisiert." });
    }
  });
});

app.post('/getFilm', function (req, res) {
   const filmInput  = req.body.filmtitel;
   const query = "SELECT *FROM filme f LEFT JOIN veranstaltungen v ON f.filmtitel = v.filmtitel WHERE f.filmtitel LIKE ?";
   con.query(query, [filmInput],
            function (error, results, fields) {
                  if (error) throw error;
                  const filme = results.reduce((acc, row) => {
                    const film = acc.find(f => f.filmtitel === row.filmtitel);
                    if (film) {
                      film.veranstaltungen.push({ datum: row.datum });
                      film.veranstaltungs_nummern.push({veranstaltungs_nr: row.veranstaltungs_nr});
                      film.plaetze.push({plaetze: row.plaetze});
                    } else {
                      acc.push({
                        filmtitel: row.filmtitel,
                        beschreibung: row.beschreibung,
                        laufzeit: row.laufzeit,
                        bewertung: row.bewertung,
                        bildpfad: row.bildpfad,
                        genre: row.genre,
                        erscheinungsdatum: row.erscheinungsdatum,
                        besetzung: row.besetzung,
                        fsk: row.fsk,
                        trailerpfad: row.trailerpfad,
                        veranstaltungs_nummern: row.veranstaltungs_nr ? [{veranstaltungs_nr: row.veranstaltungs_nr}]  : [],
                        plaetze: row.plaetze ? [{plaetze: row.plaetze}]  : [],
                        veranstaltungen: row.datum ? [{ datum: row.datum }] : []
                      });
                    }
                    return acc;
                  }, []);
                  res.json(filme);
            }
      );
});

