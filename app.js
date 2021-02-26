const express = require("express");
const bodyParser = require("body-parser")
const request =require("request");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));


app.use(express.static("public"));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
    const Fname = req.body.Fname;
    const Lname = req.body.Lname;
    const email = req.body.email;

    const data = {
        members:[
            {
                email_address: email,
                status:"subscribed",
                merge_fields:{
                    FNAME: Fname,
                    LNAME: Lname
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us7.api.mailchimp.com/3.0/lists/dd87eb943a";

    const options ={
        method :"POST",
        auth:"AnyString:76cb9ce6bb69dac6cc1db74e34bc7c7a-us7"
    }

    const request = https.request(url,options,function(response){
        const statusCode = response.statusCode;
        if(statusCode == 200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html")
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
});

app.post("/failure",function(req,res){
    res.redirect("/");
})









app.listen(3000 || process.env.PORT,()=>{
    console.log("running on 3000");
})

//api key mailchimp:76cb9ce6bb69dac6cc1db74e34bc7c7a-us7

//audience id:
// dd87eb943a