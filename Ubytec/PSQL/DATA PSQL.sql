INSERT INTO public."Afiliado"(
	"Nombre", "CedulaJuridica", "Distrito", "Provincia", "Canton", "Sinpe", "Correo", "Estado")
	VALUES ('Mi Tierra', 'T00001', 'Cartago', 'Cartago', 'Cartago', '85624195', 'RAfael.11@gmail.com', 'PENDIENTE');

INSERT INTO public."Afiliado"(
	"Nombre", "CedulaJuridica", "Distrito", "Provincia", "Canton", "Sinpe", "Correo", "Estado")
	VALUES ('Caprichos', 'T00002', 'Cartago', 'Cartago', 'Bella Vista', '60748541', 'vistaCR45@gmail.com', 'RECHAZADA');

INSERT INTO public."Afiliado"(
	"Nombre", "CedulaJuridica", "Distrito", "Provincia", "Canton", "Sinpe", "Correo", "Estado")
	VALUES ('Pipasa', 'T00003', 'San Jose', 'San Jose', 'San Jose', '60748541', 'vistaCR45@gmail.com', 'APROBADA');

INSERT INTO public."Gerente"(
	"Usuario", "NombreCompleto", "Distrito", "Provincia", "Canton", "Contraseña", "CedulaJuridica")
	VALUES ('RAFA', 'RAFAEL Hernandez GUTIERREz', 'Cartago', 'Cartago', 'Cartago', '123456789', 'T00001');

INSERT INTO public."Gerente"(
	"Usuario", "NombreCompleto", "Distrito", "Provincia", "Canton", "Contraseña", "CedulaJuridica")
	VALUES ('Caprichos', 'Dulce Jimenez', 'Cartago', 'Cartago', 'Cartago', 'Caprichos01', 'T00002');

INSERT INTO public."Gerente"(
	"Usuario", "NombreCompleto", "Distrito", "Provincia", "Canton", "Contraseña", "CedulaJuridica")
	VALUES ('Pipasa', 'Dulce Jimenez', 'San Jose', 'San Jose', 'San Jose', 'Pipasa', 'T00003');

INSERT INTO public."TelefonoAfiliado"(
	"CedulaJuridica", "Telefono")
	VALUES ('T00003', '60758595');

INSERT INTO public."TelefonoAfiliado"(
	"CedulaJuridica", "Telefono")
	VALUES ('T00003', '22586541');

INSERT INTO public."TelefonoAfiliado"(
	"CedulaJuridica", "Telefono")
	VALUES ('T00002', '41527484');

INSERT INTO public."TelefonoAfiliado"(
	"CedulaJuridica", "Telefono")
	VALUES ('T00001', '22536895');

INSERT INTO public."TelefonoGerente"(
	"Usuario", "Telefono")
	VALUES ('RAFA', '22536895');

INSERT INTO public."TelefonoGerente"(
	"Usuario", "Telefono")
	VALUES ('Caprichos', '60205923');

INSERT INTO public."TelefonoGerente"(
	"Usuario", "Telefono")
	VALUES ('Pipasa', '74758263');

INSERT INTO public."Comentario"(
	"CedulaJAfiliado", "Comentario")
	VALUES ('T00002', 'No existe el distrito ni el canton');

INSERT INTO public."Producto"(
	"NombreProducto", "CedulaJAfiliado", "Categoria", "Precio")
	VALUES ('Medio Deshuesada', 'T00003', 'Carnes', 2500);

INSERT INTO public."FotosProducto"(
	"CedulaJAfiliado", "NombreProducto", "URLFoto")
	VALUES ('T00003', 'Medio Deshuesada', 'https://via.placeholder.com/150');

INSERT INTO public."Cliente"(
	"Nombre", "Apellidos", "Cedula", "Distrito", "Provincia", "Canton", "Usuario", "Contraseña", "FechaNacimiento", "Correo")
	VALUES ('Pablo', 'Rojas Nuñez', '2020421141', 'Estero', 'Sanjose', 'Puriscal', 'JPRN', 'ADMIN123', '2001-11-08', 'JPRN@gmail.com');

INSERT INTO public."Cliente"(
	"Nombre", "Apellidos", "Cedula", "Distrito", "Provincia", "Canton", "Usuario", "Contraseña", "FechaNacimiento", "Correo")
	VALUES ('Julion', 'Rodriguez alpizar', '2022586521', 'Picagres', 'Sanjose', 'Moravia', 'Julio123', 'asd4asd5asd6', '2003-10-01', 'Jul24@gmail.com');

INSERT INTO public."TelefonoCliente"(
	"CedulaCliente", "Telefono")
	VALUES ('2020421141', '60458762');

INSERT INTO public."TelefonoCliente"(
	"CedulaCliente", "Telefono")
	VALUES ('2022586521', '23135845');
    
INSERT INTO public."TelefonoCliente"(
	"CedulaCliente", "Telefono")
	VALUES ('2022586521', '88689264');

INSERT INTO public."Repartidor"(
	"NombreCompleto", "Cedula", "Distrito", "Provincia", "Canton", "Usuario", "Contraseña", "Disponible", "Correo")
	VALUES ('Isaac Barrios Camppos', '118546245','Estero', 'Sanjose', 'Puriscal', 'Isriom', 'admin', True, 'isriom@estudiantec.cr');
    
INSERT INTO public."Repartidor"(
	"NombreCompleto", "Cedula", "Distrito", "Provincia", "Canton", "Usuario", "Contraseña", "Disponible", "Correo")
	VALUES ('Brayan Martinez', '416546245', 'Cartago', 'Cartago', 'Cartago', 'Bryan', 'Bryan', False, '2020@estudiantec.cr');

INSERT INTO public."TelefonoRepartidor"(
	"CedulaRepartidor", "Telefono")
	VALUES ('118546245', '71896421');
    
INSERT INTO public."TelefonoRepartidor"(
	"CedulaRepartidor", "Telefono")
	VALUES ('416546245', '73864211');

INSERT INTO public."Pedido"(
	"ComprobantePago", "Dirreccion", "EstadoPedido", "Monto", "CedulaJAfiliado", "CedulaCliente")
	VALUES ('45?AAAA', 'Frente a la escuela', 'REPARTIDOR', 1500, 'T00003', '2020421141');

INSERT INTO public."ProductoPedido"(
	"ComprobantePago", "NombreProducto", "CedulaJAfiliado", "cantidad")
	VALUES ('45?AAAA', 'Medio Deshuesada', 'T00003', '3');

INSERT INTO public."AsignarRepartidor"(
	"ComprobantePago", "CedulaRepartidor")
	VALUES ('45?AAAA', '416546245');
