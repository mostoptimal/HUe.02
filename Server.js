"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var users = require("./main");
var PORT = 3000;
var members = require("./public/users.json");
app.listen(PORT, function () {
    console.log("Server auf http://localhost:3000 gestartet");
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/res", express.static(__dirname + "/public"));
app.use("/dependency", express.static(__dirname + "/node_modules"));
app.get("/public/index.html", function (req, res) {
    res.status(200);
    res.sendFile(__dirname + "/views/index.html");
});
app.get("/users", function (req, res) {
    res.json(users);
    members.json(res.json(users));
});
app.get("/users/:email", function (req, res) {
    var found = users.some(function (user) { return user.email === req.params.email; });
    if (found) {
        res.json(users.filter(function (user) { return user.email === req.params.email; }));
    }
    else {
        res.status(400).json({ msg: "member is not found" });
    }
});
//New User !funktioniert nicht
app.post('/users/:email', function (req, res) {
    var newUser = {
        vorName: req.body.vorName,
        nachName: req.body.nachName,
        email: req.body.email,
        passWort: req.body.passWort,
        status: 'active'
    };
    req.json(newUser);
    //users.push(newUser);
    res.json(users);
    //members.push(newUser);
});
//user update
app.put("/users/:email", function (req, res) {
    var found = users.some(function (user) { return user.email === req.params.email; });
    if (found) {
        var updUser = req.body;
        users.forEach(function (user) {
            if (user.email === req.body.email) {
                user.vorName = req.body.vorName;
                user.nacName = req.body.nachName;
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
    if (found) {
    }
});
