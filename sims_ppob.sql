--
-- PostgreSQL database dump
--

\restrict KMazhFaybLDgcCgXgAFE2ftpjr2qw6F7rLzYcUePRCKyEgE5p9RLl4XSs3CGRO2

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO postgres;

--
-- Name: banners; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.banners (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    image_url text,
    description text,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by bigint,
    updated_at timestamp with time zone,
    updated_by bigint,
    deleted_at timestamp with time zone
);


ALTER TABLE public.banners OWNER TO postgres;

--
-- Name: banners_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.banners_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.banners_id_seq OWNER TO postgres;

--
-- Name: banners_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.banners_id_seq OWNED BY public.banners.id;


--
-- Name: services; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.services (
    id bigint NOT NULL,
    code character varying(50) NOT NULL,
    name character varying(255) NOT NULL,
    icon_url text,
    tariff bigint DEFAULT 0 NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by bigint,
    updated_at timestamp with time zone,
    updated_by bigint,
    deleted_at timestamp with time zone,
    CONSTRAINT chk_services_tariff CHECK ((tariff >= 0))
);


ALTER TABLE public.services OWNER TO postgres;

--
-- Name: services_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.services_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.services_id_seq OWNER TO postgres;

--
-- Name: services_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.services_id_seq OWNED BY public.services.id;


--
-- Name: transactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transactions (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    service_id bigint,
    invoice_number character varying(100) NOT NULL,
    transaction_type character varying(20) NOT NULL,
    transaction_status character varying(20) NOT NULL,
    payment_method character varying(30) NOT NULL,
    total_amount bigint NOT NULL,
    balance_before bigint NOT NULL,
    balance_after bigint NOT NULL,
    service_code_snapshot character varying(50),
    service_name_snapshot character varying(255),
    service_tariff_snapshot bigint,
    description text,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by bigint,
    updated_at timestamp with time zone,
    updated_by bigint,
    deleted_at timestamp with time zone,
    CONSTRAINT chk_transactions_balance_after CHECK ((balance_after >= 0)),
    CONSTRAINT chk_transactions_balance_before CHECK ((balance_before >= 0)),
    CONSTRAINT chk_transactions_payment_method CHECK (((payment_method)::text = ANY ((ARRAY['BALANCE'::character varying, 'QRIS'::character varying, 'BANK_TRANSFER'::character varying, 'EWALLET'::character varying])::text[]))),
    CONSTRAINT chk_transactions_status CHECK (((transaction_status)::text = ANY ((ARRAY['PENDING'::character varying, 'SUCCESS'::character varying, 'FAILED'::character varying, 'CANCELLED'::character varying, 'EXPIRED'::character varying])::text[]))),
    CONSTRAINT chk_transactions_total_amount CHECK ((total_amount >= 0)),
    CONSTRAINT chk_transactions_type CHECK (((transaction_type)::text = ANY ((ARRAY['TOPUP'::character varying, 'PAYMENT'::character varying, 'REFUND'::character varying, 'WITHDRAW'::character varying])::text[])))
);


ALTER TABLE public.transactions OWNER TO postgres;

--
-- Name: transactions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.transactions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.transactions_id_seq OWNER TO postgres;

--
-- Name: transactions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.transactions_id_seq OWNED BY public.transactions.id;


--
-- Name: user_balance_histories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_balance_histories (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    transaction_id bigint NOT NULL,
    type character varying(20) NOT NULL,
    amount bigint NOT NULL,
    balance_before bigint NOT NULL,
    balance_after bigint NOT NULL,
    description text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT chk_balance_histories_amount CHECK ((amount >= 0)),
    CONSTRAINT chk_balance_histories_balance_after CHECK ((balance_after >= 0)),
    CONSTRAINT chk_balance_histories_balance_before CHECK ((balance_before >= 0)),
    CONSTRAINT chk_balance_histories_type CHECK (((type)::text = ANY ((ARRAY['CREDIT'::character varying, 'DEBIT'::character varying])::text[])))
);


ALTER TABLE public.user_balance_histories OWNER TO postgres;

--
-- Name: user_balance_histories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_balance_histories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_balance_histories_id_seq OWNER TO postgres;

--
-- Name: user_balance_histories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_balance_histories_id_seq OWNED BY public.user_balance_histories.id;


--
-- Name: user_balances; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_balances (
    user_id bigint NOT NULL,
    balance bigint DEFAULT 0 NOT NULL,
    updated_at timestamp with time zone,
    updated_by bigint,
    CONSTRAINT chk_user_balances_balance CHECK ((balance >= 0))
);


