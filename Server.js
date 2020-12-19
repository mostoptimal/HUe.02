"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var Users_1 = require("./public/javascripts/Users"); //import User class
var Users_2 = require("./public/javascripts/Users"); //import users Array (Array of (user)Objects)
var app = express();
//const users = require("./main");
var PORT = 3000;
//const users = require("./public/users.json");
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
    res.json(Users_2.users);
});
//get one user per email
app.get("/users/:email", function (req, res) {
    var found = Users_2.users.some(function (user) { return user.email === req.params.email; });
    if (found) {
        res.json(Users_2.users.filter(function (user) { return user.email === req.params.email; }));
    }
    else {
        res.status(400).json({ msg: "member is not found" });
    }
});
var u1 = new Users_1.User("Momo", "LL", "q@@.cd", "defw");
var u2 = new Users_1.User("Moegemo", "LdgegeL", "qs@eee.cefd", "def56gujhw");
var u3 = new Users_1.User("OOOITTRJ7PPP", "SMSM", "q3rfw3s@hotm.de", "876544rtg");
Users_2.users.push(u1);
Users_2.users.push(u2);
Users_2.users.push(u3);
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
    Users_2.users.push(new Users_1.User(req.body.vorName, req.body.nachName, req.body.email, req.body.passWort));
    Users_2.users.push(newUser);
    res.send(Users_2.users);
});
//user update firstname and lastname
app.put("/users/:email", function (req, res) {
    var found = Users_2.users.some(function (user) { return user.email === req.params.email; });
    if (found) {
        var updUser = req.body;
        Users_2.users.forEach(function (user) {
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
    var found = Users_2.users.some(function (user) { return user.email === req.params.email; });
    var index = Users_2.users.filter(function (user) { return user.email === req.params.email; });
    if (found) {
        Users_2.users.remove(Users_2.users[index]);
    }
    else {
        res.JSON({ msg: "This Email is for user not found" });
    }
});
