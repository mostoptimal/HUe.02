"use strict";
/*
document.addEventListener('DOMContentLoaded', (event) => {
    console.log("Document fully Loaded...");
    loadDoc();
});
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.usersArray = void 0;
function loadDoc() {
    var fName, lName, email, password;
    fName = document.getElementById("vorName").textContent;
    lName = document.getElementById("nachName").textContent;
    email = document.getElementById("email").textContent;
    password = document.getElementById("passWort").textContent;
    alert("submitted");
    //put(fName,lName,email,password);
    //document.getElementById("formNewUser").submit();
}
/*
function submitttng(){
    var newUser;
    newUser = document.getElementById("formNewUser").textContent;
}
*/
function readContent() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            bringTable(this);
        }
    };
    xmlhttp.open("GET", "Users.xml", true);
    xmlhttp.send();
    alert("your Data has been submitted!");
}
function bringTable(xml) {
    var i;
    var xmlDoc = xml.responseXML;
    var table = "<tr><th>Vorname</th><th>Nachname</th><th>email</th></tr>";
    var x = xmlDoc.getElementsByTagName("User");
    for (i = 0; i < x.length; i++) {
        console.log(x[i].getElementsByTagName("Vorname")[0].childNodes[0].nodeValue);
        console.log(x[i].getElementsByTagName("Nachname")[0].childNodes[0].nodeValue);
        table += "<tr><td>" +
            x[i].getElementsByTagName("Vorname")[0].childNodes[0].nodeValue +
            "</td><td>" +
            x[i].getElementsByTagName("Nachname")[0].childNodes[0].nodeValue +
            "</td></tr>";
    }
    document.getElementById("usersTable").innerHTML = table;
}
var User = /** @class */ (function () {
    function User(vorname, lname, email, pass) {
        this.vorName = vorname;
        this.nachName = lname;
        this.email = email;
        this.password = pass;
    }
    return User;
}());
exports.User = User;
var usersArray = new Array();
exports.usersArray = usersArray;