ALTER TABLE public.user_balances OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    role character varying(20) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50),
    profile_image_url text,
    last_login_at timestamp with time zone,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by bigint,
    updated_at timestamp with time zone,
    updated_by bigint,
    deleted_at timestamp with time zone,
    CONSTRAINT chk_users_role CHECK (((role)::text = ANY ((ARRAY['ADMIN'::character varying, 'MEMBER'::character varying])::text[])))
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: banners id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.banners ALTER COLUMN id SET DEFAULT nextval('public.banners_id_seq'::regclass);


--
-- Name: services id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.services ALTER COLUMN id SET DEFAULT nextval('public.services_id_seq'::regclass);


--
-- Name: transactions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions ALTER COLUMN id SET DEFAULT nextval('public.transactions_id_seq'::regclass);


--
-- Name: user_balance_histories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_balance_histories ALTER COLUMN id SET DEFAULT nextval('public.user_balance_histories_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SequelizeMeta" (name) FROM stdin;
20260522000001-create-users.js
20260522000002-create-banners.js
20260522000003-create-services.js
20260522000004-create-user-balances.js
20260522000005-create-transactions.js
20260522000006-create-user-balances-histories.js
\.


--
-- Data for Name: banners; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.banners (id, name, image_url, description, is_active, created_at, created_by, updated_at, updated_by, deleted_at) FROM stdin;
1	Banner 1	https://minio.nutech-integrasi.com/take-home-test/banner/Banner-1.png	Lerem Ipsum Dolor sit amet	t	2026-05-23 13:40:08.182+07	\N	\N	\N	\N
2	Banner 2	https://minio.nutech-integrasi.com/take-home-test/banner/Banner-2.png	Lerem Ipsum Dolor sit amet	t	2026-05-23 13:40:08.182+07	\N	\N	\N	\N
3	Banner 3	https://minio.nutech-integrasi.com/take-home-test/banner/Banner-3.png	Lerem Ipsum Dolor sit amet	t	2026-05-23 13:40:08.182+07	\N	\N	\N	\N
4	Banner 4	https://minio.nutech-integrasi.com/take-home-test/banner/Banner-4.png	Lerem Ipsum Dolor sit amet	t	2026-05-23 13:40:08.182+07	\N	\N	\N	\N
5	Banner 5	https://minio.nutech-integrasi.com/take-home-test/banner/Banner-5.png	Lerem Ipsum Dolor sit amet	t	2026-05-23 13:40:08.182+07	\N	\N	\N	\N
\.


--
-- Data for Name: services; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.services (id, code, name, icon_url, tariff, is_active, created_at, created_by, updated_at, updated_by, deleted_at) FROM stdin;
1	PAJAK	Pajak PBB	https://minio.nutech-integrasi.com/take-home-test/services/PBB.png	40000	t	2026-05-23 13:48:13.283+07	\N	\N	\N	\N
2	PLN	Listrik	https://minio.nutech-integrasi.com/take-home-test/services/Listrik.png	10000	t	2026-05-23 13:48:13.283+07	\N	\N	\N	\N
3	PDAM	PDAM Berlangganan	https://minio.nutech-integrasi.com/take-home-test/services/PDAM.png	40000	t	2026-05-23 13:48:13.283+07	\N	\N	\N	\N
4	PULSA	Pulsa	https://minio.nutech-integrasi.com/take-home-test/services/Pulsa.png	40000	t	2026-05-23 13:48:13.283+07	\N	\N	\N	\N
5	PGN	PGN Berlangganan	https://minio.nutech-integrasi.com/take-home-test/services/PGN.png	50000	t	2026-05-23 13:48:13.283+07	\N	\N	\N	\N
6	MUSIK	Musik Berlangganan	https://minio.nutech-integrasi.com/take-home-test/services/Musik.png	50000	t	2026-05-23 13:48:13.283+07	\N	\N	\N	\N
7	TV	TV Berlangganan	https://minio.nutech-integrasi.com/take-home-test/services/Televisi.png	50000	t	2026-05-23 13:48:13.283+07	\N	\N	\N	\N
8	PAKET_DATA	Paket Data	https://minio.nutech-integrasi.com/take-home-test/services/Paket-Data.png	50000	t	2026-05-23 13:48:13.283+07	\N	\N	\N	\N
9	VOUCHER_GAME	Voucher Game	https://minio.nutech-integrasi.com/take-home-test/services/Game.png	100000	t	2026-05-23 13:48:13.283+07	\N	\N	\N	\N
10	VOUCHER_MAKANAN	Voucher Makanan	https://minio.nutech-integrasi.com/take-home-test/services/Voucher-Makanan.png	100000	t	2026-05-23 13:48:13.283+07	\N	\N	\N	\N
11	QURBAN	Qurban	https://minio.nutech-integrasi.com/take-home-test/services/Qurban.png	200000	t	2026-05-23 13:48:13.283+07	\N	\N	\N	\N
12	ZAKAT	Zakat	https://minio.nutech-integrasi.com/take-home-test/services/Zakat.png	300000	t	2026-05-23 13:48:13.283+07	\N	\N	\N	\N
\.


--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transactions (id, user_id, service_id, invoice_number, transaction_type, transaction_status, payment_method, total_amount, balance_before, balance_after, service_code_snapshot, service_name_snapshot, service_tariff_snapshot, description, metadata, created_at, created_by, updated_at, updated_by, deleted_at) FROM stdin;
\.


--
-- Data for Name: user_balance_histories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_balance_histories (id, user_id, transaction_id, type, amount, balance_before, balance_after, description, created_at) FROM stdin;
\.


--
-- Data for Name: user_balances; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_balances (user_id, balance, updated_at, updated_by) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, role, email, password, first_name, last_name, profile_image_url, last_login_at, is_active, created_at, created_by, updated_at, updated_by, deleted_at) FROM stdin;
1	ADMIN	admin@nutech-integrasi.com	-	Administrator	Nutech Edit	https://minio.nutech-integrasi.com/take-home-test/profile/LLKR6JL1-1779300347439.png	\N	t	2026-05-23 13:48:13.299+07	\N	\N	\N	\N
2	MEMBER	user@nutech-integrasi.com	-	User	Nutech Edit	https://minio.nutech-integrasi.com/take-home-test/profile/LLKR6JL1-1779300347439.png	\N	t	2026-05-23 13:48:13.299+07	\N	\N	\N	\N
\.


