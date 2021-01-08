//User is an Object contains the Data FirstName ,Lastname, Email, Password
//wird im Backend benutzt

class User {
    vorName: String;
    nachName: String;
    email: String;
    password: String;

    constructor(firstname: String, lname: String, email: String, pass: String) {
        this.vorName = firstname;
        this.nachName = lname;
        this.email = email;
        this.password = pass;
    }
}

class SecuredUser {
    vorName: String;
    nachName: String;
    email: String;

    constructor(firstname: String, lastname: String, email: String) {
        this.vorName = firstname;
        this.nachName = lastname;
        this.email = email;
    }
}

export {User};
export {SecuredUser};
