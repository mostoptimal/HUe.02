"use strict";
//User is an Object contains the Data FirstName ,Lastname, Email, Password
//wird im Backend benutzt
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecuredUser = exports.User = void 0;
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
var SecuredUser = /** @class */ (function () {
    function SecuredUser(firstname, lastname, email) {
        this.vorName = firstname;
        this.nachName = lastname;
        this.email = email;
    }
    return SecuredUser;
}());
exports.SecuredUser = SecuredUser;
