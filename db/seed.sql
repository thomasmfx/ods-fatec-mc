-- =============================================================
-- SEED DE DADOS — Sistema ODS Fatec Mogi das Cruzes
-- Participantes com dados fictícios para testes
-- =============================================================

SET FOREIGN_KEY_CHECKS = 0;

-- -------------------------------------------------------------
-- IDENTIDADES_GENERO
-- -------------------------------------------------------------
INSERT INTO IDENTIDADES_GENERO (idg_id, idg_nome) VALUES
(1, 'Homem'),
(2, 'Homem - cis'),
(3, 'Mulher - cis'),
(4, 'Não binário'),
(5, 'Prefiro não informar');

-- -------------------------------------------------------------
-- ORIENTACOES_SEXUAIS
-- -------------------------------------------------------------
INSERT INTO ORIENTACOES_SEXUAIS (ors_id, ors_nome) VALUES
(1, 'Heterossexual'),
(2, 'Homossexual'),
(3, 'Bissexual'),
(4, 'Prefiro não informar');

-- -------------------------------------------------------------
-- RACAS_CORES
-- -------------------------------------------------------------
INSERT INTO RACAS_CORES (rcr_id, rcr_nome) VALUES
(1, 'Branca'),
(2, 'Parda'),
(3, 'Negra (Pardos)'),
(4, 'Amarela'),
(5, 'Indígena');

-- -------------------------------------------------------------
-- REGIOES
-- -------------------------------------------------------------
INSERT INTO REGIOES (reg_id, reg_nome) VALUES
(1, 'Urbana'),
(2, 'Rural');

-- -------------------------------------------------------------
-- CIDADES_RESIDENCIAS
-- -------------------------------------------------------------
INSERT INTO CIDADES_RESIDENCIAS (cid_id, cid_nome) VALUES
(1, 'Mogi das Cruzes'),
(2, 'São Paulo'),
(3, 'Guararema'),
(4, 'Guarulhos'),
(5, 'Suzano');

-- -------------------------------------------------------------
-- DEFICIENCIAS
-- -------------------------------------------------------------
INSERT INTO DEFICIENCIAS (def_id, def_nome) VALUES
(1, 'Visual'),
(2, 'Auditiva'),
(3, 'Física'),
(4, 'Intelectual'),
(5, 'Múltipla');

-- -------------------------------------------------------------
-- TIPOS_PARTICIPANTES
-- -------------------------------------------------------------
INSERT INTO TIPOS_PARTICIPANTES (tpp_id, tpp_descricao) VALUES
(1, 'Presencial');

-- -------------------------------------------------------------
-- INSTITUICOES_VINCULOS
-- -------------------------------------------------------------
INSERT INTO INSTITUICOES_VINCULOS (itv_id, itv_nome) VALUES
(1, 'Instituição Pública'),
(2, 'Instituição Privada'),
(3, 'Sociedade civil'),
(4, 'Pública e Privada'),
(5, 'Comunidade'),
(6, 'Outro');

-- -------------------------------------------------------------
-- AREAS_FORMACAO
-- -------------------------------------------------------------
INSERT INTO AREAS_FORMACAO (afm_id, afm_nome) VALUES
(1, 'Ensino Superior Incompleto'),
(2, 'Ensino Superior Completo'),
(3, 'Ensino Superior Cursando'),
(4, 'Professor(a)'),
(5, 'Não estudo');

-- -------------------------------------------------------------
-- PUBLICOS_FATEC
-- -------------------------------------------------------------
INSERT INTO PUBLICOS_FATEC (pub_id, pub_nome) VALUES
(1, 'Estudante'),
(2, 'Parceiro'),
(3, 'Docente'),
(4, 'Empreendedor'),
(5, 'Participante'),
(6, 'Ex estudante'),
(7, 'Sociedade');

-- -------------------------------------------------------------
-- CADEIAS_PRODUTIVAS
-- -------------------------------------------------------------
INSERT INTO CADEIAS_PRODUTIVAS (cdp_id, cdp_nome) VALUES
(1, 'Criação'),
(2, 'Tecnologia'),
(3, 'Agronegócio');

