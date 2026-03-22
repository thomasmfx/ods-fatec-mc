package br.com.fatec.ods.dto.request;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class CadastroRequestDTO {
    private String nome;
    private String email;
    private String telefone;
    private LocalDate dataConferencia;
    private String recursoAcessibilidade;
    private String ocupacao;
    private Integer tipoParticipanteId;
    private Integer identidadeGeneroId;
    private Integer orientacaoSexualId;
    private Integer racaCorId;
    private Integer cidadeId;
    private String cidadeOutro;
    private Boolean autorizacaoImagem;
    private Integer regiaoId;
    private Integer instituicaoId;
    private String instituicaoOutro;

    private List<Integer> areasFormacaoIds;
    private List<Integer> publicosFatecIds;
    private List<Integer> eixosInteresseIds;
    private List<Integer> cadeiasProdutivosIds;
    private List<Integer> deficienciasIds;
}
