CREATE OR REPLACE PROCEDURE public."calcularprecio"(IN comprobante text)
LANGUAGE 'plpgsql'
AS $BODY$
DECLARE
	price BIGINT;
	p "Pedido"%ROWTYPE;
BEGIN
	Select *
	INTO p
	FROM "Pedido" pe
	WHERE pe."ComprobantePago"="comprobante";
	
	Select SUM(pp."cantidad"::BIGINT*pr."Precio"::BIGINT)
	INTO price
	FROM "Producto" pr
    JOIN "ProductoPedido" pp ON pr."NombreProducto"=pp."NombreProducto" 
    and pr."CedulaJAfiliado"=pp."CedulaJAfiliado"
	WHERE pp."ComprobantePago"=p."ComprobantePago"; 
	
	Update "Pedido"
		Set "Monto"=price
		Where "Pedido"."ComprobantePago"="comprobante";
	
END;
$BODY$;

ALTER PROCEDURE public."calcularprecio"(text)
    OWNER TO ubytec;