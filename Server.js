"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var main_1 = require("./main"); //import users Array (Array of (user)Objects)
var main_2 = require("./main"); //import User class
var app = express();
//const users = require("./main");
var PORT = 3000;
var users = require("./public/users.json");
//const usrArry = require("usersArray");
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
//get all users
app.get("/users", function (req, res) {
    res.json(users);
    users.json(res.json(users));
});
//get one user per email
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
app.post('/users/', function (req, res) {
    var newUser = {
        vorName: req.body.vorName,
        nachName: req.body.nachName,
        email: req.body.email,
        passWort: req.body.passWort,
    };
    console.log(req.body.vorName, req.body.nachName, req.body.email, req.body.passWort);
    res.send("post Requested id ");
    main_1.usersArray.push(new main_2.User(req.body.vorName, req.body.nachName, req.body.email, req.body.passWort));
    //res.json(usersArray);
    users.push(newUser);
    res.json(users);
    //members.push(newUser);
});
//user update firstname and lastname
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
//delete User by finding Email
app.delete("/users/:email", function (req, res) {
    var found = users.some(function (user) { return user.email === req.params.email; });
    var index = users.filter(function (user) { return user.email === req.params.email; });
    if (found) {
        users.remove(users[index]);
    }
    else {
        res.JSON({ msg: "This Email is for user not found" });
    }
});
