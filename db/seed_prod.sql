-- =============================================================
-- SEED DE PRODUÇÃO — Sistema ODS Fatec Mogi das Cruzes
-- Dados fixos que devem estar no banco antes do evento
-- Baseado exatamente no Google Forms oficial
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
-- PROPOSTAS (serão definidas pela orientadora antes do evento)
-- -------------------------------------------------------------

SET FOREIGN_KEY_CHECKS = 1;