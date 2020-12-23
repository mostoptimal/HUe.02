//import {User} from "./Users";
//import {users} from "./Users";
window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    submitNewUser();
    showAllUsersInTable();
    updateUser();
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
const users= new Array<User>();


/*
function submitttng(){
    var newUser;
    newUser = document.getElementById("formNewUser").textContent;
}
*/
let fName, lName, email, password;//public String Variables

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
        JSON.stringify(users);
        (<HTMLInputElement>document.getElementById("vorName")).value = "";
        (<HTMLInputElement>document.getElementById("nachName")).value = "";
        email = (<HTMLInputElement>document.getElementById("email")).value= "";
        (<HTMLInputElement>document.getElementById("passWort")).value = "";
        alert("submitted " + fName);
    }
}


function showAllUsersInTable() {
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
        }
    }
}
