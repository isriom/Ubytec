CREATE OR REPLACE VIEW public."ConsolidadoVentas"
 AS
 SELECT c."Nombre" AS cliente,
    a."Nombre",
    count(*) AS count,
    r."NombreCompleto" AS repartidor,
    SUM(p."Monto") AS precio
   FROM "Pedido" p
     JOIN "AsignarRepartidor" ar ON p."ComprobantePago" = ar."ComprobantePago"
     JOIN "Repartidor" r ON ar."CedulaRepartidor" = r."Cedula"
     JOIN "Cliente" c ON p."CedulaCliente" = c."Cedula"
     JOIN "Afiliado" a ON p."CedulaJAfiliado" = a."CedulaJuridica"
  GROUP BY c."Nombre", a."Nombre", r."NombreCompleto";

ALTER TABLE public."ConsolidadoVentas"
    OWNER TO ubytec;