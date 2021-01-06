//import {User} from "./Users";
//import {users} from "./Users";
window.addEventListener('DOMContentLoaded', function (event) {
    console.log('DOM fully loaded and parsed');
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
//-------------------------submitNewUser-----------------------------------
//The function for the Button "Submit"
function submitNewUser() {
    fName = document.getElementById("vorName").value;
    lName = document.getElementById("nachName").value;
    email = document.getElementById("email").value;
    password = document.getElementById("passWort").value;
    //if there is Values
    if (fName && lName && email && password) { //(""===null===false)
        if (users.some(function (user) { return user.email === email; })) {
            alert("User already exists in the Databse!");
        }
        else {
            sendDataToServer(new User(fName, lName, email, password)); //The POST function Request
            console.log("New User: " + fName, lName, email, password);
            //users.push(new User(fName, lName, email, password));
            console.log(users);
            JSON.stringify(users); //turn it to String
            console.log(users); //to test the Result in Console
            document.getElementById("vorName").value = "";
            document.getElementById("nachName").value = "";
            document.getElementById("email").value = "";
            document.getElementById("passWort").value = "";
            $.ajax({
                method: 'GET',
                url: 'http://localhost:3000/users',
                dataType: "json",
                success: function (response) {
                    users = response;
                    buildTable(users);
                }
            });
        }
    }
    else {
        alert("Please full down all Fields!");
    }
}
//HTTP/AJAX POST/PUT Request
function sendDataToServer(user1) {
    var data = JSON.stringify({
        vorName: user1.vorName,
        nachName: user1.nachName,
        email: user1.email,
        passWort: user1.passWort
    });
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });
    xhr.open("POST", "http://localhost:3000/users/user");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
    //alert(xhr.responseText); //toString();//
    console.log(data + " send to server!");
}
//-------------------------Update User-----------------------------------
/**Update Firstname and Lastname if the user exists
 *Will show the POPUP(Modal) with old Information to update them*/
function updateUser() {
    fName = document.getElementById("firstName").value;
    lName = document.getElementById("lastName").value;
    email = document.getElementById("emailAdress").value;
    //The index begins with "0" so we don't need the first Row "Vorname","Nachname","Email"
    var index = users.findIndex(function (user) { return user.email === email; }) + 1;
    if (!fName || !lName) {
        alert("please input the Firstname Lastname and the email");
    }
    else {
        //We need the Email for find is The User in the Database
        var newUser = JSON.stringify({ vorName: fName, nachName: lName, email: email });
        updateDataInTheServer(newUser); // AJAX POST/PUT Methode
        document.getElementById("firstName").value = "";
        document.getElementById("lastName").value = "";
    }
    //    document.getElementById(index.toString()).childNodes[0].nodeValue=fName;
}
/**Update (POST/PUT) Request*/
function updateDataInTheServer(user) {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
        }
    });
    xhr.open("PUT", "http://localhost:3000/users/update");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(user);
    //We need the HTTP Get for the New Array Table When any User being updated
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/users',
        dataType: "json",
        success: function (response) {
            users = response;
            buildTable(users);
        }
    });
}
//-------------------------Update User-----------------------------------
//-----------------------------------------------------------------------
//-------------------------Delete User-----------------------------------
/**Delete the Row (Frontend) from the Table
 * and calls the AJAX Method to send Delete Request to the Server */
function deleteUser(DelButton) {
    var table = document.getElementById("usersTable");
    var index = (DelButton.parentNode.parentNode.rowIndex);
    email = table.rows[index].cells[2].innerHTML;
    console.log(index);
    deleteDataFromServer(email); //call AJAX Delete Methode
    $(DelButton).parents("tr").remove();
    //After the User Deletion ,we must get the New Database
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        method: 'GET',
        url: 'http://localhost:3000/users',
        dataType: "json",
        success: function (response) {
            users = response;
            buildTable(users);
        }
    });
}
//AJAX Delete Request
function deleteDataFromServer(email) {
    console.log("email to delete is: " + email);
    var data = JSON.stringify({ email: email });
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });
    xhr.open("DELETE", "http://localhost:3000/users/user");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
    //alert(`User ${email} deleted`);
    //Change the Alert according the Response Status from Server
    if (xhr.status === 200) {
        console.log("200 " + JSON.stringify(xhr.responseText));
        alert(JSON.stringify(xhr.responseText));
    }
    else {
        if (xhr.status === 400) {
            console.log("400 " + JSON.stringify(xhr.responseText));
            alert(JSON.stringify(xhr.responseText)); //must not be real //maybe there is always the right user
        }
    }
}
//-------------------------Delete User-----------------------------------
//-----------------------------------------------------------------------
//-------------------------Delete User-----------------------------------
/**Get jQuery Request*/
$.ajax({
    xhrFields: {
        withCredentials: true
    },
    method: 'GET',
    url: 'http://localhost:3000/users',
    dataType: "json",
    success: function (response) {
        users = response;
        buildTable(users);
    }
});
//--------------------------------Build Table-----------------------------------------
// Users Table in index.html
function buildTable(data) {
    var rowNumber = 1;
    var docTable = document.getElementById("usersTable");
    var table = "<table class=\"titles\"><thead><tr><th >Vorname</th><th>Nachname</th><th>Email</th><th>Aktionen</th></tr></thead>";
    for (var i = 0; i < data.length; i++) {
        table += "<tr id=" + (rowNumber) + "><td>" + data[i].vorName + "</td><td>" + data[i].nachName + "</td><td>" + data[i].email + "</td><td>" +
            "<button class=\"btn btn-secondary\" type=\"button\" data-toggle=\"modal\" data-target=\"#updateUserModal\" onclick='returnUserIndex(this)'>Edit</button>" +
            "<button class=\"btn btn-danger\" onclick='deleteUser(this)' style='margin-left: 10px' id='deleteUser'>Delete</button>" +
            "</td></tr>";
        rowNumber++;
    }
    console.log(table);
    docTable.innerHTML = table;
}
//Load the User Infos in the popup(Bootstrap Modal)
function returnUserIndex(zeile) {
    var i = (zeile.parentNode.parentNode.rowIndex) - 1;
    console.log(i);
    console.log(users[i]);
    document.getElementById("firstName").value = users[i].vorName.toString();
    document.getElementById("lastName").value = users[i].nachName.toString();
    document.getElementById("emailAdress").value = users[i].email.toString();
    return i;
}
//---------------------------------------------------------
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
//-------------------------submitNewUser-----------------------------------
/**show the Table of Users Button:"Show Users Infos"
 * NO MORE IN USE BUT DIDN'T Delete this Old warrior*/
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
//# sourceMappingURL=scripts.js.map