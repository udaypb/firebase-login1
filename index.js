var firebase = require("firebase");
//var firebase=firebase();
var express=require('express');
var app=express();

var body_parser=require('body-parser');

//var firebase_link= new firebase('https://console.firebase.google.com/project/node-app-237cd/');
var provider = new firebase.auth.GoogleAuthProvider();
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:false}));
app.set('view options', {
    layout: false
});
app.set('view engine','jade');	
var config = {
    apiKey: "AIzaSyB8HkC41QV2SFZMBXks-NinbF1e0XYpv0c",
    authDomain: "node-app-237cd.firebaseapp.com",
    databaseURL: "https://node-app-237cd.firebaseio.com",
    storageBucket: "node-app-237cd.appspot.com",
    messagingSenderId: "500961740001"
  };

firebase.initializeApp(config);


app.get('/google-log',function(req,res){
	res.render('google_html');
});
app.post('/google_sign',function(req,res){

		var token_id=req.body;
		console.log(token_id);
		var token= Object.keys(token_id)[0];// ------the token_id received is in json format so i am extracting the first key which is the token provided by google
		console.log(token);
		//--------------------------------creating credential for firebase login using the token_id
	 var credential = firebase.auth.GoogleAuthProvider.credential(token);
	 console.log("-----------------------------------------------------------------------------------------");
// Sign in with credential from the Google user.
firebase.auth().signInWithCredential(credential).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  
  var email = error.email;
  
  var credential = error.credential;
  console.log("-------------------------credential error at firebase-------------------"+error);
  res.json({msg:error});
}).then(function(){
   res.json({msg:"success"});



   console.log("user successfully logged in using google account!");

});
});

app.get('/users',function(req,res){

  firebase.auth().onAuthStateChanged(function(user){

    if(user){
      res.json({users_logged_in: user});
      console.log("----------------------------------------------------------");
      console.log(user);

    }else{

      res.json({msg:"no user signed in!!"});
      console.log("=====================================no user logged in!===================================");
    }
  });


});

app.listen(3000);
console.log('connect success!!00');


