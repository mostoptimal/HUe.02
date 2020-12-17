import * as express from "express";

const app = express();
const users= require("./users");
const PORT=3000;
const members = require("./public/users.json");//to save users into json file

app.listen(PORT, () => {
    console.log("Server auf http://localhost:3000 gestartet");
});

//Die sog. Bodyparser wandeln JSON- (bzw. URLencoded-) Strings in nutzbare Objekte um
app.use(express.json());
app.use(express.urlencoded({extended: false}));
//Aliase für öffentliche Ordner, der eigentliche Pfad / Ordnername wird hinter einer URL versteckt
//Aus der URL localhost:8080/res/images/profil.png wird die Datei ./public/images/profil.png
app.use("/res", express.static(__dirname + "/public"));
app.use("/dependency", express.static(__dirname + "/node_modules"));
//Die Startseite als "/" liefert immer per sendFile eine Webseite (HTML-Datei) zurück
app.get("/", (req: express.Request, res: express.Response) => {
    res.status(200);
    res.sendFile(__dirname + "/views/index.html");
});
//get all users
app.get("/users",(req,res)=>{
    res.json(users);
    members.json(req.json(users));
});
//get one user by using email as ID
app.get("/users/:email",(req,res)=>{
 const found = users.some(user => user.email === req.params.email);
 if(found){
     res.json(users.filter(user => user.email === req.params.email));
 }else{
     res.status(400).json({msg: "member is not found"});//If the user not existed in the Array
 }

});
//New User !funktioniert nicht
app.post('/users',(req,res)=>{
    const newUser = {
        vorName: req.body.vorName,
        nachName: req.body.nachName,
        email: req.body.email,
        passWort:req.body.passWort
    }
    if (!newUser.vorName || !newUser.nachName|| !newUser.email || !newUser.passWort){
        return res.status(400).json({msg:' Please enter full Form '});
    }
    users.push(newUser);
    res.json(users);
});
//user update
app.put("/users/:email",(req,res)=>{
    const found = users.some(user => user.email === req.params.email);
    if(found){
        const updUser = req.body;
        users.forEach(user => {
            if(user.email === req.body.email){
                user.vorName= req.body.vorName;
                user.nachName= req.body.nachName;

                res.json({msg: 'member is updated'});
            }
        });
    }else{
        res.status(400).json({msg: "member is not found"});
    }

});

//delete User
app.delete("/users/:email",(req,res)=>{
    const found = users.some(user => user.email === req.params.email);
    const index = users.indexOf(user => user.email == req.params.email);
    console.log(users.indexOf(index));
    if (found){

    }
});
