package br.com.fatec.ods.controller;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    private final JdbcTemplate jdbcTemplate;

    public DashboardController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @GetMapping
    public Map<String, Object> getResultados() {
        Map<String, Object> response = new HashMap<>();

        // 1. Contagens gerais usando os nomes exatos do schema
        Integer totalParticipantes = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM PARTICIPANTES", Integer.class);
        Integer totalVotos = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM VOTACOES", Integer.class);

        response.put("totalParticipantes", totalParticipantes != null ? totalParticipantes : 0);
        response.put("totalVotos", totalVotos != null ? totalVotos : 0);

        // 2. Busca eixos, propostas e contagem de votos cruzando as chaves estrangeiras exatas
        String sql = """
            SELECT 
                e.eos_id AS eixo_id, 
                e.eos_nome AS eixo_nome,
                p.prp_id AS prop_id, 
                p.prp_titulo AS prop_titulo,
                (SELECT COUNT(*) FROM VOTACOES v WHERE v.vot_prp_id = p.prp_id) AS qtd_votos
            FROM EIXOS_ODS e
            JOIN PROPOSTAS p ON p.prp_eos_id = e.eos_id
            ORDER BY e.eos_id, p.prp_id
        """;

        List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);

        // Agrupa o resultado do SQL no formato JSON que o Front espera
        Map<Integer, Map<String, Object>> eixosMap = new LinkedHashMap<>();

        for (Map<String, Object> row : rows) {
            Integer eixoId = ((Number) row.get("eixo_id")).intValue();
            
            eixosMap.putIfAbsent(eixoId, new HashMap<>(Map.of(
                "id", eixoId,
                "num", "EIXO 0" + eixoId,
                "nome", row.get("eixo_nome"),
                "propostas", new ArrayList<Map<String, Object>>()
            )));

            Map<String, Object> eixo = eixosMap.get(eixoId);
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> propostas = (List<Map<String, Object>>) eixo.get("propostas");

            Map<String, Object> proposta = new HashMap<>();
            proposta.put("titulo", row.get("prop_titulo"));
            proposta.put("votos", ((Number) row.get("qtd_votos")).intValue());
            
            propostas.add(proposta);
        }

        response.put("eixos", eixosMap.values());
        return response;
    }
}