//import {User} from "./Users";
//import {users} from "./Users";

window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    //submitNewUser();
    //showAllUsersInTable();
    //updateUser();
    //deleteUser();
});
document.addEventListener('keypress', (event) => {
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("submitBtn").click();
    }
});

//Object User
class User {
    vorName: String;
    nachName: String;
    email: String;
    password: String;

    constructor(vorname: String, lname: String, email: String, pass: String) {
        this.vorName = vorname;
        this.nachName = lname;
        this.email = email;
        this.password = pass;
    }
}

//Array from Object User
let users = new Array<User>();//Array from Object Users
//public variables
let fName, lName, email, password;//public String Variables
//-------------------------submitNewUser-----------------------------------
//The function for the Button "Submit"
function submitNewUser() {
    fName = (<HTMLInputElement>document.getElementById("vorName")).value;
    lName = (<HTMLInputElement>document.getElementById("nachName")).value;
    email = (<HTMLInputElement>document.getElementById("email")).value;
    password = (<HTMLInputElement>document.getElementById("passWort")).value;
    //if there is Values
    if (fName && lName && email && password) { //(""===null===false)
        if(users.some(user=>user.email===email)){
            alert("User already exists in the Databse!");
        }else{
        sendDataToServer(new User(fName, lName, email, password));//The POST function Request
        console.log("New User: " + fName,lName,email,password);
        //users.push(new User(fName, lName, email, password));
        console.log(users);
        JSON.stringify(users);//turn it to String
        console.log(users);//to test the Result in Console
        (<HTMLInputElement>document.getElementById("vorName")).value = "";
        (<HTMLInputElement>document.getElementById("nachName")).value = "";
        (<HTMLInputElement>document.getElementById("email")).value = "";
        (<HTMLInputElement>document.getElementById("passWort")).value = "";
        }
    } else {
        alert("Please full down all Fields!");
    }
}

//HTTP/AJAX POST Request
function sendDataToServer(user1) {
    let data = JSON.stringify({
        vorName: user1.vorName,
        nachName: user1.nachName,
        email: user1.email,
        passWort: user1.passWort
    });
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });
    xhr.open("POST", "http://localhost:3000/users/user");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
    if (xhr.status==200){
        alert("New User Submitted!");
    }else{
        if (xhr.status==400) alert("The Email Address exists in the Database!");
    }
    console.log(data + " posted!");
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

//-------------------------Update User-----------------------------------
/**Update Firstname and Lastname if the user exists
 *Will show the POPUP(Modal) with old Information to update them*/
function updateUser() {
    fName = (<HTMLInputElement>document.getElementById("firstName")).value;
    lName = (<HTMLInputElement>document.getElementById("lastName")).value;
    email = (<HTMLInputElement>document.getElementById("emailAdress")).value;
    //The index begins with "0" so we don't need the first Row "Vorname","Nachname","Email"
    let index = users.findIndex(user => user.email === email) + 1;
    if (!fName || !lName) {
        alert("please input the Firstname Lastname and the email");
    } else {
        //We need the Email for find is The User in the Database
        let newUser = JSON.stringify({vorName: fName, nachName: lName, email: email});
        updateDataInTheServer(newUser); // AJAX PUT Methode
        (<HTMLInputElement>document.getElementById("firstName")).value = "";
        (<HTMLInputElement>document.getElementById("lastName")).value = "";

    }
//    document.getElementById(index.toString()).childNodes[0].nodeValue=fName;
}

/**Update (POST) Request*/
function updateDataInTheServer(user) {
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
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
            console.log("the Response is: " + response);
            users = response;
            console.log("users;== " + users);
            buildTable(users);
        }
    });
}

//-------------------------Update User-----------------------------------
//-----------------------------------------------------------------------
//-------------------------Delete User-----------------------------------
/**Delete the Row (Frontend) from the Table
 * and calls the AJAX Method to send Delete Request to the Server */
function deleteUser() {
    let table = document.getElementById("usersTable") as HTMLTableElement;
    let index = 0;
    for (let i = 0; i < table.rows.length; i++) {
        table.rows[i].cells[3].onclick = function () {
            email = table.rows[i].cells[2].innerHTML;
            deleteDataFromServer(email); //call AJAX Delete Methode
            //index=this.parentElement.rowIndex;
            index = i;
            table.deleteRow(index);
        }
    }
}

//AJAX Delete Request
function deleteDataFromServer(email) {
    let data = JSON.stringify({email: email});
    let xhr = new XMLHttpRequest();
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
    } else {
        if (xhr.status === 400) {
            console.log("400 " + JSON.stringify(xhr.responseText));
            alert(JSON.stringify(xhr.responseText)); //must not be real //maybe there is always the right user
        }
    }
}

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
        console.log("the Response is: " + response);
        users = response;
        console.log("users;== " + users);
        buildTable(users);
    }
});

// Users Table in index.html
function buildTable(data: Array<User>) {
    let rowNumber = 1;
    console.log("data variable" + data);
    let docTable = (<HTMLInputElement>document.getElementById("usersTable"));
    let table = "<table><thead><tr><th >Vorname</th><th>Nachname</th><th>Email</th><th>Aktionen</th></tr></thead>";
    for (let i = 0; i < data.length; i++) {
        table += "<tr id=" + (rowNumber) + "><td>" + data[i].vorName + "</td><td>" + data[i].nachName + "</td><td>" + data[i].email + "</td><td>" +
            "<button type=\"button\" data-toggle=\"modal\" data-target=\"#updateUserModal\" onclick='returnUserIndex(this)'>Edit</button>" +
            "<button class='deleteUser' onclick='deleteUser()'>Delete</button>" +
            "</td></tr>";
        rowNumber++;
    }
    console.log(table);
    docTable.innerHTML = table;
}

//Load the User Infos in the popup(Bootstrap Modal)
function returnUserIndex(zeile) {
    let i = (zeile.parentNode.parentNode.rowIndex) - 1;
    console.log(i);
    console.log(users[i]);
    (<HTMLInputElement>document.getElementById("firstName")).value = users[i].vorName.toString();
    (<HTMLInputElement>document.getElementById("lastName")).value = users[i].nachName.toString();
    (<HTMLInputElement>document.getElementById("emailAdress")).value = users[i].email.toString();
    return i;
}

//HTTP/AJAX GET Request NOT USED
function getDataFromServer() {
    let xhr = new XMLHttpRequest();
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
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("changeableArea").innerHTML = this.response;
        }
    };
    xhttp.open("GET", "./javascripts/update.txt", true);
    console.log(xhttp.response);
    xhttp.send();
}
