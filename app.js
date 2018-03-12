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

app.get('/index',function(req,res){
    res.sendFile(path.join(__dirname +'/index.html'));
});

app.get('/reservar',function(req,res){
    res.sendFile(path.join(__dirname +'/reservar.html'));
});

app.get('/user',function(req,res){
    res.sendFile(path.join(__dirname +'/user.html'));
});

app.get('/login',function(req,res){
    res.sendFile(path.join(__dirname +'/login.html'));
});

app.get('/regitro', function (req, res) {
    res.sendFile(path.join(__dirname + '/registro.html'));
});

app.get('/itinerario',function(req,res){
    res.sendFile(path.join(__dirname +'/itinerario.html'));
});

app.get('/tracking',function(req,res){
    res.sendFile(path.join(__dirname +'/tracking.html'));
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

var persona={id: "", name: "", email: "", 
    pass: "", edad: "", telefono: "",
    direct: ""};

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
            
            persona = {id: result[0].idcliente, name: result[0].nombre, email: result[0].correo, 
                pass: result[0].contraseña, edad: result[0].edad, telefono: result[0].telefono,
                direct: result[0].direccion};
            console.log(persona);
        }
    });
    res.sendFile(path.join(__dirname +'/user.html'));
    
});

/**Funcion para insertar en la reserva**/

app.post('/index.html', function (req, res) {
    var origen = req.body.origen;
    var destino = req.body.destino; 
	var agencia = req.body.agencia;
	var numero = req.body.numero;
	var fecha = req.body.fecha;
    var cedula = persona['id'];
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
	res.sendFile(path.join(__dirname +'/index.html'));  
});

/**Funcion para insertar en el registro de usuario**/
app.post('/login.html', function(req, res){
    var identificacion = req.body.id;
    var names = req.body.nombres;
    var age = req.body.edad;
    var phone = req.body.tlf;
    var mail = req.body.email;
    var address = req.body.dir;
    var pass = req.body.contraseña;
    conectar.query("INSERT INTO cliente (idcliente, nombre, edad, telefono, correo, direccion, contraseña) VALUES ('"+identificacion+"', '"+names.toString()+"','"+age+"','"+phone.toString()+"','"+mail.toString()+"','"+address.toString()+"','"+pass.toString()+"')", function(err, result){
        if(err) throw err;
            console.log("1 record inserted");
        
    });
    res.sendFile(path.join(__dirname +'/login.html'));
});

/**Funcion para consultar en el registro de itinerario**/
app.post('/data', function (req, res) {
    var numviaje = req.body.numviaje;
    var iditi = req.body.iditi; 

    var sql1 = "SELECT * FROM viaje WHERE numero_viaje = " +numviaje+ " AND itinerario_iditinerario = " +iditi;
    conectar.query(sql1, function (err, result) {
    if (err) throw console.log(err);

    if(result.length > 0){

        var sql = "SELECT * FROM itinerario WHERE iditinerario = " +iditi+ "";
        conectar.query(sql, function (err, result) {
          if (err)
            throw err;
          else{
            var reportQuery = {id: result[0].iditinerario, ciudad_origen: result[0].ciudad_origen,
                            ciudad_destino: result[0].ciudad_destino, hora_salida: result[0].hora_salida,
                            fecha_viaje: result[0].fecha_viaje, hora_aproxllegada: result[0].hora_aproxllegada}

            console.log(reportQuery);

            //res.sendFile(path.join(__dirname +'/reportItinerario.html'));
            var salidaReport= result[0].ciudad_origen.toString()+ " - "+ result[0].ciudad_destino.toString()+ " : "+
                              result[0].fecha_viaje.toString()+ " - "+result[0].hora_salida.toString();

            console.log(salidaReport);
            res.send(salidaReport);
          }
        });
    }
    else{
      res.send("El número de envio ingresado no es válido");
    }
    });
   // res.sendFile(path.join(__dirname +'/itinerario.html')); 
});

/**Funcion para insertar en la reserva**/

app.post('/data2', function (req, res) {
    var trackid = req.body.trackid;
        var sql = "SELECT * FROM tracking t WHERE t.numero_tracking = ( SELECT MAX(numero_tracking) FROM tracking where viaje_numero_viaje = " +trackid+ ")";
        conectar.query(sql, function (err, result) {
          if (err)
            throw err;
          else{
            if(result.length > 0){
              var reportQuery = {id: result[0].numero_tracking, ciudad_origen: result[0].ciudad_origen,
                              ciudad_destino: result[0].ciudad_destino, hora_salida: result[0].hora_salida,
                              hora_llegada: result[0].hora_llegada, estatus: result[0].estatus}

              console.log(reportQuery);

              //res.sendFile(path.join(__dirname +'/reportItinerario.html'));
              var salidaReport= "( "+result[0].estatus+ " ) "+ result[0].ciudad_origen+ " - "+
                                result[0].ciudad_destino+ " : "+result[0].hora_salida+ " - "+
                                result[0].hora_llegada;

              console.log(salidaReport);
              res.send(salidaReport);
            }else{
              res.send("El número de envio ingresado no es válido");
            }
          }
        });
   // res.sendFile(path.join(__dirname +'/itinerario.html'));
});