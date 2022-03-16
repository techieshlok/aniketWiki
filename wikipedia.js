const express = require("express");
const bodyparser = require("body-parser");
const https =require("https");

const app = express();
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");

app.get("/",function(req,res){
    res.sendFile(__dirname +"/index.html");
});

app.post("/",function(req,res){
    var ani =req.body.Unlnown;
    var url = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&formatversion=2&exsentences=10&exlimit=1&explaintext=1&titles="+ani+"";
    https.get(url,function(response){
        response.on("data",function(data){
            var wiki=JSON.parse(data);
           // res.write("<h2>"+wiki.query.pages[0].extract+"</h2>")
            res.render("index1",{
                list:wiki.query.pages[0].extract,list1:ani
            });
        });
    });
    
});


app.listen(3000,function(){
    console.log("i am listening at 3000");
});
