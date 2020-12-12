import * as express from "express";

const app = express();
const users= require("./main");
const PORT=3000;



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

app.get("/users",(req,res)=>{
 res.json(users);
});
