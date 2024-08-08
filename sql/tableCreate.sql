-- Table: public.games

-- DROP TABLE IF EXISTS public.games;

CREATE TABLE IF NOT EXISTS public.games
(
    title character varying COLLATE pg_catalog."default" NOT NULL,
    publisher character varying COLLATE pg_catalog."default" NOT NULL,
    price numeric NOT NULL,
    category_id integer NOT NULL,
    stock_quantity integer NOT NULL,
    release_year integer NOT NULL,
    game_id integer NOT NULL DEFAULT nextval('games_game_id_seq'::regclass),
    CONSTRAINT games_pkey PRIMARY KEY (game_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.games
    OWNER to postgres;