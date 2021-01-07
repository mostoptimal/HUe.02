import * as express from "express";
import {User} from './public/javascripts/Users';
import {SecuesUser} from './public/javascripts/Users';

const app = express();
const PORT = 3000;

//Array from Object User
let users = new Array<User>();
let securedUsers = Array<SecuesUser>();
//******************************
app.listen(PORT, () => {
    console.log("Server auf http://localhost:3000 gestartet");
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/", express.static(__dirname + "/public"));
app.use("/dependency", express.static(__dirname + "/node_modules"));

//To Bypass CORS Policy Problem on Google Chrome
app.all('/', function (req:express.Request, res:express.Response) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
});

app.get("/index.html", (req:express.Request, res:express.Response) => {
    res.status(200).json({msg:"Hompage Loaded!"});
    res.sendFile(__dirname + "/public/index.html");
});

/**
 * Examples of Users
 **/
const u1 = new User("John", "Schwarz", "Joe.schw@aol.com", "308doieh3d");
const u2 = new User("Ivy Harrell", "Burton", "Nullam@felis.co.uk", "def56gujhw");
const u3 = new User("Evangeline", "Preston", "Aenean.euismod@Vivamusmolestiedapibus.co.uk", "876544rtg");
const u4 = new User("jamiku", "soko", "jamiku@jp.co", "slfhewiwefpiew321");
users.push(u1);
users.push(u2);
users.push(u3);
users.push(u4);
/**
 * Examples of Users
 **/

//get all users
app.get("/users", (req:express.Request, res:express.Response) => {
    for (let i=0; i<users.length;i++){
        delete users[i].password;
    }
    res.status(200).json(users);
    console.log('Users sent'); //Console Output Test
    console.log(users);
});
//get one user per email
app.get("/users/user", (req:express.Request, res:express.Response) => {
    let userReq = req.body;
    //returns True if an Element (User) exists in the Array
    let found = users.some(user => user.email === userReq.email);
    if (found) {
        // resend the searched Object from the Array
        res.status(200).json(users.filter(user => user.email === req.params.email));
    } else {
        res.status(400).json({msg: "The Database doesn't content any User with this Email"});
    }
});

//New User //submit new user
app.post('/users/user', (req:express.Request, res:express.Response) => {
    //To Test if an Empty {JSON} Body sent (if NOT) then:
    if (req.body.vorName === "" || req.body.nachName === "" || req.body.passWort === "" || req.body.email === "") {
        console.log("User Data can not be empty ,Please full down all Fields!!");
        res.status(400).json({msg: "User Data can not be empty!!"});
        // If the Client Side sent Empty data or Missing Field
    } else {
        console.log("new user");
        //check with Email if the User already exists
        const found = users.some(user => user.email === req.body.email.email);
        if (found) {
            console.log('the Email Address is already exists');
            res.status.json({msg:"user can't be duplicated!!"});
        } else {
            let newUser= new User(req.body.vorName,req.body.nachName,req.body.email,req.body.password);
            //if the User not exists //push him in the Array
            users.push(newUser);
            console.log(JSON.stringify(users));
            res.status(201).json({msg:"new User submitted"});
        }
    }
});

/*
//user update firstname and lastname
app.post("/users/update", (req:express.Request, res:express.Response) => {
    let userToUpdate = req.body;
    let found = users.some(user => user.email === userToUpdate.email);
    //cambio
    //check poasswort is not in body
    if (req.body.hasOwnProperty('password')) {
        res.status(400).json({msg: "you cann not change the password"});
    } else {
        let foundedUser = users.find(user => user.email === userToUpdate.email);
        if (found) {
            console.log(foundedUser);
            //to Change the actual User not a Copy
            foundedUser.vorName = userToUpdate.vorName;
            foundedUser.nachName = userToUpdate.nachName;
            console.log(users);
            res.status(200).json({msg: `member ${userToUpdate.email} is updated`});
        } else {
            res.status(400).json({msg: "member is not found"});
        }
    }
});*/

//Put to Update user
app.put("/users/update", (req:express.Request, res:express.Response) => {
    let userToUpdate = req.body;
    let found = users.some(user => user.email === userToUpdate.email);
    //cambio
    //check poasswort is not in body
    if (req.body.hasOwnProperty('password')) {
        res.status(400).json({msg: "you can not change the password"});
    } else {
        let foundedUser = users.find(user => user.email === userToUpdate.email);
        if (found) {
            console.log(foundedUser);
            //to Change the actual User not a Copy
            foundedUser.vorName = userToUpdate.vorName;
            foundedUser.nachName = userToUpdate.nachName;
            console.log(users);
            res.status(200).json({msg: `member ${userToUpdate.email} is updated`});
        } else {
            res.status(400).json({msg: "member is not found"});
        }
    }
});

//delete User by finding Email
app.delete("/users/user", (req:express.Request, res:express.Response) => {
    let {email} = req.body;
    //find returns true for founded Object ,false for not founded
    let found = users.find(user => user.email === email);
    if (found) {
        // filter = delete the user with email and returns an array without this Element //gibt zruck array with alle andere Users
        users = users.filter(user => user.email != email);
        res.status(200).json({msg: `The User with Email: ${email} has been deleted`});
    } else {
        res.status(404).json({msg: `The Email ${email} doesn't exist`});
    }
    console.log(users);

});
