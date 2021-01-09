
window.onload=function() {
    console.log('DOM fully loaded and parsed');
    document.getElementById("submitBtn").addEventListener("click",()=>{
        let form=document.getElementById("formNewUser").innerText;
        submitNewUser(form);
        console.log(form);
        //submitNewUser(JSON.stringify(form));

        //sendDataToServer(document.getElementById("formNewUser").innerText);
        //Event Listener for the Update User Button
        document.getElementById("updateBtn").addEventListener("click",(event)=>{
            updateUser();
        });
    });
//Event Listener for the Submit User Button
/*document.getElementById("submitBtn").addEventListener("click",(event)=>{
    submitNewUser();
});*/

    document.addEventListener('keypress', (event) => {
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            document.getElementById("submitBtn").click();
        }
    });
}

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
let fName:String, lName:String, email:String, password:String;//public String Variables
//-------------------------submitNewUser-----------------------------------
//The function for the Button "Submit"
function submitNewUser(form) {

    //let form = document.getElementById("formNewUser") as HTMLFormElement;

    fName = (<HTMLInputElement>document.getElementById("vorName")).value;
    lName = (<HTMLInputElement>document.getElementById("nachName")).value;
    email = (<HTMLInputElement>document.getElementById("email")).value;
    password = (<HTMLInputElement>document.getElementById("passWort")).value;
    //if there is Values
    if (fName && lName && email && password) { //(""===null===false)?
        if (users.some(user => user.email === email)) {
            alert("User already exists in the Database!");
        } else {
            sendDataToServer(new User(fName, lName, email, password));//The POST function Request
            console.log("New User: " + fName, lName, email, password);
            //users.push(new User(fName, lName, email, password));
            console.log(users);//to test the Result in Console
            (<HTMLInputElement>document.getElementById("vorName")).value = "";
            (<HTMLInputElement>document.getElementById("nachName")).value = "";
            (<HTMLInputElement>document.getElementById("email")).value = "";
            (<HTMLInputElement>document.getElementById("passWort")).value = "";
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
    } else {
        alert("Please full down all Fields!");
    }

}

//HTTP/AJAX POST/PUT Request
function sendDataToServer(user1) {
    let data =JSON.stringify(user1);
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
    //alert(xhr.responseText); //toString();//
    console.log(data + " send to server!");
}

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
        updateDataInTheServer(newUser); // AJAX POST/PUT Methode
        (<HTMLInputElement>document.getElementById("firstName")).value = "";
        (<HTMLInputElement>document.getElementById("lastName")).value = "";

    }
//    document.getElementById(index.toString()).childNodes[0].nodeValue=fName;
}

/**Update (POST/PUT) Request*/
function updateDataInTheServer(user) {
    let xhr = new XMLHttpRequest();
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

//-----------------------------------------------------------------------
//-------------------------Delete User-----------------------------------
/**Delete the Row (Frontend) from the Table
 * and calls the AJAX Method to send Delete Request to the Server */
function deleteUser(DelButton) {
    let table = document.getElementById("usersTable") as HTMLTableElement;
    let index = (DelButton.parentNode.parentNode.rowIndex);
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
    let axios = require('axios');
    let data = JSON.stringify({email: email});

    let config = {
        method: 'delete',
        url: 'http://localhost:3000/users/user',
        headers: {
            'Content-Type': 'application/json'
        },
        data : data
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
}
//-------------------------Delete User-----------------------------------
//-----------------------------------------------------------------------
//-------------------------GET Request-----------------------------------
//HTTP/AJAX/axios GET Request
function getDataFromServer() {
    let axios = require('axios');

    let config = {
        method: 'get',
        url: 'http://localhost:3000/users',
        headers: { }
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            users = response;
            buildTable(users);
        })
        .catch(function (error) {
            console.log(error);
        });
}
//--------------------------------Build Table-----------------------------------------
// Users Table in index.html
function buildTable(data: Array<User>) {
    let rowNumber = 1;
    let docTable = (<HTMLInputElement>document.getElementById("usersTable"));

    let table = "<table class=\"titles\"><thead><tr><th >Vorname</th><th>Nachname</th><th>Email</th><th>Aktionen</th></tr></thead>";
    for (let i = 0; i < data.length; i++) {
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
    let i = (zeile.parentNode.parentNode.rowIndex) - 1;
    console.log(i);
    console.log(users[i]);
    (<HTMLInputElement>document.getElementById("firstName")).value = users[i].vorName.toString();
    (<HTMLInputElement>document.getElementById("lastName")).value = users[i].nachName.toString();
    (<HTMLInputElement>document.getElementById("emailAdress")).value = users[i].email.toString();
    return i;
}
