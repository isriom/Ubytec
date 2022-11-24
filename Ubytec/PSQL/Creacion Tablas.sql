CREATE TABLE public."Afiliado"
(
    "Nombre" text COLLATE pg_catalog."default",
    "CedulaJuridica" text COLLATE pg_catalog."default" PRIMARY KEY NOT NULL,
    "Distrito" text COLLATE pg_catalog."default",
    "Provincia" text COLLATE pg_catalog."default",
    "Canton" text COLLATE pg_catalog."default",
    "Sinpe" text COLLATE pg_catalog."default",
    "Correo" text COLLATE pg_catalog."default"
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

-- Table: public.Gerente

-- DROP TABLE IF EXISTS public."Gerente";

CREATE TABLE IF NOT EXISTS public."Gerente"
(
    "Usuario" text COLLATE pg_catalog."default" NOT NULL,
    "NombreCompleto" text COLLATE pg_catalog."default",
    "Distrito" text COLLATE pg_catalog."default",
    "Provincia" text COLLATE pg_catalog."default",
    "Canton" text COLLATE pg_catalog."default",
    "Contraseña" text COLLATE pg_catalog."default",
    "CedulaJuridica" text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Gerente_pkey" PRIMARY KEY ("Usuario"),
    CONSTRAINT "Gerente_CedulaJuridica_fkey" FOREIGN KEY ("CedulaJuridica")
        REFERENCES public."Afiliado" ("CedulaJuridica") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Gerente"
    OWNER to ubytec;


CREATE TABLE public."Pedido"
(
    "ComprobantePago" text NOT NULL,
    "Dirreccion" text NOT NULL,
    "EstadoPedido" text NOT NULL,
    "ID" bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 ),
    "Monto" bigint NOT NULL,
    "CedulaJAfiliado" text NOT NULL,
    "CedulaCliente" text NOT NULL,
    PRIMARY KEY ("ComprobantePago"),
    UNIQUE ("ID")
)
WITH (
    OIDS = FALSE
);

CREATE TABLE public."Repartidor"
(
    "NombreCompleto" text COLLATE pg_catalog."default" NOT NULL,
    "Cedula" text COLLATE pg_catalog."default" NOT NULL,
    "Distrito" text COLLATE pg_catalog."default" NOT NULL,
    "Provincia" text COLLATE pg_catalog."default" NOT NULL,
    "Canton" text COLLATE pg_catalog."default" NOT NULL,
    "Usuario" text COLLATE pg_catalog."default" NOT NULL,
    "Contraseña" text COLLATE pg_catalog."default",
    "Disponible" boolean,
    "Correo" text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Repartidor_pkey" PRIMARY KEY ("Cedula")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

CREATE TABLE public."Cliente"
(
    "Nombre" text COLLATE pg_catalog."default" NOT NULL,
    "Apellidos" text COLLATE pg_catalog."default" NOT NULL,
    "Cedula" text COLLATE pg_catalog."default" NOT NULL,
    "Distrito" text COLLATE pg_catalog."default" NOT NULL,
    "Provincia" text COLLATE pg_catalog."default" NOT NULL,
    "Canton" text COLLATE pg_catalog."default" NOT NULL,
    "Usuario" text COLLATE pg_catalog."default" NOT NULL,
    "Contraseña" text COLLATE pg_catalog."default",
    "FechaNacimiento" date,
    "Correo" text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("Cedula")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

CREATE TABLE public."Producto"
(
    "NombreProducto" text NOT NULL,
    "CedulaJAfiliado" text NOT NULL,
    "Categoria" text,
    "Precio" bigint NOT NULL,
    PRIMARY KEY ("NombreProducto", "CedulaJAfiliado")
)
WITH (
    OIDS = FALSE
);

CREATE TABLE public."AsignarRepartidor"
(
    "ComprobantePago" text NOT NULL,
    "CedulaRepartidor" text NOT NULL,
    PRIMARY KEY ("ComprobantePago", "CedulaRepartidor")
)
WITH (
    OIDS = FALSE
);

CREATE TABLE public."ProductoPedido"
(
    "ComprobantePago" text,
    "NombreProducto" text,
    "CedulaJAfiliado" text,
    cantidad text,
    PRIMARY KEY ("ComprobantePago", "NombreProducto", "CedulaJAfiliado")
)
WITH (
    OIDS = FALSE
);

CREATE TABLE public."TelefonoGerente"
(
    "Usuario" text NOT NULL,
    "Telefono" text NOT NULL,
    PRIMARY KEY ("Usuario", "Telefono")
)
WITH (
    OIDS = FALSE
);



CREATE TABLE public."TelefonoAfiliado"
(
    "CedulaJuridica" text COLLATE pg_catalog."default" NOT NULL,
    "Telefono" text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "TelefonoAfiliado_pkey" PRIMARY KEY ("CedulaJuridica", "Telefono")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

CREATE TABLE public."TelefonoRepartidor"
(
    "CedulaRepartidor" text NOT NULL,
    "Telefono" text NOT NULL,
    PRIMARY KEY ("CedulaRepartidor", "Telefono")
)
WITH (
    OIDS = FALSE
);


CREATE TABLE public."TelefonoCliente"
(
    "CedulaCliente" text NOT NULL,
    "Telefono" text NOT NULL,
    PRIMARY KEY ("CedulaCliente", "Telefono")
)
WITH (
    OIDS = FALSE
);

CREATE TABLE public."FotosProducto"
(
    "CedulaJAfiliado" text NOT NULL,
    "NombreProducto" text NOT NULL,
    "URLFoto" text NOT NULL,
    PRIMARY KEY ("CedulaJAfiliado", "NombreProducto", "URLFoto")
)
WITH (
    OIDS = FALSE
);

CREATE TABLE public."Comentario"
(
    "CedulaJAfiliado" text NOT NULL,
    "Comentario" text NOT NULL,
    PRIMARY KEY ("CedulaJAfiliado", "Comentario")
)
WITH (
    OIDS = FALSE
);

ALTER TABLE IF EXISTS public."Comentario"
    ADD FOREIGN KEY ("CedulaJAfiliado")
    REFERENCES public."Afiliado" ("CedulaJuridica") MATCH SIMPLE
    ON UPDATE RESTRICT
    ON DELETE RESTRICT
    NOT VALID;
    OWNER to ubytec;

ALTER TABLE IF EXISTS public."FotosProducto"
    ADD FOREIGN KEY ("NombreProducto", "CedulaJAfiliado")
    REFERENCES public."Producto" ("NombreProducto", "CedulaJAfiliado") MATCH SIMPLE
    ON UPDATE RESTRICT
    ON DELETE RESTRICT
    NOT VALID;
    OWNER to ubytec;


ALTER TABLE IF EXISTS public."TelefonoCliente"
    ADD FOREIGN KEY ("CedulaCliente")
    REFERENCES public."Cliente" ("Cedula") MATCH SIMPLE
    ON UPDATE RESTRICT
    ON DELETE RESTRICT
    NOT VALID;
    OWNER to ubytec;

ALTER TABLE IF EXISTS public."TelefonoRepartidor"
    ADD FOREIGN KEY ("CedulaRepartidor")
    REFERENCES public."Repartidor" ("Cedula") MATCH SIMPLE
    ON UPDATE RESTRICT
    ON DELETE RESTRICT
    NOT VALID;
    OWNER to ubytec;

ALTER TABLE IF EXISTS public."TelefonoAfiliado"
    ADD FOREIGN KEY ("CedulaJuridica")
    REFERENCES public."Afiliado" ("CedulaJuridica") MATCH SIMPLE
    ON UPDATE RESTRICT
    ON DELETE RESTRICT
    NOT VALID;
    OWNER to ubytec;

ALTER TABLE IF EXISTS public."TelefonoGerente"
    OWNER to ubytec;
    ADD FOREIGN KEY ("Usuario")
    REFERENCES public."Gerente" ("Usuario") MATCH SIMPLE
    ON UPDATE RESTRICT
    ON DELETE RESTRICT
    NOT VALID;

ALTER TABLE IF EXISTS public."ProductoPedido"
    OWNER to ubytec;
    ALTER TABLE IF EXISTS public."ProductoPedido"
    ADD FOREIGN KEY ("ComprobantePago")
    REFERENCES public."Pedido" ("ComprobantePago") MATCH SIMPLE
    ON UPDATE RESTRICT
    ON DELETE RESTRICT
    NOT VALID;
    ADD FOREIGN KEY ("NombreProducto", "CedulaJAfiliado")
    REFERENCES public."Producto" ("NombreProducto", "CedulaJAfiliado") MATCH SIMPLE
    ON UPDATE RESTRICT
    ON DELETE RESTRICT
    NOT VALID;



ALTER TABLE IF EXISTS public."AsignarRepartidor"
    OWNER to ubytec;
    ADD FOREIGN KEY ("CedulaRepartidor")
    REFERENCES public."Repartidor" ("Cedula") MATCH SIMPLE
    ON UPDATE RESTRICT
    ON DELETE RESTRICT
    NOT VALID;
    ADD FOREIGN KEY ("ComprobantePago")
    REFERENCES public."Pedido" ("ComprobantePago") MATCH SIMPLE
    ON UPDATE RESTRICT
    ON DELETE RESTRICT
    NOT VALID;


ALTER TABLE IF EXISTS public."Producto"
    OWNER to ubytec;
    ADD FOREIGN KEY ("CedulaJAfiliado")
    REFERENCES public."Afiliado" ("CedulaJuridica") MATCH SIMPLE
    ON UPDATE RESTRICT
    ON DELETE RESTRICT
    NOT VALID;

ALTER TABLE IF EXISTS public."Cliente"
    OWNER to ubytec;

ALTER TABLE IF EXISTS public."Repartidor"
    OWNER to ubytec;

ALTER TABLE IF EXISTS public."Pedido"
    OWNER to ubytec;
    ADD FOREIGN KEY ("CedulaJAfiliado")
    REFERENCES public."Afiliado" ("CedulaJuridica") MATCH SIMPLE
    ON UPDATE RESTRICT
    ON DELETE RESTRICT
    ADD FOREIGN KEY ("CedulaCliente")
    REFERENCES public."Cliente" ("Cedula") MATCH SIMPLE
    ON UPDATE RESTRICT
    ON DELETE RESTRICT
    NOT VALID;

ALTER TABLE public."Afiliado"
    OWNER to ubytec;

ALTER TABLE public."Gerente"
    OWNER to ubytec;
    ADD FOREIGN KEY ("CedulaJuridica")
    REFERENCES public."Afiliado" ("CedulaJuridica") MATCH SIMPLE
    ON UPDATE RESTRICT
    ON DELETE RESTRICT
    NOT VALID;




