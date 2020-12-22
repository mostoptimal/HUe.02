"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
window.addEventListener('DOMContentLoaded', function (event) {
    console.log('DOM fully loaded and parsed');
    loadDoc();
    readContent();
    updateUser();
});
var Users_1 = require("./Users");
var Users_2 = require("./Users");
function submitttng() {
    var newUser;
    newUser = document.getElementById("formNewUser").textContent;
}
var fName, lName, email, password; //public String Variables
function loadDoc() {
    fName = document.getElementById("vorName").value;
    lName = document.getElementById("nachName").value;
    email = document.getElementById("email").value;
    password = document.getElementById("passWort").value;
    if (fName === "" || lName === "" || email === "" || password === "") {
        alert("Missing Values please input all Details");
    }
    else {
        Users_2.users.push(new Users_1.User(fName, lName, email, password));
        JSON.stringify(Users_2.users);
        document.getElementById("vorName").value = "";
        document.getElementById("nachName").value = "";
        email = document.getElementById("email").value = "";
        document.getElementById("passWort").value = "";
        alert("submitted " + fName);
    }
}
/*braucht bearbeiten*/
function readContent() {
    document.getElementById("formNewUser").value = '';
    var table = "<table><thead><tr><th >Vorname</th><th>Nachname</th><th>Email</th></tr></thead>";
    for (var i = 0; i < Users_2.users.length; i++) {
        table += "<tr><td>" + Users_2.users[i][0] + "</td><td>" + Users_2.users[i][1] + "</td><td>" + Users_2.users[i][2] + "</td></tr>";
    }
    table += "</table>";
    console.log(table);
    document.getElementById("usersTable").innerHTML = table;
}
/*Update Firstname and Lastname if the user exists*/
function updateUser() {
    var fname, lname, email;
    fname = document.getElementById("vorName").value;
    lname = document.getElementById("nachName").value;
    email = document.getElementById("email").value;
    if (!fname || !lname || !email) {
        alert("please input the Firstname Lastname and the email");
    }
    else {
        var found;
        for (var i = 0; i < Users_2.users.length; i++) {
            if (email === Users_2.users[i].email) {
                Users_2.users[i].vorName = fname;
                Users_2.users[i].nachName = lname;
                alert("user " + Users_2.users[i].vorName + "has been updated");
                document.getElementById("vorName").value = "";
                document.getElementById("nachName").value = "";
                document.getElementById("email").value = "";
                found = true;
            }
            else {
                found = false;
            }
        }
    }
    if (!found) {
        alert("user doesn't exist");
    }
}
