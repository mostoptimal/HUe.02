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

//User Object
class User{
    vorName:String;
    nachName: String;
    email:String;
    password:String;
    constructor (vorname:String,lname:String,email:String,pass:String) {
        this.vorName=vorname;
        this.nachName=lname;
        this.email=email;
        this.password=pass;
    }
}
//Array from Object User
let users= new Array<User>();
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
        users.push(new User(fName,lName,email,password));
        console.log(users);
        sendDataToServer(new User(fName,lName,email,password));//die function mit POST Request
        JSON.stringify(users);
        console.log(users);
        (<HTMLInputElement>document.getElementById("vorName")).value = "";
        (<HTMLInputElement>document.getElementById("nachName")).value = "";
        email = (<HTMLInputElement>document.getElementById("email")).value= "";
        (<HTMLInputElement>document.getElementById("passWort")).value = "";
        alert("submitted " + fName +" "+ lName);
    }
}

//show the Table of Users Button:"Show Users Infos"
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

/*Update Firstname and Lastname if the user exists*/
function updateUser(){
    let fname,lname,email;
    let found;
    fname=(<HTMLInputElement>document.getElementById("vorName")).value;
    lname=(<HTMLInputElement>document.getElementById("nachName")).value;
    email=(<HTMLInputElement>document.getElementById("email")).value;
    if(!fname ||!lname ||!email){
        alert("please input the Firstname Lastname and the email");
    }else{
        for(let i=0; i< users.length; i++){
            if(email===users[i].email){
                users[i].vorName=fname;
                users[i].nachName=lname;
                alert("user " + users[i].vorName + "has been updated");
                (<HTMLInputElement>document.getElementById("vorName")).value="";
                (<HTMLInputElement>document.getElementById("nachName")).value="";
                (<HTMLInputElement>document.getElementById("email")).value="";
                found=true;
            }else{
                found=false;
            }
        }
    }if (!found){
        alert("user doesn't exist");
    }
}

function deleteUser(){
    email = (<HTMLInputElement>document.getElementById("email")).value;
    for (let i=0; i<users.length; i++){
        if (email==users[i].email){
            users.splice(i,1);
        }else{
            alert('The Entered Email is not for any Registered User');
        }
    }
    console.log(users);
}

//HTTP/AJAX POST Request
function sendDataToServer(user1:User){
    let data = user1;
    console.log('user1');//
    console.log(user1);//
    let xhr = new XMLHttpRequest();
    console.log('new XMLHttpRequest()');//
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            console.log(this.responseText);
        }
    });
    xhr.open("POST", "http://localhost:3000/users/");
    console.log('xhr.open');
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
    console.log('data');
}

//HTTP/AJAX GET Request
function getDataFromServer(){
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    xhr.open("GET", "http://localhost:3000/users");
    xhr.send();
    let responseTextAsJSON=JSON.stringify(xhr.responseText);
    console.log(responseTextAsJSON);
    return responseTextAsJSON;
}
//Update (POST) Request
function updateDataIntoServer(){
    //Postman
}
//Delete Request
function deleteDataFromServer(){
    //postman
}
