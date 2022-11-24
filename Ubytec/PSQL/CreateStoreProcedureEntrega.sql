CREATE OR REPLACE PROCEDURE public."EntregaCompletadaProcedure"(IN comprobante text)
LANGUAGE 'plpgsql'
AS $BODY$
DECLARE
	r "Repartidor"%ROWTYPE;
	a "AsignarRepartidor"%ROWTYPE;
	p "Pedido"%ROWTYPE;
BEGIN
	Select *
	INTO p
	FROM "Pedido" pe
	WHERE pe."ComprobantePago"="comprobante";
	
	Select *
	INTO a
	FROM "AsignarRepartidor" ar
	WHERE ar."ComprobantePago"=p."ComprobantePago";
	
	Select *
	INTO r
	FROM "Repartidor" re
	Where re."Disponible"=False and a."CedulaRepartidor"=re."Cedula"
	Limit 1;

	Update "Repartidor"
		Set "Disponible"=True
		Where "Repartidor"."Cedula"=r."Cedula";
	
	Update "Pedido"
		Set "EstadoPedido"='Entregado'
		Where "Pedido"."ComprobantePago"=p."ComprobantePago";
END;
$BODY$;

ALTER PROCEDURE public."EntregaCompletadaProcedure"(text)
    OWNER TO ubytec;