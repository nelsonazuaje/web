var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "venturismo"
});

/**Funcion para el inicio de sesion**/

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  
  var sql = "SELECT * FROM cliente WHERE correo = " +document.getElementById("correo").value+
  "AND contraseña = " +document.getElementById("contraseña").value;
  
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
	var usuario = {id: result[0].idcliente, name: result[0].nombre, email: result[0].correo, 
	pass: result[0].contraseña, edad: result[0].edad, telefono: result[0].telefono,
	direct: result[0].direccion
	}
    console.log(result);
	console.log(usuario);

  });
  
});

