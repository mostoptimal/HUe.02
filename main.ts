
document.addEventListener('DOMContentLoaded', (event) => {
    console.log("Document fully Loaded...");
    loadDoc();
});


function submitttng(){
    var newUser;
    newUser = document.getElementById("formNewUser").textContent;
}

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

const users= new Array<User>();

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
    document.getElementById('formNewUser').value = '';
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
    fname=document.getElementById("vorName").value;
    lname=document.getElementById("nachName").value;
    email=document.getElementById("email").value;
    if(!fname ||!lname ||!email){
        alert("please input the Firstname Lstname and the email");
    }else{
        for(var i=0; i< users.length; i++){
            if(email===users[i].email){
                users[i].vorName=fname;
                users[i].nachName=lname;
                alert("user " + users[i].vorName + "has been updated");
                document.getElementById("vorName").value="";
                document.getElementById("nachName").value="";
                document.getElementById("email").value="";
            }else {
                alert("the User is not Exist");
            }
        }
    }
}
