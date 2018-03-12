var mysql = require('mysql');
var express = require('express');
var body_parser = require('body-parser');
var app = express();
var path    = require("path");
app.use(body_parser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/'));

const server=app.listen(8000, () => {
  console.log('Servidor web iniciado');
}); 
 
app.get('/user',function(req,res){
    res.sendFile(path.join(__dirname +'/user.html'));
    //__dirname : It will resolve to your project folder.
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
                var usuario = {id: result[0].idcliente, name: result[0].nombre, email: result[0].correo, 
                pass: result[0].contraseña, edad: result[0].edad, telefono: result[0].telefono,
                direct: result[0].direccion
                }
            console.log(usuario);
            conectar.end();
        }
    });
    res.sendFile(path.join(__dirname +'/user.html'));
    
});