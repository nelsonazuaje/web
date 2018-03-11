---Deben estar conectados a la base de datos para correr estos cambios---

create table Compra_Reserva(
	origen varchar(60),
	destino varchar (60),
	agencia varchar (60),
	NroTarjeta varchar (60),
	fecha date,
	idcliente int,
	idCompraReserva int,
	primary key (idCompraReserva)
);

alter table compra_reserva add column numero_pasaje int;

alter table compra_reserva add column isCompra char;

alter table compra_reserva add column isReserva char;

alter table compra_reserva add foreign key (numero_pasaje) references pasaje(numero_pasaje) 

alter table compra_reserva add foreign key (idcliente) references cliente(idcliente) 

drop table compra;

drop table reserva;
