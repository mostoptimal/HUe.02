import {User} from "./Users";
import {users} from "./Users";

document.addEventListener("DOMContentLoaded", function(event){
    alert("loaded");
});


function submitttng(){
    var newUser;
    newUser = document.getElementById("formNewUser").textContent;
}

var fName, lName, email, password;//public String Variables
function loadDoc() {
    fName = (<HTMLInputElement>document.getElementById("vorName")).value;
    lName = (<HTMLInputElement>document.getElementById("nachName")).value;
    email = (<HTMLInputElement>document.getElementById("email")).value;
    password = (<HTMLInputElement>document.getElementById("passWort")).value;

    if (fName === "" || lName === "" || email === "" || password === "") {
        alert("Missing Values please input all Details");
    } else {
        users.push(new User(fName,lName,email,password));
        JSON.stringify(users);
        (<HTMLInputElement>document.getElementById("vorName")).value = "";
        (<HTMLInputElement>document.getElementById("nachName")).value = "";
        email = (<HTMLInputElement>document.getElementById("email")).value= "";
        (<HTMLInputElement>document.getElementById("passWort")).value = "";
        alert("submitted " + fName);
    }
}

/*braucht bearbeiten*/
function readContent() {
    (<HTMLInputElement>document.getElementById("formNewUser")).value = '';
    var table = "<table><thead><tr><th >Vorname</th><th>Nachname</th><th>Email</th></tr></thead>";
    for (var i=0; i<users.length;i++){
        table +="<tr><td>"+users[i][0]+"</td><td>"+users[i][1]+"</td><td>"+users[i][2]+"</td></tr>";
    }
    table += "</table>";
    console.log(table);
    document.getElementById("usersTable").innerHTML = table;

}

/*Update Firstname and Lastname if the user exists*/
function updateUser(){
    var fname,lname,email;
    fname=(<HTMLInputElement>document.getElementById("vorName")).value;
    lname=(<HTMLInputElement>document.getElementById("nachName")).value;
    email=(<HTMLInputElement>document.getElementById("email")).value;
    if(!fname ||!lname ||!email){
        alert("please input the Firstname Lastname and the email");
    }else{
        var found;
        for(var i=0; i< users.length; i++){
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
