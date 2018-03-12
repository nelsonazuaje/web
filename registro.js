var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

var connection = mysql.createConnection({

  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'venturismo'

});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/registro.html');
});


app.post('/data', function(req, res){
    var identificacion = req.body.id;
    var names = req.body.nombres;
    var age = req.body.edad;
    var phone = req.body.tlf;
    var mail = req.body.email;
    var address = req.body.dir;
    var pass = req.body.contraseña;
    connection.query("INSERT INTO cliente (idcliente, nombre, edad, telefono, correo, direccion, contraseña) VALUES ('"+identificacion+"', '"+names.toString()+"','"+age+"','"+phone.toString()+"','"+mail.toString()+"','"+address.toString()+"','"+pass.toString()+"')", function(err, result){
        if(err) throw err;
            console.log("1 record inserted");
        });
    res.send("POST request to the homepage");
});

//connection.end();

app.listen(3000, function () {
console.log('Example app listening on port 3000');
});