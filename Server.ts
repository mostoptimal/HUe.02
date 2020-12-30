import * as express from "express";
import {json} from "express"; //import users Array (Array of (user)Objects)
const app = express();
const PORT = 3000;
//User Class
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
 * sadsad
 * Example of Users
 **/
const u1 = new User("Mofghgmo", "LdfghL", "qaa@aa.cad", "defw");
const u2 = new User("Moegemo", "LdgegeL", "qs@eee.cefd", "def56gujhw");
const u3 = new User("OOOITTRJ7PPP", "SMSM", "q3rfw3s@hotm.de", "876544rtg");
const u4 = new User("jamiku", "soko", "jamiku@jp.co", "slfhewiwefpiew321");
users.push(u1);
users.push(u2);
users.push(u3);
users.push(u4);
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
app.get("/users/user", (req, res) => {
    let userReq =req.body;
    const found = users.some(user => user.email === userReq.email);
    if (found) {
        res.json(users.filter(user => user.email === req.params.email));
    } else {
        res.status(400).json({msg: "member is not found"});
    }

});

//New User
app.post('/users/', (req, res) => {
    const newUser = {
        vorName: req.body.vorName,
        nachName: req.body.nachName,
        email: req.body.email,
        passWort: req.body.passWort,
    }
    if (!newUser.vorName || !newUser.nachName || !newUser.email || !newUser.passWort) {
        console.log("User Data can not be empty!!");
        res.status(400).json({msg: "User Data can not be empty!!"});
    } else {
        console.log(req.body.vorName, req.body.nachName, req.body.email, req.body.passWort);
        ///found with email , if found  u cann make a new user with same email
        //check with Email if the User exists
        const found = users.some(user => user.email === newUser.email);
        if (found) {
            console.log('the Email Adress is already exists');
            res.send("user dulplicated");
        } else {
            console.log("new user");
            //if the User not exists //push him in the Array
            users.push(new User(newUser.vorName, newUser.nachName, newUser.email, newUser.passWort));
            console.log(JSON.stringify(users));
            res.send("new User submitted");
        }
    }
});

//user update firstname and lastname
app.post("/users/update", (req, res) => {
    let userToUpdate = req.body;
    const found = users.some(user => user.email === userToUpdate.email);
    if (found) {
        users.forEach(user => {
            user.vorName = userToUpdate.vorName;
            user.nachName = userToUpdate.nachName;
            res.json({msg: `member ${userToUpdate.email} is updated`});
        });
    } else {
        res.status(400).json({msg: "member is not found"});
    }
});

//delete User by finding Email
app.delete("/users/:email", (req, res) => {

    const {email} = req.params; //deocntruct parameter

    res.send("lets delete the moderfucker");
    //boolean gibt if any user  diese email hat
    let deleted = users.find(user => user.email === email);
    if (deleted) {
        // filter = deelet the user with email  and gibt zruck array with alle andere Users
        users = users.filter(user => user.email != email);
        res.send("user deleted")
    } else {
        res.status(404).json({message: "user dosent exist"});
    }

    console.log(users);

});
