var mysql = require('mysql');
var express = require('express');
var body_parser = require('body-parser');
var app = express();
var path    = require("path");
app.use(body_parser.urlencoded({extended:true}));
app.use(express.static('public'));



app.get('/',function(req,res){
	//console.log(__dirname);
    res.sendFile(path.join(__dirname +'/tracking.html'));
    //__dirname : It will resolve to your project folder.
    console.log('entrada por el puerto 3000');
    
  });

const server=app.listen(3000, () => {
  console.log('Servidor web iniciado');
});
  
  
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "6688027",
  database: "venturismo"
});


/**Funcion para insertar en la reserva**/

app.post('/data', function (req, res) {
    var trackid = req.body.trackid;


	console.log("tracking: "+ trackid);
  

        var sql = "SELECT t.ciudad_origen, t.ciudad_destino , t.estatus, t.numero_tracking FROM tracking t WHERE t.numero_tracking = ( SELECT MAX(numero_tracking) FROM tracking where viaje_numero_viaje = " +trackid+ ")";
        con.query(sql, function (err, result) {
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