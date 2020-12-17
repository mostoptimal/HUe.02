"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var users = require("./users");
var PORT = 3000;
var members = require("./public/users.json"); //to save users into json file
app.listen(PORT, function () {
    console.log("Server auf http://localhost:3000 gestartet");
});
//Die sog. Bodyparser wandeln JSON- (bzw. URLencoded-) Strings in nutzbare Objekte um
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Aliase für öffentliche Ordner, der eigentliche Pfad / Ordnername wird hinter einer URL versteckt
//Aus der URL localhost:8080/res/images/profil.png wird die Datei ./public/images/profil.png
app.use("/res", express.static(__dirname + "/public"));
app.use("/dependency", express.static(__dirname + "/node_modules"));
//Die Startseite als "/" liefert immer per sendFile eine Webseite (HTML-Datei) zurück
app.get("/", function (req, res) {
    res.status(200);
    res.sendFile(__dirname + "/views/index.html");
});
//get all users
app.get("/users", function (req, res) {
    res.json(users);
    members.json(req.json(users));
});
//get one user by using email as ID
app.get("/users/:email", function (req, res) {
    var found = users.some(function (user) { return user.email === req.params.email; });
    if (found) {
        res.json(users.filter(function (user) { return user.email === req.params.email; }));
    }
    else {
        res.status(400).json({ msg: "member is not found" }); //If the user not existed in the Array
    }
});
//New User !funktioniert nicht
app.post('/users', function (req, res) {
    var newUser = {
        vorName: req.body.vorName,
        nachName: req.body.nachName,
        email: req.body.email,
        passWort: req.body.passWort
    };
    if (!newUser.vorName || !newUser.nachName || !newUser.email || !newUser.passWort) {
        return res.status(400).json({ msg: ' Please enter full Form ' });
    }
    users.push(newUser);
    res.json(users);
});
//user update
app.put("/users/:email", function (req, res) {
    var found = users.some(function (user) { return user.email === req.params.email; });
    if (found) {
        var updUser = req.body;
        users.forEach(function (user) {
            if (user.email === req.body.email) {
                user.vorName = req.body.vorName;
                user.nachName = req.body.nachName;
                res.json({ msg: 'member is updated' });
            }
        });
    }
    else {
        res.status(400).json({ msg: "member is not found" });
    }
});
//delete User
app.delete("/users/:email", function (req, res) {
    var found = users.some(function (user) { return user.email === req.params.email; });
    var index = users.indexOf(function (user) { return user.email == req.params.email; });
    console.log(users.indexOf(index));
    if (found) {
    }
});