--
-- Name: banners_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.banners_id_seq', 6, false);


--
-- Name: services_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.services_id_seq', 12, true);


--
-- Name: transactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transactions_id_seq', 1, false);


--
-- Name: user_balance_histories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_balance_histories_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: banners banners_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.banners
    ADD CONSTRAINT banners_pkey PRIMARY KEY (id);


--
-- Name: services services_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_code_key UNIQUE (code);


--
-- Name: services services_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_pkey PRIMARY KEY (id);


--
-- Name: transactions transactions_invoice_number_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_invoice_number_key UNIQUE (invoice_number);


--
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);


--
-- Name: user_balance_histories user_balance_histories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_balance_histories
    ADD CONSTRAINT user_balance_histories_pkey PRIMARY KEY (id);


--
-- Name: user_balances user_balances_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_balances
    ADD CONSTRAINT user_balances_pkey PRIMARY KEY (user_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: banners_name; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX banners_name ON public.banners USING btree (name);


--
-- Name: services_code; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX services_code ON public.services USING btree (code);


--
-- Name: services_is_active; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX services_is_active ON public.services USING btree (is_active);


--
-- Name: services_name; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX services_name ON public.services USING btree (name);


--
-- Name: transactions_created_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX transactions_created_at ON public.transactions USING btree (created_at);


--
-- Name: transactions_invoice_number; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX transactions_invoice_number ON public.transactions USING btree (invoice_number);


--
-- Name: transactions_service_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX transactions_service_id ON public.transactions USING btree (service_id);


--
-- Name: transactions_transaction_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX transactions_transaction_status ON public.transactions USING btree (transaction_status);


--
-- Name: transactions_transaction_type; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX transactions_transaction_type ON public.transactions USING btree (transaction_type);


--
-- Name: transactions_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX transactions_user_id ON public.transactions USING btree (user_id);


--
-- Name: user_balance_histories_created_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX user_balance_histories_created_at ON public.user_balance_histories USING btree (created_at);


--
-- Name: user_balance_histories_transaction_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX user_balance_histories_transaction_id ON public.user_balance_histories USING btree (transaction_id);


--
-- Name: user_balance_histories_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX user_balance_histories_user_id ON public.user_balance_histories USING btree (user_id);


--
-- Name: users_email; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_email ON public.users USING btree (email);


--
-- Name: users_is_active; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_is_active ON public.users USING btree (is_active);


--
-- Name: transactions transactions_service_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_service_id_fkey FOREIGN KEY (service_id) REFERENCES public.services(id);


--
-- Name: transactions transactions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: user_balance_histories user_balance_histories_transaction_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_balance_histories
    ADD CONSTRAINT user_balance_histories_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.transactions(id);


--
-- Name: user_balance_histories user_balance_histories_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_balance_histories
    ADD CONSTRAINT user_balance_histories_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: user_balances user_balances_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_balances
    ADD CONSTRAINT user_balances_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict KMazhFaybLDgcCgXgAFE2ftpjr2qw6F7rLzYcUePRCKyEgE5p9RLl4XSs3CGRO2

