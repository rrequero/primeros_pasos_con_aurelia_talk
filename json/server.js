var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();


var allowCrossDomain = function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")

	next();
}
app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());



var registers =  [
	{
		name:"Juan Antonio",
		number:"636585847"
	},{
		name:"Maria Luisa",
		number:"914784755"
	},{
		name:"Roberto García",
		number:"987547447"
	}];

	
/**
Definimos las rutas de nuestro CRUD
**/
var router = express.Router();

router.get('/registers', function(req, res) {
	
	res.json(registers);
				
});

router.get('/registers/:name', function(req, res) {
	for(var i = 0; i< registers.length; i++){
		if(registers[i].name == req.params.name){
			res.json(registers[i]);
			return;
		}		
	}
	res.send("");
});

router.post('/registers', function(req, res) {

	var exist = false;
	for(var i = 0; i< registers.length; i++){
		if(registers[i].name == req.body.name){
			exist = true;
			break;
		}		
	}
	if(!exist){
		registers.push(req.body);
		res.json(req.body);
	}else{
		res.status(510);
		res.send("Duplicated register");
	}

});

router.put('/registers/:name', function(req, res) {

	var register = null;
	for(var i = 0; i< registers.length; i++){
		if(registers[i].name == req.params.name){
			register = registers[i];
			break;
		}		
	}
	if(register != null){
		register.number = req.body.number;
		res.send("");

	}else{
		res.status(510);
		res.send("Register not exist");
	}  
});

router.delete('/registers/:name', function(req, res) {
	var pos = -1;
	for(var i = 0; i< registers.length; i++){
		if(registers[i].name == req.params.name){
			pos = i;
			break;
		}		
	}
	if(pos != -1){
		registers.splice(pos, 1);
		res.send("");
	}else{
		res.status(510);
		res.send("Error delete register");
	}

});

app.use("/", router);

app.set('port', process.env.PORT || 3000);
//arrancamos el servidor
var server = app.listen(app.get('port'), function() {
 console.log('Express server listening on port ' + server.address().port);
});


