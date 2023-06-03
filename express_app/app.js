const express=require("express");
const Web3=require("web3");
const HDwalletprovider=require("truffle-hdwallet-provider");
const bparser=require("body-parser");
// const session=require("express-session");
// const mongoStore=require("connect-mongo")(session);
const session = require('express-session');
const mongoStore = require('connect-mongo');
const mongoose=require('mongoose');

const signupr=require("./controllers/signupr");
const signupd=require("./controllers/signupd");
const login=require("./controllers/login");
const homer=require("./controllers/homer");
const homed=require("./controllers/homed");
const test=require("./controllers/test");

const abi=require("./user_contract").abi2;
const address=require("./user_contract").address2;

const CurrentRide=require("./models/Auction");
const createIdentity=require("./controllers/create_identity"); 

// mongoose.connect('mongodb+srv://getsetpool:getsetpool@cluster0.7agbm.mongodb.net/ridex?retryWrites=true&w=majority', {useNewUrlParser: true});
const connectDatabase = async () => {
    try {
      mongoose.set("useNewUrlParser", true);
      
      await mongoose.connect('mongodb://localhost:27017/car_pool' );
  
      console.log("connected to database");
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  connectDatabase();
const app=express();

app.set('view engine','ejs');
app.use(session({
    secret:"sometext",
    resave:false,
    saveUninitialized: false,
    store: mongoStore.create({ mongoUrl: 'mongodb://localhost:27017/car_pool' })
  }));
// app.use(session({
//     key:"user_sid",
//     secret:"sometext",
//     resave:false,
//     saveUninitialized: false,
//     // store:new mongoStore({
//     //     url:'mongodb://localhost:27017/RideX',
//     //     autoRemove:false
//     // })

// }));
app.use(express.static('./public'));
app.use(bparser.urlencoded({extended:true}));
app.use(bparser.json());

app.get("/",async (req,res)=>{
    var identity=createIdentity();
    console.log(identity, "identity");
    // req.session.username="delemacdele";
    // req.session.privateKey=identity.privateKey;
    // req.session.userType='Rider';
    // req.session
    // if(req.session.username!==undefined)
    // {
    //     console.log(req.session.userType);
    //     if(req.session.userType==="Driver"){
    //         res.redirect("/homed");
    //     }else{
    //         res.redirect("/homer");
    //     }

    // }
    // else{
    //     res.render("index",{message:null});
    // }
    res.render("index",{message:null});

});

app.get("/signup",async(req,res)=>{
    
    res.render("sign");
});


app.listen(3000,()=>{
    console.log("listening to PORT 3000");
});

test(app);
signupr(app);
signupd(app);
login(app);
homer(app);
homed(app);


