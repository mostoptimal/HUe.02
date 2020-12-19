//User is an Object contains the Data FirstName ,Lastname, Email, Password
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
export {User};
export {users};
