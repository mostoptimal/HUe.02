"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = exports.User = void 0;
//User is an Object contains the Data FirstName ,Lastname, Email, Password
//wird im Backend benutzt
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
var users = new Array(); //Array from Object Users
exports.users = users;
//# sourceMappingURL=Users.js.map