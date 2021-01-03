//import {User} from "./Users";
//import {users} from "./Users";
window.addEventListener('DOMContentLoaded', function (event) {
    console.log('DOM fully loaded and parsed');
    //submitNewUser();
    //showAllUsersInTable();
    //updateUser();
    //deleteUser();
});
document.addEventListener('keypress', function (event) {
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("submitBtn").click();
    }
});
//Object User
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
var users = new Array(); //Array from Object Users
//public variables
var fName, lName, email, password; //public String Variables
//die function für den Button "Submit"
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
        sendDataToServer(new User(fName, lName, email, password)); //die function mit POST Request
        JSON.stringify(users); //nicht wichtig im Code
        console.log(users);
        document.getElementById("vorName").value = "";
        document.getElementById("nachName").value = "";
        document.getElementById("email").value = "";
        document.getElementById("passWort").value = "";
        alert("submitted " + fName + " " + lName);
    }
}
//show the Table of Users Button:"Show Users Infos"
/*
function showAllUsersInTable() {
    users=JSON.parse(getDataFromServer());//GET Request methode
    (<HTMLInputElement>document.getElementById("formNewUser")).value = '';
    let table = "<table><thead><tr><th >Vorname</th><th>Nachname</th><th>Email</th></tr></thead>";
    for (let i=0; i<users.length;i++){
        table +="<tr><td>"+users[i].vorName+"</td><td>"+users[i].nachName+"</td><td>"+users[i].email+"</td></tr>";
    }
    table += "</table>";
    console.log(table);
    document.getElementById("usersTable").innerHTML = table;
}
*/
/*Update Firstname and Lastname if the user exists*/
function updateUser() {
    fName = document.getElementById("firstName").value;
    lName = document.getElementById("lastName").value;
    email = document.getElementById("emailAdress").value;
    var index = users.findIndex(function (user) { return user.email === email; }) + 1;
    console.log("index of him " + index);
    if (!fName || !lName) {
        alert("please input the Firstname Lastname and the email");
    }
    else {
        var newUser = JSON.stringify({ vorName: fName, nachName: lName, email: email });
        updateDataInTheServer(newUser);
        document.getElementById("firstName").value = "";
        document.getElementById("lastName").value = "";
    }
    //    document.getElementById(index.toString()).childNodes[0].nodeValue=fName;
}
//Update (POST) Request
function updateDataInTheServer(user) {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });
    xhr.open("POST", "http://localhost:3000/users/update");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(user);
    console.log(this.responseText); //durch status code (403,200...etc.)
}
//just thinking of it
function deleteUser() {
    var table = document.getElementById("usersTable");
    var index = 0;
    var _loop_1 = function (i) {
        table.rows[i].cells[3].onclick = function () {
            email = table.rows[i].cells[2].innerHTML;
            deleteDataFromServer(email);
            index = this.parentElement.rowIndex;
            table.deleteRow(index);
        };
    };
    for (var i = 0; i < table.rows.length; i++) {
        _loop_1(i);
    }
}
//AJAX Delete Request
function deleteDataFromServer(email) {
    var data = JSON.stringify({ email: email });
    console.log(email);
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            //console.log(this.responseText);
        }
    });
    xhr.open("DELETE", "http://localhost:3000/users/user");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
    console.log("delete sent");
    alert("deleted");
    /*
    if(xhr.status===200){
        console.log("200");
        alert("User deleted");
    }else{
        if (xhr.status===400){
            console.log("400");
            alert("User not found"); //must not be real //maybe there is always the right user
        }
    }
    */
}
//HTTP/AJAX POST Request
function sendDataToServer(user1) {
    var data = JSON.stringify(user1);
    var xhr = new XMLHttpRequest();
    console.log('new XMLHttpRequest()'); //
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });
    xhr.open("POST", "http://localhost:3000/users/");
    console.log('xhr.open');
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
    console.log(data + " posted!");
}
//---------------------
//HTTP/AJAX GET Request NOT USED
function getDataFromServer() {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });
    xhr.open("GET", "http://localhost:3000/users");
    xhr.send();
    var responseTextAsJSON = xhr.responseText;
    console.log(responseTextAsJSON);
    return responseTextAsJSON;
}
//Get jQuery Request
$.ajax({
    method: 'GET',
    url: 'http://localhost:3000/users',
    dataType: "json",
    success: function (response) {
        console.log("the Response is: " + response);
        users = response;
        console.log("users;== " + users);
        buildTable(users);
    }
});
//Table in index Html
function buildTable(data) {
    var rowNumber = 1;
    console.log("data variable" + data);
    var docTable = document.getElementById("usersTable");
    var table = "<table><thead><tr><th >Vorname</th><th>Nachname</th><th>Email</th><th>Aktionen</th></tr></thead>";
    for (var i = 0; i < data.length; i++) {
        table += "<tr id=" + (rowNumber) + "><td>" + data[i].vorName + "</td><td>" + data[i].nachName + "</td><td>" + data[i].email + "</td><td>" +
            "<button type=\"button\" data-toggle=\"modal\" data-target=\"#updateUserModal\" onclick='returnUserIndex(this)'>Edit</button>" +
            "<button class='deleteUser' onclick='deleteUser()'>Delete</button>" +
            "</td></tr>";
        rowNumber++;
    }
    console.log(table);
    docTable.innerHTML = table;
}
function returnUserIndex(zeile) {
    var i = (zeile.parentNode.parentNode.rowIndex) - 1;
    console.log(i);
    console.log(users[i]);
    document.getElementById("firstName").value = users[i].vorName;
    document.getElementById("lastName").value = users[i].nachName;
    document.getElementById("emailAdress").value = users[i].email;
    return i;
}
//Goto Update Page without going
function getUpdateTxt() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("changeableArea").innerHTML = this.response;
        }
    };
    xhttp.open("GET", "./javascripts/update.txt", true);
    console.log(xhttp.response);
    xhttp.send();
}
//# sourceMappingURL=scripts.js.map