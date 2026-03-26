-- =============================================================
-- SEED DE DESENVOLVIMENTO — Sistema ODS Fatec Mogi das Cruzes
-- Dados fixos (enums) + participantes e votos fictícios para teste
-- =============================================================

SET FOREIGN_KEY_CHECKS = 0;

-- -------------------------------------------------------------
-- IDENTIDADES_GENERO
-- -------------------------------------------------------------
INSERT INTO IDENTIDADES_GENERO (idg_id, idg_nome) VALUES
(1, 'Mulher - cis'),
(2, 'Mulher - trans'),
(3, 'Homem - cis'),
(4, 'Homem - trans'),
(5, 'Travesti'),
(6, 'Não-binário'),
(7, 'Outro');

-- -------------------------------------------------------------
-- ORIENTACOES_SEXUAIS
-- -------------------------------------------------------------
INSERT INTO ORIENTACOES_SEXUAIS (ors_id, ors_nome) VALUES
(1, 'Bissexual'),
(2, 'Gay'),
(3, 'Heterossexual'),
(4, 'Lésbica'),
(5, 'Pansexual'),
(6, 'Outro');

-- -------------------------------------------------------------
-- RACAS_CORES
-- -------------------------------------------------------------
INSERT INTO RACAS_CORES (rcr_id, rcr_nome) VALUES
(1, 'Indígena'),
(2, 'Negra (Pretos)'),
(3, 'Negra (Pardos)'),
(4, 'Branca'),
(5, 'Amarela');

-- -------------------------------------------------------------
-- DEFICIENCIAS
-- -------------------------------------------------------------
INSERT INTO DEFICIENCIAS (def_id, def_nome) VALUES
(1, 'pessoa cega'),
(2, 'pessoa com baixa visão'),
(3, 'pessoa surda usuária de Libras'),
(4, 'pessoa surda oralizada'),
(5, 'pessoa surda cega'),
(6, 'pessoa com deficiência física/motora'),
(7, 'pessoa com deficiência intelectual/mental');

-- -------------------------------------------------------------
-- REGIOES
-- -------------------------------------------------------------
INSERT INTO REGIOES (reg_id, reg_nome) VALUES
(1, 'Rural'),
(2, 'Urbana');

-- -------------------------------------------------------------
-- CIDADES_RESIDENCIAS
-- -------------------------------------------------------------
INSERT INTO CIDADES_RESIDENCIAS (cid_id, cid_nome) VALUES
(1,  'Arujá'),
(2,  'Biritiba-Mirim'),
(3,  'Ferraz de Vasconcelos'),
(4,  'Guararema'),
(5,  'Guarulhos'),
(6,  'Igaratá'),
(7,  'Itaquaquecetuba'),
(8,  'Mairiporã'),
(9,  'Mogi das Cruzes'),
(10, 'Poá'),
(11, 'Salesópolis'),
(12, 'Santa Isabel'),
(13, 'Santa Branca'),
(14, 'Suzano'),
(15, 'Outro');

-- -------------------------------------------------------------
-- CADEIAS_PRODUTIVAS
-- -------------------------------------------------------------
INSERT INTO CADEIAS_PRODUTIVAS (cdp_id, cdp_nome) VALUES
(1, 'Cultivo'),
(2, 'Criação'),
(3, 'Agroindústria');

-- -------------------------------------------------------------
-- INSTITUICOES_VINCULOS
-- -------------------------------------------------------------
INSERT INTO INSTITUICOES_VINCULOS (itv_id, itv_nome) VALUES
(1, 'Instituição Pública'),
(2, 'Instituição Privada'),
(3, 'Sociedade civil'),
(4, 'Comunidade'),
(5, 'Outro');

-- -------------------------------------------------------------
-- AREAS_FORMACAO
-- -------------------------------------------------------------
INSERT INTO AREAS_FORMACAO (afm_id, afm_nome) VALUES
(1,  'Estudante'),
(2,  'Professor(a)'),
(3,  'Ensino Fundamental do 1º. ao 4º. Ano'),
(4,  'Ensino Fundamental do 5º. ao 9º. Ano'),
(5,  'Ensino Médio Cursando'),
(6,  'Ensino Técnico Cursando'),
(7,  'Ensino Técnico Completo'),
(8,  'Ensino Superior Cursando'),
(9,  'Ensino Superior Completo'),
(10, 'Outro');

