const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('public'));
app.get("/", function(req, res){
    res.sendFile(__dirname+ "/signup.html");


});
app.post("/",function(req,res){
    const ln = req.body.LN;
    const fn = req.body.FN;
    const email = req.body.EM;
    console.log(ln+" "+fn+" "+email)

    const data = {
        members:[
            {
                email_address: email,
                status : "subscribed",
                merge_fields: {
                    FNAME: fn,
                    LNAME : ln,
                }

            }
        ]
    };
    const vdata = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/8c827365f2";
    const option = {
        method:"POST",
        auth: "anystring:195ea08bd4060161578423d5399dd204-us21",
    }
   const request =  https.request(url , option , function(response){
    if(response.statusCode===200){res.sendFile(__dirname+"/success.html");}
    else{res.sendFile(__dirname+"/failure.html")}
       response.on("data", function(data){
        console.log(JSON.parse(data));
       });
    });
 
         request.write(vdata);
         request.end();

});

app.post("/failure", function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT||3000, function () { console.log("server is activated on port 3000") });


//API KEY
// 195ea08bd4060161578423d5399dd204-us21
//Audience ID
// 8c827365f2