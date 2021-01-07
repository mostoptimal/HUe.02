"use strict";
//User is an Object contains the Data FirstName ,Lastname, Email, Password
//wird im Backend benutzt
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecuesUser = exports.User = void 0;
var User = /** @class */ (function () {
    function User(firstname, lname, email, pass) {
        this.vorName = firstname;
        this.nachName = lname;
        this.email = email;
        this.password = pass;
    }
    return User;
}());
exports.User = User;
var SecuesUser = /** @class */ (function () {
    function SecuesUser(firstname, lname, email) {
        this.vorName = firstname;
        this.nachName = lname;
        this.email = email;
    }
    return SecuesUser;
}());
exports.SecuesUser = SecuesUser;
