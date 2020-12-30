//User is an Object contains the Data FirstName ,Lastname, Email, Password
//wird im Backend benutzt
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
//let users= new Array<User>();//Array from Object Users
export {User};
//export {users};