-- -------------------------------------------------------------
-- PUBLICOS_FATEC
-- -------------------------------------------------------------
INSERT INTO PUBLICOS_FATEC (pub_id, pub_nome) VALUES
(1, 'Estudante'),
(2, 'Docente'),
(3, 'Gestor'),
(4, 'Parceiro'),
(5, 'Outro');

-- -------------------------------------------------------------
-- TIPOS_PARTICIPANTES
-- -------------------------------------------------------------
INSERT INTO TIPOS_PARTICIPANTES (tpp_id, tpp_descricao) VALUES
(1, 'Presencial');

-- -------------------------------------------------------------
-- EIXOS_ODS
-- -------------------------------------------------------------
INSERT INTO EIXOS_ODS (eos_id, eos_nome, eos_descricao) VALUES
(1, 'Eixo 1', 'Democracia e instituições fortes'),
(2, 'Eixo 2', 'Sustentabilidade ambiental'),
(3, 'Eixo 4', 'Inovação tecnológica para o desenvolvimento sustentável'),
(4, 'Eixo 5', 'Governança participativa');

-- -------------------------------------------------------------
-- PROPOSTAS (2 por eixo)
-- -------------------------------------------------------------
INSERT INTO PROPOSTAS (prp_id, prp_titulo, prp_descricao, prp_eos_id) VALUES
(1, 'Fortalecimento das instituições democráticas',  'Criação de mecanismos de transparência e controle social nas instituições públicas municipais.', 1),
(2, 'Participação cidadã nos processos decisórios',  'Implementação de plataformas digitais para consulta pública e engajamento da sociedade.',       1),
(3, 'Redução de resíduos sólidos urbanos',           'Programa de compostagem e coleta seletiva em bairros da cidade com metas anuais.',               2),
(4, 'Arborização urbana e corredores verdes',         'Plantio de espécies nativas em vias públicas e criação de corredores ecológicos urbanos.',        2),
(5, 'Incentivo à inovação em startups locais',        'Criação de hub de inovação com suporte técnico e financeiro para empreendedores locais.',          3),
(6, 'Capacitação digital para trabalhadores',         'Programa de letramento digital para trabalhadores de setores tradicionais em transição.',          3),
(7, 'Orçamento participativo digital',                'Plataforma de votação online para alocação de parte do orçamento municipal pelos cidadãos.',       4),
(8, 'Conselhos municipais fortalecidos',              'Revisão das estruturas dos conselhos municipais para maior representatividade deliberativa.',       4);