-- -------------------------------------------------------------
-- EIXOS_ODS
-- -------------------------------------------------------------
INSERT INTO EIXOS_ODS (eos_id, eos_nome, eos_descricao) VALUES
(1, 'Eixo 1', 'Democracia e instituições fortes'),
(2, 'Eixo 2', 'Sustentabilidade ambiental'),
(3, 'Eixo 3', 'Inclusão social e direitos humanos'),
(4, 'Eixo 4', 'Inovação tecnológica para o desenvolvimento sustentável'),
(5, 'Eixo 5', 'Governança participativa');

-- -------------------------------------------------------------
-- PROPOSTAS (2 por eixo)
-- -------------------------------------------------------------
INSERT INTO PROPOSTAS (prp_id, prp_titulo, prp_descricao, prp_eos_id) VALUES
(1,  'Fortalecimento das instituições democráticas', 'Criação de mecanismos de transparência e controle social nas instituições públicas municipais.', 1),
(2,  'Participação cidadã nos processos decisórios',  'Implementação de plataformas digitais para consulta pública e engajamento da sociedade.',       1),
(3,  'Redução de resíduos sólidos urbanos',           'Programa de compostagem e coleta seletiva em bairros da cidade com metas anuais.',               2),
(4,  'Arborização urbana e corredores verdes',         'Plantio de espécies nativas em vias públicas e criação de corredores ecológicos urbanos.',        2),
(5,  'Acesso à saúde para populações vulneráveis',    'Expansão de UBSs em regiões periféricas com foco em saúde mental e preventiva.',                  3),
(6,  'Educação inclusiva e equidade de gênero',        'Políticas de permanência escolar para grupos historicamente excluídos do ensino superior.',        3),
(7,  'Incentivo à inovação em startups locais',        'Criação de hub de inovação com suporte técnico e financeiro para empreendedores locais.',          4),
(8,  'Capacitação digital para trabalhadores',         'Programa de letramento digital para trabalhadores de setores tradicionais em transição.',          4),
(9,  'Orçamento participativo digital',                'Plataforma de votação online para alocação de parte do orçamento municipal pelos cidadãos.',       5),
(10, 'Conselhos municipais fortalecidos',              'Revisão das estruturas dos conselhos municipais para maior representatividade deliberativa.',       5);

-- -------------------------------------------------------------
-- PARTICIPANTES (10 registros fictícios)
-- par_itv_outro preenchido apenas quando par_itv_id = 6 (Outro)
-- -------------------------------------------------------------
INSERT INTO PARTICIPANTES (par_id, par_nome, par_mail, par_fone, par_data_conferencia, par_recs_acessibilidade, par_ocupacao, par_tpp_id, par_idg_id, par_ors_id, par_rcr_id, par_cid_id, par_autorizacao, par_reg_id, par_itv_id, par_itv_outro) VALUES
(1,  'Carlos Eduardo Mendes',   'carlos.mendes@email.com',   '11911110001', '2026-03-28', NULL,                    'Servidor Público Municipal', 1, 2, 1, 1, 1, 'S', 1, 1, NULL),
(2,  'Juliana Ferreira Costa',  'juliana.costa@email.com',   '11911110002', '2026-03-28', NULL,                    'Estudante de Sistemas',      1, 3, 1, 2, 1, 'S', 1, 2, NULL),
(3,  'Roberto Alves Souza',     'roberto.souza@email.com',   '11911110003', '2026-03-28', NULL,                    'Aposentado',                 1, 2, 1, 1, 3, 'S', 2, 3, NULL),
(4,  'Beatriz Lima Rodrigues',  'beatriz.lima@email.com',    '11911110004', '2026-04-04', NULL,                    'Engenheira Ambiental',       1, 3, 1, 3, 2, 'S', 1, 2, NULL),
(5,  'Lucas Henrique Martins',  'lucas.martins@email.com',   '11911110005', '2026-04-04', NULL,                    'Empreendedor',               1, 2, 1, 1, 1, 'S', 1, 3, NULL),
(6,  'Fernanda Oliveira Nunes', 'fernanda.nunes@email.com',  '11911110006', '2026-03-28', 'Intérprete de Libras',  'Professora',                 1, 3, 3, 2, 5, 'S', 1, 1, NULL),
(7,  'André Gustavo Pereira',   'andre.pereira@email.com',   '11911110007', '2026-04-04', NULL,                    'Advogado',                   1, 2, 1, 1, 1, 'S', 1, 1, NULL),
(8,  'Camila Torres Ribeiro',   'camila.ribeiro@email.com',  '11911110008', '2026-03-28', NULL,                    'Assistente Social',          1, 3, 2, 5, 4, 'S', 1, 3, NULL),
(9,  'Thiago Nascimento Prado', 'thiago.prado@email.com',    '11911110009', '2026-04-04', NULL,                    'Técnico em Meio Ambiente',   1, 2, 1, 4, 1, 'S', 1, 4, NULL),
(10, 'Mariana Santos Azevedo',  'mariana.azevedo@email.com', '11911110010', '2026-03-28', NULL,                    'Pesquisadora',               1, 3, 1, 1, 2, 'S', 1, 6, 'Instituto de Pesquisa Estadual');

