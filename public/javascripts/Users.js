"use strict";
//User is an Object contains the Data FirstName ,Lastname, Email, Password
//wird im Backend benutzt
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var User = /** @class */ (function () {
    function User(vorname, lname, email, pass) {
        this.vorName = vorname;
        this.nachName = lname;
        this.email = email;
        this.password = pass;
    }
    return User;
}());
exports.User = User;
//export {users};
