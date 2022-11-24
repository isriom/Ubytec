CREATE OR REPLACE VIEW public."VentasAfiliado"
 AS
 SELECT a."Nombre" AS "Afiliado",
    count(*) AS "Compras",
    SUM(p."Monto") As "Total",
    SUM(p."Monto")*0.15 AS "MontoServicio"
   FROM "Pedido" p
     JOIN "Afiliado" a ON p."CedulaJAfiliado" = a."CedulaJuridica"
  GROUP BY a."Nombre";

ALTER TABLE public."VentasAfiliado"
    OWNER TO ubytec;
