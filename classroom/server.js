const express = require("express");
const app = express();
const router = express.Router();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionOption = {
  secret: "mysupersecretstring",
  resave: false,
  saveUninitialized: true,
};

app.use(session(sessionOption));
app.use(flash());

app.use((req,res,next)=>{
  res.locals.successMsg = req.flash("success");
  res.locals.errorMsg = req.flash("error");
next();
})



app.get("/register", (req, res) => {
  let { name = "krishna" } = req.query;
  req.session.name = name;
  if (name == "krishna") {
    req.flash("error", "User not registers");
  } else {
    req.flash("success", "User registered successfully");
  }
  res.redirect("/hello");
});

app.get("/hello", (req, res) => {
  res.render("register.ejs", { name: req.session.name });
});

// app.get("/requestid",(req,res)=>{
//   if (req.session.count) {
//     req.session.count++;
//   }
//   else{
//     req.session.count = 1
//   }
//   res.send(`session tracking is${req.session.count}`);
// })
//session
// app.get("/test", (req, res) => {
//   res.send("succsessfully save");
//});

// app.use(cookieParser("secretcode"));

// app.get("/getsignedCookie",(req,res)=>{
// res.cookie("made-in","india" ,{signed : true});
// res.send("signed cookie are save");
// });

// app.get("/verify",(req,res)=>{
//   console.log(req.signedCookies);
//   res.send("verified");
//   // res.send(req.signedCookies);
// })

// app.get("/setCookies",(req,res)=>{
//  res.cookie('greet', "namaste");
//  res.cookie("made","India");
//  res.send("we sent cookies!");
// });

// app.get("/greet",(req,res)=>{
//   let{name = "anonymous"} = req.cookies;
//   res.send(`hi,${name}`);
// })

// app.get("/",(req,res)=>{
//   console.dir(req.cookies);
//   res.send("cookies show");
// });
// app.get('/', (req, res) => {
//  res.send("succccessfull");
// });

// app.post('/user', (req, res) => {
//   res.send("post request");
// });

app.listen("8080", () => {
  console.log("App listening on port 8080!");
});
