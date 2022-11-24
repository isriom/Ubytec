CREATE OR REPLACE VIEW public."RepartidoresPago"
 AS
 SELECT r."NombreCompleto" AS "Repartidor",
    a."Nombre" AS Afiliado,
    count(*) AS count,
    SUM(p."Monto") AS "Total",
    SUM(p."Monto")*0.15 AS "Ganancias",
    SUM(p."Monto")*0.03 AS "Pago"
   FROM "Pedido" p
     JOIN "AsignarRepartidor" ar ON p."ComprobantePago" = ar."ComprobantePago"
     JOIN "Repartidor" r ON ar."CedulaRepartidor" = r."Cedula"
     JOIN "Afiliado" a ON p."CedulaJAfiliado" = a."CedulaJuridica"
  GROUP BY r."NombreCompleto",a."Nombre";

ALTER TABLE public."ConsolidadoVentas"
    OWNER TO ubytec;

SELECT * FROM public."RepartidoresPago"