-- -------------------------------------------------------------
-- PARTICIPANTES (10 registros fictícios)
-- ids ajustados para os novos enums
-- -------------------------------------------------------------
INSERT INTO PARTICIPANTES (par_id, par_nome, par_mail, par_fone, par_data_conferencia, par_recs_acessibilidade, par_ocupacao, par_tpp_id, par_idg_id, par_ors_id, par_rcr_id, par_cid_id, par_autorizacao, par_reg_id, par_itv_id, par_itv_outro) VALUES
(1,  'Carlos Eduardo Mendes',   'carlos.mendes@email.com',   '11911110001', '2026-03-28', NULL,                   'Servidor Público Municipal', 1, 3, 3, 4, 9,  'S', 2, 1, NULL),
(2,  'Juliana Ferreira Costa',  'juliana.costa@email.com',   '11911110002', '2026-03-28', NULL,                   'Estudante de Sistemas',      1, 1, 3, 3, 9,  'S', 2, 2, NULL),
(3,  'Roberto Alves Souza',     'roberto.souza@email.com',   '11911110003', '2026-03-28', NULL,                   'Aposentado',                 1, 3, 3, 4, 4,  'S', 1, 3, NULL),
(4,  'Beatriz Lima Rodrigues',  'beatriz.lima@email.com',    '11911110004', '2026-04-04', NULL,                   'Engenheira Ambiental',       1, 1, 3, 3, 5,  'S', 2, 2, NULL),
(5,  'Lucas Henrique Martins',  'lucas.martins@email.com',   '11911110005', '2026-04-04', NULL,                   'Empreendedor',               1, 3, 3, 4, 9,  'S', 2, 3, NULL),
(6,  'Fernanda Oliveira Nunes', 'fernanda.nunes@email.com',  '11911110006', '2026-03-28', 'Intérprete de Libras', 'Professora',                 1, 1, 4, 3, 14, 'S', 2, 1, NULL),
(7,  'André Gustavo Pereira',   'andre.pereira@email.com',   '11911110007', '2026-04-04', NULL,                   'Advogado',                   1, 3, 3, 4, 9,  'S', 2, 1, NULL),
(8,  'Camila Torres Ribeiro',   'camila.ribeiro@email.com',  '11911110008', '2026-03-28', NULL,                   'Assistente Social',          1, 1, 1, 1, 5,  'S', 2, 3, NULL),
(9,  'Thiago Nascimento Prado', 'thiago.prado@email.com',    '11911110009', '2026-04-04', NULL,                   'Técnico em Meio Ambiente',   1, 3, 3, 5, 9,  'S', 2, 1, NULL),
(10, 'Mariana Santos Azevedo',  'mariana.azevedo@email.com', '11911110010', '2026-03-28', NULL,                   'Pesquisadora',               1, 1, 3, 4, 5,  'S', 2, 5, 'Instituto de Pesquisa Estadual');

-- -------------------------------------------------------------
-- PARTICIPANTES_AREAS
-- -------------------------------------------------------------
INSERT INTO PARTICIPANTES_AREAS (ppa_par_id, ppa_afm_id) VALUES
(1,  9),
(2,  8),
(3,  9),
(4,  9),
(5,  8),
(6,  2),
(7,  9),
(8,  9),
(9,  8),
(10, 9);

-- -------------------------------------------------------------
-- PARTICIPANTES_PUBLICOS
-- -------------------------------------------------------------
INSERT INTO PARTICIPANTES_PUBLICOS (ppb_par_id, ppb_pub_id) VALUES
(2,  1),
(6,  2),
(7,  4),
(9,  1),
(10, 2);

-- -------------------------------------------------------------
-- PARTICIPANTES_CADS_PRODUTIVAS
-- -------------------------------------------------------------
INSERT INTO PARTICIPANTES_CADS_PRODUTIVAS (pcp_par_id, pcp_cdp_id) VALUES
(3, 1),
(9, 2);

-- -------------------------------------------------------------
-- PARTICIPANTES_EIXOS
-- -------------------------------------------------------------
INSERT INTO PARTICIPANTES_EIXOS (ppe_par_id, ppe_eos_id) VALUES
(1,  1), (1,  2),
(2,  3), (2,  4),
(3,  1), (3,  4),
(4,  2), (4,  3),
(5,  3), (5,  4),
(6,  1), (6,  4),
(7,  1), (7,  4),
(8,  2), (8,  4),
(9,  2), (9,  3),
(10, 1), (10, 3);

-- -------------------------------------------------------------
-- VOTACOES
-- -------------------------------------------------------------
INSERT INTO VOTACOES (vot_par_id, vot_prp_id, vot_data) VALUES
(1,  1,  '2026-03-28'),
(1,  3,  '2026-03-28'),
(2,  5,  '2026-03-28'),
(2,  7,  '2026-03-28'),
(3,  2,  '2026-03-28'),
(3,  8,  '2026-03-28'),
(4,  4,  '2026-04-04'),
(4,  5,  '2026-04-04'),
(5,  6,  '2026-04-04'),
(5,  7,  '2026-04-04'),
(6,  1,  '2026-03-28'),
(6,  8,  '2026-03-28'),
(7,  2,  '2026-04-04'),
(7,  7,  '2026-04-04'),
(8,  3,  '2026-03-28'),
(8,  8,  '2026-03-28'),
(9,  4,  '2026-04-04'),
(9,  5,  '2026-04-04'),
(10, 1,  '2026-03-28'),
(10, 6,  '2026-03-28');

SET FOREIGN_KEY_CHECKS = 1;