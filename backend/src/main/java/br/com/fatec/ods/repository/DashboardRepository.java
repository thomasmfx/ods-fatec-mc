package br.com.fatec.ods.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class DashboardRepository {

    private final JdbcTemplate jdbc;

    public Integer countInscritos(LocalDate data) {
        if (data != null) {
            return jdbc.queryForObject(
                "SELECT COUNT(*) FROM PARTICIPANTES WHERE par_data_conferencia = ?", 
                Integer.class, data);
        }
        return jdbc.queryForObject("SELECT COUNT(*) FROM PARTICIPANTES", Integer.class);
    }

    public Integer countVotantes(LocalDate data) {
        if (data != null) {
            return jdbc.queryForObject(
                "SELECT COUNT(DISTINCT vot_par_id) FROM VOTACOES WHERE vot_data = ?", 
                Integer.class, data);
        }
        return jdbc.queryForObject("SELECT COUNT(DISTINCT vot_par_id) FROM VOTACOES", Integer.class);
    }

    public Integer countVotos(LocalDate data) {
        if (data != null) {
            return jdbc.queryForObject(
                "SELECT COUNT(*) FROM VOTACOES WHERE vot_data = ?", 
                Integer.class, data);
        }
        return jdbc.queryForObject("SELECT COUNT(*) FROM VOTACOES", Integer.class);
    }

    public List<Map<String, Object>> getVotosPorProposta(LocalDate data) {
        if (data != null) {
            String sql = """
                SELECT 
                    e.eos_id AS eixo_id, 
                    e.eos_nome AS eixo_nome,
                    e.eos_descricao AS eixo_descricao,
                    p.prp_id AS prop_id, 
                    p.prp_titulo AS prop_titulo,
                    COUNT(v.vot_par_id) AS qtd_votos
                FROM EIXOS_ODS e
                INNER JOIN PROPOSTAS p ON p.prp_eos_id = e.eos_id
                LEFT JOIN VOTACOES v ON p.prp_id = v.vot_prp_id AND v.vot_data = ?
                WHERE p.prp_data = ?  -- <-- A MÁGICA ACONTECE AQUI
                GROUP BY e.eos_id, e.eos_nome, e.eos_descricao, p.prp_id, p.prp_titulo
                ORDER BY e.eos_id, p.prp_id
            """;
            // Passamos a 'data' duas vezes: uma pro LEFT JOIN (contar votos do dia) e outra pro WHERE (filtrar propostas do dia)
            return jdbc.queryForList(sql, data, data);
        } else {
            // Visão Geral: Mostra TODAS as propostas de TODOS os dias
            String sql = """
                SELECT 
                    e.eos_id AS eixo_id, 
                    e.eos_nome AS eixo_nome,
                    e.eos_descricao AS eixo_descricao,
                    p.prp_id AS prop_id, 
                    p.prp_titulo AS prop_titulo,
                    COUNT(v.vot_par_id) AS qtd_votos
                FROM EIXOS_ODS e
                INNER JOIN PROPOSTAS p ON p.prp_eos_id = e.eos_id
                LEFT JOIN VOTACOES v ON p.prp_id = v.vot_prp_id
                GROUP BY e.eos_id, e.eos_nome, e.eos_descricao, p.prp_id, p.prp_titulo
                ORDER BY e.eos_id, p.prp_id
            """;
            return jdbc.queryForList(sql);
        }
    }
}