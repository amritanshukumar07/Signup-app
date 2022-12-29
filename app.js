const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
var path = require('path');

app.use(express.static(path.resolve('./public')));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true})) ;



app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
const firstName = req.body.fName;
const lastName = req.body.lName;
const email = req.body.email;
const data ={
    members:[
    {
      email_address: email,
      status:"subscribed",
      merge_fields:{
        FNAME: firstName,
        LNAME: lastName
      }
    }
    ]
  };

  const jsonData = JSON.stringify(data);

const url = "https://us17.api.mailchimp.com/3.0/lists/a9e218d66d"
const options ={
  method:"POST",
  auth:"amritanshu:7c71551b010de18412d70e265637dbdc-us17"
}


const request = https.request(url,options,function(response){
if(response.statusCode ===200){
  res.sendFile(__dirname + "/success.html");
}
else{
    res.sendFile(__dirname + "/failure.html");
}

   response.on("data",function(data){
     console.log(JSON.parse(data));
   });
 });
  request.write(jsonData);
  request.end();
});

app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("server is rumming on port 3000");
});


 //7c71551b010de18412d70e265637dbdc-us17
// b3c457d1de1be2c8015e72579c907c0b-us17c

// a9e218d66d
