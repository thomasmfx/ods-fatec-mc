package br.com.fatec.ods.repository;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import br.com.fatec.ods.dto.response.OpcaoDTO;

@Repository
public class OpcoesRepository {

    private final JdbcTemplate jdbc;

    public OpcoesRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    private final RowMapper<OpcaoDTO> mapper =
        (rs, i) -> new OpcaoDTO(rs.getInt(1), rs.getString(2));

    public List<OpcaoDTO> identidadesGenero()    { return jdbc.query("SELECT idg_id, idg_nome FROM IDENTIDADES_GENERO ORDER BY idg_id", mapper); }
    public List<OpcaoDTO> orientacoesSexuais()   { return jdbc.query("SELECT ors_id, ors_nome FROM ORIENTACOES_SEXUAIS ORDER BY ors_id", mapper); }
    public List<OpcaoDTO> racasCores()           { return jdbc.query("SELECT rcr_id, rcr_nome FROM RACAS_CORES ORDER BY rcr_id", mapper); }
    public List<OpcaoDTO> cidades()              { return jdbc.query("SELECT cid_id, cid_nome FROM CIDADES_RESIDENCIAS ORDER BY cid_id", mapper); }
    public List<OpcaoDTO> regioes()              { return jdbc.query("SELECT reg_id, reg_nome FROM REGIOES ORDER BY reg_id", mapper); }
    public List<OpcaoDTO> instituicoes()         { return jdbc.query("SELECT itv_id, itv_nome FROM INSTITUICOES_VINCULOS ORDER BY itv_id", mapper); }
    public List<OpcaoDTO> areasFormacao()        { return jdbc.query("SELECT afm_id, afm_nome FROM AREAS_FORMACAO ORDER BY afm_id", mapper); }
    public List<OpcaoDTO> publicosFatec()        { return jdbc.query("SELECT pub_id, pub_nome FROM PUBLICOS_FATEC ORDER BY pub_id", mapper); }
    public List<OpcaoDTO> cadeiasProdutivas()    { return jdbc.query("SELECT cdp_id, cdp_nome FROM CADEIAS_PRODUTIVAS ORDER BY cdp_id", mapper); }
    public List<OpcaoDTO> tiposParticipante()    { return jdbc.query("SELECT tpp_id, tpp_descricao FROM TIPOS_PARTICIPANTES ORDER BY tpp_id", mapper); }
    public List<OpcaoDTO> deficiencias()         { return jdbc.query("SELECT def_id, def_nome FROM DEFICIENCIAS ORDER BY def_id", mapper); }
}