-- -------------------------------------------------------------
-- PARTICIPANTES_AREAS
-- -------------------------------------------------------------
INSERT INTO PARTICIPANTES_AREAS (ppa_par_id, ppa_afm_id) VALUES
(1,  2),
(2,  3),
(3,  2),
(4,  2),
(5,  3),
(6,  4),
(7,  2),
(8,  2),
(9,  1),
(10, 2);

-- -------------------------------------------------------------
-- PARTICIPANTES_PUBLICOS
-- -------------------------------------------------------------
INSERT INTO PARTICIPANTES_PUBLICOS (ppb_par_id, ppb_pub_id) VALUES
(1,  5),
(2,  1),
(3,  7),
(4,  6),
(5,  4),
(6,  3),
(7,  2),
(8,  5),
(9,  1),
(10, 3);

-- -------------------------------------------------------------
-- PARTICIPANTES_CADS_PRODUTIVAS
-- -------------------------------------------------------------
INSERT INTO PARTICIPANTES_CADS_PRODUTIVAS (pcp_par_id, pcp_cdp_id) VALUES
(5,  2),
(9,  3);

-- -------------------------------------------------------------
-- PARTICIPANTES_EIXOS
-- -------------------------------------------------------------
INSERT INTO PARTICIPANTES_EIXOS (ppe_par_id, ppe_eos_id) VALUES
(1,  1), (1,  2),
(2,  4), (2,  5),
(3,  1), (3,  3),
(4,  2), (4,  3),
(5,  4), (5,  5),
(6,  3), (6,  5),
(7,  1), (7,  5),
(8,  3), (8,  2),
(9,  2), (9,  4),
(10, 1), (10, 4);

-- -------------------------------------------------------------
-- VOTACOES
-- -------------------------------------------------------------
INSERT INTO VOTACOES (vot_par_id, vot_prp_id, vot_data) VALUES
(1,  1,  '2026-03-28'),
(1,  3,  '2026-03-28'),
(2,  7,  '2026-03-28'),
(2,  9,  '2026-03-28'),
(3,  1,  '2026-03-28'),
(3,  5,  '2026-03-28'),
(4,  4,  '2026-04-04'),
(4,  6,  '2026-04-04'),
(5,  7,  '2026-04-04'),
(5,  10, '2026-04-04'),
(6,  5,  '2026-03-28'),
(6,  9,  '2026-03-28'),
(7,  1,  '2026-04-04'),
(7,  10, '2026-04-04'),
(8,  5,  '2026-03-28'),
(8,  3,  '2026-03-28'),
(9,  3,  '2026-04-04'),
(9,  7,  '2026-04-04'),
(10, 2,  '2026-03-28'),
(10, 8,  '2026-03-28');

SET FOREIGN_KEY_CHECKS = 1;