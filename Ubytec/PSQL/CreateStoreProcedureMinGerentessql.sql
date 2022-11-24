CREATE OR REPLACE FUNCTION public."CheckMinGerentes"()
RETURNS trigger
LANGUAGE 'plpgsql'
AS $BODY$
DECLARE
	af "Gerente"%ROWTYPE;
BEGIN
	Select *
	INTO af
	FROM "Gerente" a
	Where a."CedulaJuridica"=OLD."CedulaJuridica"
	Limit 1;

	IF af."CedulaJuridica" IS NULL THEN
    RAISE EXCEPTION 'No se puede eliminar el gerente dado que es el unico que existe';
    ROLLBACK;
	END IF;
	RETURN NULL;
END;
$BODY$;

ALTER FUNCTION public."CheckMinGerentes"()
    OWNER TO ubytec;

CREATE TRIGGER mincheck
AFTER DELETE ON "Gerente"
    FOR EACH ROW EXECUTE FUNCTION public."CheckMinGerentes"();