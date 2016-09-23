var firebase = require("firebase");
//var firebase=firebase();
var express=require('express');
var app=express();

var body_parser=require('body-parser');

//var firebase_link= new firebase('https://console.firebase.google.com/project/node-app-237cd/');


app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:false}));
app.set('view options', {
    layout: false
});

var config = {
    apiKey: "AIzaSyB8HkC41QV2SFZMBXks-NinbF1e0XYpv0c",
    authDomain: "node-app-237cd.firebaseapp.com",
    databaseURL: "https://node-app-237cd.firebaseio.com",
    storageBucket: "node-app-237cd.appspot.com",
    messagingSenderId: "500961740001"
  };

firebase.initializeApp(config);

app.post('/login',function(req,res){

var username=req.body.username;
var pass=req.body.password;
firebase.auth().signInWithEmailAndPassword(username, pass).catch(function(error) {
  // Handle Errors here.
  
  var errorCode = error.code;
  var errorMessage = error.message;
  
  	console.log(error);
  	res.json({msg:error});

    }).then(function(){

      res.json({msg:"user logged in!"});

    });

  // ...
});

app.post('/logout',function(req,res){

	firebase.auth().signOut().then(function(){
      res.json({msg:"user logged out"});


	},function(error){
      res.json({msg:"error"});
      console.log(error);

  });
});
app.get('/users',function(req,res){

  firebase.auth().onAuthStateChanged(function(user){

    if(user){
      res.json({users_logged_in: user});
    }else{

      res.json({msg:"no user signed in!!"});
      
    }
  });


});


app.listen(3000);
console.log('connect success!!00');