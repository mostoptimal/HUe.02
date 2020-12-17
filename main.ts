/*
document.addEventListener('DOMContentLoaded', (event) => {
    console.log("Document fully Loaded...");
    loadDoc();
});
*/

function loadDoc() {
    var fName,lName,email,password;
    fName=document.getElementById("vorName").textContent;
    lName=document.getElementById("nachName").textContent;
    email=document.getElementById("email").textContent;
    password=document.getElementById("passWort").textContent;
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
    xmlhttp.onreadystatechange = function() {
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
    var table="<tr><th>Vorname</th><th>Nachname</th><th>email</th></tr>";
    var x = xmlDoc.getElementsByTagName("User");
    for (i = 0; i <x.length; i++) {
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

/*
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
*/

