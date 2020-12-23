//import {User} from "./Users";
//import {users} from "./Users";
window.addEventListener('DOMContentLoaded', function (event) {
    console.log('DOM fully loaded and parsed');
    submitNewUser();
    showAllUsersInTable();
    updateUser();
});
document.addEventListener('keypress', function (event) {
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("submitBtn").click();
    }
});
//User Object
var User = /** @class */ (function () {
    function User(vorname, lname, email, pass) {
        this.vorName = vorname;
        this.nachName = lname;
        this.email = email;
        this.password = pass;
    }
    return User;
}());
//Array from Object User
var users = new Array();
/*
function submitttng(){
    var newUser;
    newUser = document.getElementById("formNewUser").textContent;
}
*/
var fName, lName, email, password; //public String Variables
function submitNewUser() {
    fName = document.getElementById("vorName").value;
    lName = document.getElementById("nachName").value;
    email = document.getElementById("email").value;
    password = document.getElementById("passWort").value;
    if (fName === "" || lName === "" || email === "" || password === "") {
        alert("Missing Values please input all Details");
    }
    else {
        users.push(new User(fName, lName, email, password));
        console.log(users);
        JSON.stringify(users);
        document.getElementById("vorName").value = "";
        document.getElementById("nachName").value = "";
        email = document.getElementById("email").value = "";
        document.getElementById("passWort").value = "";
        alert("submitted " + fName);
    }
}
function showAllUsersInTable() {
    document.getElementById("formNewUser").value = '';
    var table = "<table><thead><tr><th >Vorname</th><th>Nachname</th><th>Email</th></tr></thead>";
    for (var i = 0; i < users.length; i++) {
        table += "<tr><td>" + users[i].vorName + "</td><td>" + users[i].nachName + "</td><td>" + users[i].email + "</td></tr>";
    }
    table += "</table>";
    console.log(table);
    document.getElementById("usersTable").innerHTML = table;
}
/*Update Firstname and Lastname if the user exists*/
function updateUser() {
    var fname, lname, email;
    var found;
    fname = document.getElementById("vorName").value;
    lname = document.getElementById("nachName").value;
    email = document.getElementById("email").value;
    if (!fname || !lname || !email) {
        alert("please input the Firstname Lastname and the email");
    }
    else {
        for (var i = 0; i < users.length; i++) {
            if (email === users[i].email) {
                users[i].vorName = fname;
                users[i].nachName = lname;
                alert("user " + users[i].vorName + "has been updated");
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
function deleteUser() {
    email = document.getElementById("email").value;
    for (var i = 0; i < users.length; i++) {
        if (email == users[i].email) {
            users.splice(i, 1);
        }
    }
}
//# sourceMappingURL=scripts.js.map