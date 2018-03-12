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

app.get('/reservar',function(req,res){
    res.sendFile(path.join(__dirname +'/reservar.html'));
    //__dirname : It will resolve to your project folder.
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

/**Funcion para el inicio de sesion**/
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
            
        }
    });
    res.sendFile(path.join(__dirname +'/user.html'));
    
});

/**Funcion para insertar en la reserva**/

app.post('/servicios.html', function (req, res) {
    var origen = req.body.origen;
    var destino = req.body.destino; 
	var agencia = req.body.agencia;
	var numero = req.body.numero;
	var fecha = req.body.fecha;
    var cedula = req.body.cedula;
	var numeroPasaje = req.body.nroPasaje;
	if(req.body.elegir=="compra"){
		var isCompra = 'Y';
		var isReserva = 'N'
	}else{
		var isCompra = 'N';
		var isReserva = 'Y'
	}
	
	var sql = "INSERT INTO compra_reserva (origen, destino, agencia, NroTarjeta, fecha, idcliente, numero_pasaje, isCompra, isReserva)"+
    "VALUES('" +origen+"', '" +destino+"', '" +agencia+"', '" +numero+"', '" +fecha+"', '" +cedula+"', '" +numeroPasaje+"', '" +isCompra+"','" +isReserva+"')";

	conectar.query(sql, function (err, result) {
        if (err) throw console.log(err);
		console.log("1 record inserted");
    });
	res.sendFile(path.join(__dirname +'/servicios.html'));  
});

