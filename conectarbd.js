var mysql = require('mysql');
var express = require('express');
var body_parser = require('body-parser');
var app = express();
app.use(body_parser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/'));

const server=app.listen(8000, () => {
  console.log('Servidor web iniciado');
});

var conectar = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "venturismo"
    }
);

conectar.connect(function(err){
   if(err){
      throw err;
   }else{
      console.log('Conexion correcta.');
   }
});


app.post('/user.html', function (req, res) {
    var nombre = req.body.nombre;
    var pass = req.body.contrase; 
    console.log(nombre, pass);
    var consulta = "SELECT * FROM cliente WHERE correo = '" +nombre+"'"
    conectar.query(consulta, function (err, result, fields) {
        if(err){
            throw console.log(err);
        }else {
            console.log(result);
            conectar.end();
        }
    });
    res.render('user');
    
});