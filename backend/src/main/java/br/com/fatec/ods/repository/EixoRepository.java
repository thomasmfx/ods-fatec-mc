package br.com.fatec.ods.repository;

import br.com.fatec.ods.dto.response.EixoDTO;
import br.com.fatec.ods.dto.response.PropostaDTO;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Repository
public class EixoRepository {

    private final JdbcTemplate jdbcTemplate;

    public EixoRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<EixoDTO> buscarEixosComPropostas(String dataEvento) {
        
        // Filtra as propostas ativas daquela data específica
        String sql = """
            SELECT e.eos_id, e.eos_nome, e.eos_descricao,
                   p.prp_id, p.prp_titulo, p.prp_descricao, p.prp_autor
            FROM EIXOS_ODS e
            LEFT JOIN PROPOSTAS p ON e.eos_id = p.prp_eos_id AND p.prp_data = ?
            ORDER BY e.eos_id, p.prp_id
        """;

        return jdbcTemplate.query(sql, rs -> {
            Map<Integer, EixoDTO> mapEixos = new LinkedHashMap<>();

            while (rs.next()) {
                Integer eixoId = rs.getInt("eos_id");
                
                // Formata o nome "Eixo 1 - Descrição..."
                String nomeFormatado = rs.getString("eos_nome") + " - " + rs.getString("eos_descricao");

                mapEixos.putIfAbsent(eixoId, new EixoDTO(
                        eixoId,
                        nomeFormatado,
                        rs.getString("eos_descricao"),
                        new ArrayList<>()
                ));

                Integer propostaId = rs.getObject("prp_id", Integer.class);
                if (propostaId != null) {
                    PropostaDTO proposta = new PropostaDTO(
                            propostaId,
                            rs.getString("prp_titulo"),
                            rs.getString("prp_descricao"),
                            rs.getString("prp_autor")
                    );
                    mapEixos.get(eixoId).propostas().add(proposta);
                }
            }
            
            return new ArrayList<>(mapEixos.values());
        }, dataEvento);
    }
}