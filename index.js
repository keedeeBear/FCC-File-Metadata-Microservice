//setting up express
var express= require("express");
var multer = require("multer");
var fs     = require("fs");
var path   = require("path");
var app    = express();
// file destination
var upload = multer({dest:(path.join(__dirname,"/uploads"))});
var porty  = process.env.PORT || 8080;
//redirect home-page
var undone = "<p>Need to upload?</p>"   

app.set("view engine","pug");                                          
// set templates directory
app.set("views",path.join(__dirname+"/views"));                        
// asset /add public directory 
app.use(express.static(path.join(__dirname,"public")));                

// render homepage
app.get("/",function(req,res){
	res.render("index");                                               
});
app.post("/upload",upload.single("image"),function(req,res){
	 // if file did not select
	if (req.file===undefined){
		res.send(undone);                                              
	}
	// return json 
	res.json({name:req.file.originalname,size: req.file.size});       
	// delete uploaded file
	fs.unlink(req.file.path,function(err){						       
		if (err){return console.log(err)}
		console.log("Removed!")});	
});
  
// catch get call to "/upload"
app.get("/upload",function(req,res){                                   
	// redirect home-page
	res.send(undone);                                                  
});

var listener= app.listen(porty,()=>{
	console.log("Your app is listening on port: "+listener.address().port);
});
