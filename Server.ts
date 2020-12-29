import * as express from "express";
import {User} from "./public/javascripts/Users"; //import User class
import {users} from "./public/javascripts/Users";//import Array of Users
import {json} from "express"; //import users Array (Array of (user)Objects)
const app = express();
//const users = require("./main");
const PORT = 3000;
//const users = require("./public/users.json");
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
/**
 * Example of Users
 **/
/*
const u1= new User("Momo","LL","q@@.cd","defw");
const u2= new User("Moegemo","LdgegeL","qs@eee.cefd","def56gujhw");
const u3= new User("OOOITTRJ7PPP","SMSM","q3rfw3s@hotm.de","876544rtg");
const u4= new User("jamiku","soko","jamiku@jp.co","slfhewiwefpiew321");
users.push(u1);
users.push(u2);
users.push(u3);
users.push(u4);
*/
/**
 * Example of Users
 **/

//get all users
app.get("/users", (req, res) => {
    res.json(users);
    console.log('Users sent');//Test
    console.log(users);//Test
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

//New User
app.post('/users/', (req: express.Request, res: express.Response) => {
    const newUser = {
        vorName: req.body.vorName,
        nachName: req.body.nachName,
        email: req.body.email,
        passWort: req.body.passWort,
    }
    if(!newUser.vorName||!newUser.nachName||!newUser.email||!newUser.passWort) {
        console.log(req.body.vorName, req.body.nachName, req.body.email, req.body.passWort);
        res.send("post Requested id ");
        //check with Email if the User exists
        const found = users.some(user => user.email === req.params.email);
        if(found){
            alert('the Email Adress is already exists');
        }else {
            //if the User not exists //push him in the Array
            users.push(new User(newUser.vorName, newUser.nachName, newUser.email, newUser.passWort));
            console.log(JSON.stringify(users));
        }

    }else{
        console.log("User Data can not be empty!!");
        res.status(400);
    }
});

//user update firstname and lastname
app.post("/users/:email", (req, res) => {
    const found = users.some(user => user.email === req.body.email);
    if (found) {
        const updUser = req.body;
        users.forEach(user => {
            if (user.email === req.body.email) {
                user.vorName = req.body.vorName;
                user.nachName = req.body.nachName;
                res.json({msg: 'member is updated'});
            }
        });
    } else {
        res.status(400).json({msg: "member is not found"});
    }
});

//delete User by finding Email
app.delete("/users/:email", (req, res) => {
    const found = users.some(user => user.email === req.body.email);
    for(var i=0; i<users.length;i++){
        if(users[i].email===req.body.email){
            users.splice(i,1);
            res.status(200);
        }else{
            console.log("user not found");
            res.status(400);
        }
    }
    console.log(users);

});
