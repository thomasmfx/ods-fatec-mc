package br.com.fatec.ods.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import br.com.fatec.ods.dto.request.PropostaRequestDTO;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class PropostaRepository {

    private final JdbcTemplate jdbc;

    public void inserir(PropostaRequestDTO req) {
        String sql = """
            INSERT INTO PROPOSTAS (prp_titulo, prp_descricao, prp_autor, prp_autor_email, prp_eos_id)
            VALUES (?, ?, ?, ?, ?)
            """;

        jdbc.update(sql, req.titulo(), req.descricao(), req.autor(), req.autorEmail(), req.eixoId());
    }

    public void deletar(Integer id) {
        Integer votos = jdbc.queryForObject(
            "SELECT COUNT(*) FROM VOTACOES WHERE vot_prp_id = ?", 
            Integer.class, id);

        if (votos != null && votos > 0) {
            throw new RuntimeException("Não é possível excluir uma proposta que já possui votos.");
        }

        jdbc.update("DELETE FROM PROPOSTAS WHERE prp_id = ?", id);
    }
}