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
//die function für den Button "Submit"
function submitNewUser() {
    fName = (<HTMLInputElement>document.getElementById("vorName")).value;
    lName = (<HTMLInputElement>document.getElementById("nachName")).value;
    email = (<HTMLInputElement>document.getElementById("email")).value;
    password = (<HTMLInputElement>document.getElementById("passWort")).value;
    if (fName === "" || lName === "" || email === "" || password === "") {
        alert("Missing Values please input all Details");
    } else {
        users.push(new User(fName, lName, email, password));
        console.log(users);
        sendDataToServer(new User(fName, lName, email, password));//die function mit POST Request
        JSON.stringify(users);//nicht wichtig im Code
        console.log(users);
        (<HTMLInputElement>document.getElementById("vorName")).value = "";
        (<HTMLInputElement>document.getElementById("nachName")).value = "";
        (<HTMLInputElement>document.getElementById("email")).value = "";
        (<HTMLInputElement>document.getElementById("passWort")).value = "";
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
    fName = (<HTMLInputElement>document.getElementById("firstName")).value;
    lName = (<HTMLInputElement>document.getElementById("lastName")).value;
    email = (<HTMLInputElement>document.getElementById("emailAdress")).value;
    let index=users.findIndex(user=> user.email===email)+1;
    console.log("index of him "+index);
    if (!fName || !lName ) {
        alert("please input the Firstname Lastname and the email");
    } else {
        let newUser = JSON.stringify({vorName: fName, nachName: lName,email:email});
        updateDataInTheServer(newUser);
        (<HTMLInputElement>document.getElementById("firstName")).value = "";
        (<HTMLInputElement>document.getElementById("lastName")).value = "";

    }
//    document.getElementById(index.toString()).childNodes[0].nodeValue=fName;
}
//Update (POST) Request
function updateDataInTheServer(user) {
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });
    xhr.open("POST", "http://localhost:3000/users/update");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(user);
    console.log(this.responseText);//durch status code (403,200...etc.)
}

//just thinking of it
function deleteUser() {
    let table= document.getElementById("usersTable") as HTMLTableElement;
    let index=0;

    for (let i=0;i<table.rows.length;i++){
        table.rows[i].cells[3].onclick= function (){
            email=table.rows[i].cells[2].innerHTML;
            deleteDataFromServer(email);
            index=this.parentElement.rowIndex;
            table.deleteRow(index);
        }

    }

}
//AJAX Delete Request
function deleteDataFromServer(email) {
    let data=JSON.stringify({email:email});
    console.log(email);
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
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
    let data = JSON.stringify(user1);
    let xhr = new XMLHttpRequest();
    console.log('new XMLHttpRequest()');//
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
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });
    xhr.open("GET", "http://localhost:3000/users");
    xhr.send();
    let responseTextAsJSON = xhr.responseText;
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
function buildTable(data: Array<User>) {
    let rowNumber = 1;
    console.log("data variable" + data);
    let docTable = (<HTMLInputElement>document.getElementById("usersTable"));
    let table = "<table><thead><tr><th >Vorname</th><th>Nachname</th><th>Email</th><th>Aktionen</th></tr></thead>";
    for (let i = 0; i < data.length; i++) {
        table += "<tr id="+(rowNumber)+"><td>" + data[i].vorName + "</td><td>" + data[i].nachName + "</td><td>" + data[i].email + "</td><td>" +
            "<button type=\"button\" data-toggle=\"modal\" data-target=\"#updateUserModal\" onclick='returnUserIndex(this)'>Edit</button>" +
            "<button class='deleteUser' onclick='deleteUser()'>Delete</button>" +
            "</td></tr>";
        rowNumber++;
    }

    console.log(table);
    docTable.innerHTML = table;
}
function returnUserIndex(zeile){
    let i = (zeile.parentNode.parentNode.rowIndex)-1;
    console.log(i);
    console.log(users[i]);
    (<HTMLInputElement>document.getElementById("firstName")).value=users[i].vorName;
    (<HTMLInputElement>document.getElementById("lastName")).value=users[i].nachName;
    (<HTMLInputElement>document.getElementById("emailAdress")).value=users[i].email;
    return i;
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
