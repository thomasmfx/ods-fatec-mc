package br.com.fatec.ods.dto.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OpcoesCadastroDTO {
    private List<OpcaoDTO> identidadesGenero;
    private List<OpcaoDTO> orientacoesSexuais;
    private List<OpcaoDTO> racasCores;
    private List<OpcaoDTO> cidades;
    private List<OpcaoDTO> regioes;
    private List<OpcaoDTO> instituicoes;
    private List<OpcaoDTO> areasFormacao;
    private List<OpcaoDTO> publicosFatec;
    private List<OpcaoDTO> cadeiasProdutivas;
    private List<OpcaoDTO> tiposParticipante;
    private List<OpcaoDTO> deficiencias;
}
