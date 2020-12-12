"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var users = require("./main");
var PORT = 3000;
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
});
