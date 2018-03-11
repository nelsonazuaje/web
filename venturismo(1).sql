-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-03-2018 a las 20:18:57
-- Versión del servidor: 5.7.17
-- Versión de PHP: 7.1.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `venturismo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `idcliente` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `edad` int(11) DEFAULT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `correo` varchar(60) DEFAULT NULL,
  `direccion` varchar(300) DEFAULT NULL,
  `contraseña` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compra_reserva`
--

CREATE TABLE `compra_reserva` (
  `origen` varchar(60) DEFAULT NULL,
  `destino` varchar(60) DEFAULT NULL,
  `agencia` varchar(60) DEFAULT NULL,
  `NroTarjeta` varchar(60) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `idcliente` int(11) DEFAULT NULL,
  `idCompraReserva` int(11) NOT NULL,
  `numero_pasaje` int(11) DEFAULT NULL,
  `isCompra` char(1) DEFAULT NULL,
  `isReserva` char(1) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `itinerario`
--

CREATE TABLE `itinerario` (
  `iditinerario` int(11) NOT NULL,
  `ciudad_origen` varchar(45) DEFAULT NULL,
  `ciudad_destino` varchar(45) DEFAULT NULL,
  `hora_salida` time DEFAULT NULL,
  `fecha_viaje` date DEFAULT NULL,
  `hora_aproxllegada` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pasaje`
--

CREATE TABLE `pasaje` (
  `numero_pasaje` int(11) NOT NULL,
  `numero_asiento` int(11) DEFAULT NULL,
  `costo` float DEFAULT NULL,
  `cliente_idcliente` int(11) NOT NULL,
  `terminal_agencia_idterminal` int(11) NOT NULL,
  `viaje_numero_viaje` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `terminal_agencia`
--

CREATE TABLE `terminal_agencia` (
  `idterminal` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `direccion` varchar(300) DEFAULT NULL,
  `reputacion` varchar(50) DEFAULT NULL,
  `terminalAgencia` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tracking`
--

CREATE TABLE `tracking` (
  `numero_tracking` varchar(20) NOT NULL,
  `ciudad_origen` varchar(45) DEFAULT NULL,
  `ciudad_destino` varchar(45) DEFAULT NULL,
  `hora_llegada` time DEFAULT NULL,
  `hora_salida` time DEFAULT NULL,
  `estatus` varchar(100) DEFAULT NULL,
  `terminal_agencia_idterminal` int(11) NOT NULL,
  `viaje_numero_viaje` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `viaje`
--

CREATE TABLE `viaje` (
  `numero_viaje` int(11) NOT NULL,
  `estatus` varchar(45) DEFAULT NULL,
  `capacidad` int(11) DEFAULT NULL,
  `cantidad_pasajeros` int(11) DEFAULT NULL,
  `terminal_agencia_idterminal` int(11) NOT NULL,
  `itinerario_iditinerario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`idcliente`);

--
-- Indices de la tabla `compra_reserva`
--
ALTER TABLE `compra_reserva`
  ADD PRIMARY KEY (`idCompraReserva`),
  ADD KEY `numero_pasaje` (`numero_pasaje`),
  ADD KEY `idcliente` (`idcliente`);

--
-- Indices de la tabla `itinerario`
--
ALTER TABLE `itinerario`
  ADD PRIMARY KEY (`iditinerario`);

--
-- Indices de la tabla `pasaje`
--
ALTER TABLE `pasaje`
  ADD PRIMARY KEY (`numero_pasaje`),
  ADD KEY `fk_cliente_pasaje1_idx` (`cliente_idcliente`),
  ADD KEY `fk_terminal_agencia_pasaje1_idx` (`terminal_agencia_idterminal`),
  ADD KEY `fk_viaje_pasaje1_idx` (`viaje_numero_viaje`);

--
-- Indices de la tabla `terminal_agencia`
--
ALTER TABLE `terminal_agencia`
  ADD PRIMARY KEY (`idterminal`);

--
-- Indices de la tabla `tracking`
--
ALTER TABLE `tracking`
  ADD PRIMARY KEY (`numero_tracking`),
  ADD KEY `fk_terminal_agencia_tracking1_idx` (`terminal_agencia_idterminal`),
  ADD KEY `fk_viaje_tracking1_idx` (`viaje_numero_viaje`);

--
-- Indices de la tabla `viaje`
--
ALTER TABLE `viaje`
  ADD PRIMARY KEY (`numero_viaje`),
  ADD KEY `fk_terminal_agencia_viaje1_idx` (`terminal_agencia_idterminal`),
  ADD KEY `fk_itinerario_viaje1_idx` (`itinerario_iditinerario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `idcliente` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `itinerario`
--
ALTER TABLE `itinerario`
  MODIFY `iditinerario` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `terminal_agencia`
--
ALTER TABLE `terminal_agencia`
  MODIFY `idterminal` int(11) NOT NULL AUTO_INCREMENT;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `pasaje`
--
ALTER TABLE `pasaje`
  ADD CONSTRAINT `fk_cliente_pasaje1` FOREIGN KEY (`cliente_idcliente`) REFERENCES `cliente` (`idcliente`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_terminal_agencia_pasaje1` FOREIGN KEY (`terminal_agencia_idterminal`) REFERENCES `terminal_agencia` (`idterminal`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_viaje_pasaje1` FOREIGN KEY (`viaje_numero_viaje`) REFERENCES `viaje` (`numero_viaje`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `tracking`
--
ALTER TABLE `tracking`
  ADD CONSTRAINT `fk_terminal_agencia_tracking1` FOREIGN KEY (`terminal_agencia_idterminal`) REFERENCES `terminal_agencia` (`idterminal`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_viaje_tracking1` FOREIGN KEY (`viaje_numero_viaje`) REFERENCES `viaje` (`numero_viaje`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `viaje`
--
ALTER TABLE `viaje`
  ADD CONSTRAINT `fk_itinerario_viaje1` FOREIGN KEY (`itinerario_iditinerario`) REFERENCES `itinerario` (`iditinerario`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_terminal_agencia_viaje1` FOREIGN KEY (`terminal_agencia_idterminal`) REFERENCES `terminal_agencia` (`idterminal`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
