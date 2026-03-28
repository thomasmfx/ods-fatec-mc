package br.com.fatec.ods.repository;

import java.sql.Statement;
import java.sql.PreparedStatement;
import java.util.List;
import java.util.Optional;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import br.com.fatec.ods.dto.request.CadastroRequestDTO;
import br.com.fatec.ods.dto.response.ParticipanteResumoDTO;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class ParticipanteRepository {

    private final JdbcTemplate jdbc;

    public Optional<ParticipanteResumoDTO> buscarResumoPorEmail(String email) {
        String sql = """
            SELECT p.par_id, p.par_nome, p.par_mail, t.tpp_descricao
            FROM PARTICIPANTES p
            JOIN TIPOS_PARTICIPANTES t ON t.tpp_id = p.par_tpp_id
            WHERE p.par_mail = ?
            """;

        return jdbc.query(sql, (rs, rn) -> new ParticipanteResumoDTO(
            rs.getInt("par_id"),
            rs.getString("par_nome"),
            rs.getString("par_mail"),
            rs.getString("tpp_descricao")
        ), email).stream().findFirst();
    }
    
    public boolean existsByMail(String mail) {
        Integer count = jdbc.queryForObject(
            "SELECT COUNT(*) FROM PARTICIPANTES WHERE par_mail = ?",
            Integer.class, mail);
        return count != null && count > 0;
    }

    public int inserir(CadastroRequestDTO req) {
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbc.update(con -> {
            PreparedStatement ps = con.prepareStatement(
                """
                INSERT INTO PARTICIPANTES (
                    par_nome, par_mail, par_fone, par_data_conferencia,
                    par_recs_acessibilidade, par_ocupacao,
                    par_tpp_id, par_idg_id, par_ors_id, par_rcr_id,
                    par_cid_id, par_cid_outro, par_autorizacao, par_reg_id,
                    par_itv_id, par_itv_outro
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, req.getNome());
            ps.setString(2, req.getEmail());
            ps.setString(3, req.getTelefone().replaceAll("\\D", ""));
            ps.setDate(4, java.sql.Date.valueOf(req.getDataConferencia()));
            ps.setString(5, req.getRecursoAcessibilidade());
            ps.setString(6, req.getOcupacao());
            ps.setInt(7, req.getTipoParticipanteId());
            ps.setInt(8, req.getIdentidadeGeneroId());
            ps.setInt(9, req.getOrientacaoSexualId());
            ps.setInt(10, req.getRacaCorId());
            ps.setInt(11, req.getCidadeId());
            ps.setString(12, req.getCidadeOutro()); // ajusta o índice conforme sua query
            ps.setString(13, Boolean.TRUE.equals(req.getAutorizacaoImagem()) ? "S" : "N");
            ps.setInt(14, req.getRegiaoId());
            ps.setInt(15, req.getInstituicaoId());
            ps.setString(16, req.getInstituicaoOutro());
            return ps;
        }, keyHolder);
        return keyHolder.getKey().intValue();
    }

    public void inserirEixos(int parId, List<Integer> eixoIds) {
        for (Integer eixoId : eixoIds) {
            jdbc.update(
                "INSERT INTO PARTICIPANTES_EIXOS (ppe_par_id, ppe_eos_id) VALUES (?, ?)",
                parId, eixoId);
        }
    }
    // idem pra areas, publicos, cadeias, deficiencias

    public void inserirAreas(int parId, List<Integer> areaIds) {
      for (Integer areaId : areaIds) {
        jdbc.update(
            "INSERT INTO PARTICIPANTES_AREAS (ppa_par_id, ppa_afm_id) VALUES (?, ?)",
            parId, areaId);
      }
    }

    public void inserirPublicos(int parId, List<Integer> publicoIds) {
      for (Integer publicoId : publicoIds) {
        jdbc.update(
            "INSERT INTO PARTICIPANTES_PUBLICOS (ppb_pub_id, ppb_par_id) VALUES (?, ?)",
            publicoId, parId);
      }
    }

    public void inserirCadeias(int parId, List<Integer> cadeiaIds) {
      for (Integer cadeiaId : cadeiaIds) {
        jdbc.update(
            "INSERT INTO PARTICIPANTES_CADS_PRODUTIVAS (pcp_cdp_id, pcp_par_id) VALUES (?, ?)",
            cadeiaId, parId
        );
      }
    }

    public void inserirDeficiencias(int parId, List<Integer> deficienciaIds) {
      for (Integer deficienciaId : deficienciaIds) {
        jdbc.update(
            "INSERT INTO DEFICIENCIAS_PARTICIPANTES (dfp_def_id, dfp_par_id) VALUES (?, ?)",
            deficienciaId, parId
        );
      }
    }
}
