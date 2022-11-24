CREATE OR REPLACE PROCEDURE public."asignarrepartidorprocedure"(IN comprobante text)
LANGUAGE 'plpgsql'
AS $BODY$
DECLARE
	r "Repartidor"%ROWTYPE;
	a "Afiliado"%ROWTYPE;
	p "Pedido"%ROWTYPE;
BEGIN
	Select *
	INTO p
	FROM "Pedido" pe
	WHERE pe."ComprobantePago"="comprobante";
	
	Select *
	INTO a
	FROM "Afiliado" af
	WHERE af."CedulaJuridica"=p."CedulaJAfiliado";
	
	Select *
	INTO r
	FROM "Repartidor" re
	Where re."Disponible"=True and(
	   LOWER(re."Provincia")=LOWER(a."Provincia") and LOWER(re."Canton")=LOWER(a."Canton") and LOWER(re."Distrito")=LOWER(a."Distrito"))
	Limit 1;
	
	If r."Cedula" IS NULL THEN
		Select *
	INTO r
	FROM "Repartidor" re
	Where re."Disponible"=True and(
	   LOWER(re."Provincia")=LOWER(a."Provincia") and LOWER(re."Canton")=LOWER(a."Canton"))
	Limit 1;
	END IF;
	
	If r."Cedula" IS NULL THEN
		Select *
	INTO r
	FROM "Repartidor" re
	Where re."Disponible"=True and(
	   LOWER(re."Provincia")=LOWER(a."Provincia"))
	Limit 1;
	END IF;

	If r."Cedula" IS NULL THEN
		Select *
	INTO r
	FROM "Repartidor" re
	Where re."Disponible"=True
	Limit 1;
	END IF;

	Update "Repartidor"
		Set "Disponible"=False
		Where "Repartidor"."Cedula"=r."Cedula";
	
	Update "Pedido"
		Set "EstadoPedido"='En camino'
		Where "Pedido"."ComprobantePago"=p."ComprobantePago";
		
	Insert INTO "AsignarRepartidor" VALUES (p."ComprobantePago",r."Cedula");
END;
$BODY$;

ALTER PROCEDURE public."AsignarRepartidorProcedure"(text)
    OWNER TO ubytec;