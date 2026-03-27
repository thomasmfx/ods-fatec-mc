package br.com.fatec.ods.service;

import br.com.fatec.ods.dto.response.EixoDTO;
import br.com.fatec.ods.dto.response.EixosResponseDTO;
import br.com.fatec.ods.dto.response.PropostaDTO;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class EixoService {

    private final JdbcTemplate jdbcTemplate;

    public EixoService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public EixosResponseDTO listarEixosComPropostas() {
        String sql = """
            SELECT e.eos_id, e.eos_nome, e.eos_descricao,
                   p.prp_id, p.prp_titulo, p.prp_descricao, p.prp_autor
            FROM EIXOS_ODS e
            LEFT JOIN PROPOSTAS p ON e.eos_id = p.prp_eos_id
            ORDER BY e.eos_id, p.prp_id
        """;

        List<EixoDTO> eixosList = jdbcTemplate.query(sql, rs -> {
            Map<Integer, EixoDTO> mapEixos = new LinkedHashMap<>();

            while (rs.next()) {
                Integer eixoId = rs.getInt("eos_id");

                mapEixos.putIfAbsent(eixoId, new EixoDTO(
                        eixoId,
                        rs.getString("eos_nome"),
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
        });

        return new EixosResponseDTO(eixosList);
    }
}