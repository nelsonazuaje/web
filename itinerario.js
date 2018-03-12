var mysql = require('mysql');
var express = require('express');
var body_parser = require('body-parser');
var app = express();
var path    = require("path");
app.use(body_parser.urlencoded({extended:true}));
app.use(express.static('public'));



app.get('/',function(req,res){
	//console.log(__dirname);
    res.sendFile(path.join(__dirname +'/itinerario.html'));
    //__dirname : It will resolve to your project folder.
    console.log('entrada por el puerto 3000');
    
  });

const server=app.listen(3000, () => {
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

app.post('/data', function (req, res) {
    var numviaje = req.body.numviaje;
    var iditi = req.body.iditi; 


	console.log("viaje: "+ numviaje);
	console.log("itinerario: "+ iditi);
  

  var sql1 = "SELECT * FROM viaje WHERE numero_viaje = " +numviaje+ " AND itinerario_iditinerario = " +iditi;
  con.query(sql1, function (err, result) {
    if (err) throw err;

    console.log("leng: " +result.length);
    if(result.length > 0){

        var sql = "SELECT * FROM itinerario WHERE iditinerario = " +iditi+ "";
        con.query(sql, function (err, result) {
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