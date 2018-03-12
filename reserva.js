var mysql = require('mysql');
var express = require('express');
var body_parser = require('body-parser');
var app = express();
var path    = require("path");
app.use(body_parser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/'));


app.get('/reservar',function(req,res){
    res.sendFile(path.join(__dirname +'/reservar.html'));
    //__dirname : It will resolve to your project folder.
  });


const server=app.listen(8000, () => {
  console.log('Servidor web iniciado');
});
  
  
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "venturismo"
});

con.connect(function(err){
    if(err){
       throw err;
    }else{
       console.log('Conexion correcta.');
    }
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
	
    console.log(origen, destino, agencia, numero, fecha, cedula, numeroPasaje, isCompra, isReserva);
	
	var sql = "INSERT INTO compra_reserva (origen, destino, agencia, NroTarjeta, fecha, idcliente, numero_pasaje, isCompra, isReserva)"+
  "VALUES('" +origen+"', '" +destino+"', '" +agencia+"', '" +numero+"', '" +fecha+"', '" +cedula+"', '" +numeroPasaje+"', '" +isCompra+"','" +isReserva+"')";
    
	
	con.query(sql, function (err, result) {
        if (err) throw console.log(err);
		console.log("1 record inserted");
		con.end();
    });
	
	res.sendFile(path.join(__dirname +'/servicios.html'));
    
});