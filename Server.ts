import * as express from "express";
import {User} from "./public/javascripts/Users"; //import User class
//import {users} from "./main"; //import users Array (Array of (user)Objects)
const app = express();
//const users = require("./main");
const PORT = 3000;
const users = require("./public/users.json");
app.listen(PORT, () => {
    console.log("Server auf http://localhost:3000 gestartet");
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/res", express.static(__dirname + "/public"));
app.use("/dependency", express.static(__dirname + "/node_modules"));

app.get("/public/index.html", (req: express.Request, res: express.Response) => {
    res.status(200);
    res.sendFile(__dirname + "/views/index.html");
});
//get all users
app.get("/users", (req, res) => {
    res.json(users);
    users.json(res.json(users));
});
//get one user per email
app.get("/users/:email", (req, res) => {
    const found = users.some(user => user.email === req.params.email);
    if (found) {
        res.json(users.filter(user => user.email === req.params.email));
    } else {
        res.status(400).json({msg: "member is not found"});
    }

});

//New User !funktioniert nicht
app.post('/users/', (req: express.Request, res: express.Response) => {
    const newUser = {
        vorName: req.body.vorName,
        nachName: req.body.nachName,
        email: req.body.email,
        passWort: req.body.passWort,
    }
    console.log(req.body.vorName, req.body.nachName, req.body.email, req.body.passWort);
    res.send("post Requested id ");
    users.push(new User(req.body.vorName, req.body.nachName, req.body.email, req.body.passWort));
    users.push(newUser);
    res.send(users);
});

//user update firstname and lastname
app.put("/users/:email", (req, res) => {
    const found = users.some(user => user.email === req.params.email);
    if (found) {
        const updUser = req.body;
        users.forEach(user => {
            if (user.email === req.body.email) {
                user.vorName = req.body.vorName;
                user.nacName = req.body.nachName;
                res.json({msg: 'member is updated'});
            }
        });
    } else {
        res.status(400).json({msg: "member is not found"});
    }
});

//delete User by finding Email
app.delete("/users/:email", (req, res) => {
    const found = users.some(user => user.email === req.params.email);
    const index = users.filter(user => user.email === req.params.email);
    if (found) {
        users.remove(users[index]);
    } else {
        res.JSON({msg: "This Email is for user not found"});
    }
});
