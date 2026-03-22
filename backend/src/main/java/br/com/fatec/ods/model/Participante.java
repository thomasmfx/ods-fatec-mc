package br.com.fatec.ods.model;

import java.time.LocalDate;

import lombok.Data;

@Data
public class Participante {
    private Integer id;
    private String nome;
    private String mail;
    private String fone;
    private LocalDate dataConferencia;
    private String recsAcessibilidade;
    private String ocupacao;
    private Integer tppId;
    private Integer idgId;
    private Integer orsId;
    private Integer rcrId;
    private Integer cidId;
    private Character autorizacao;
    private Integer regId;
    private Integer itvId;
    private String itvOutro;
    // getters/setters ou use Lombok @Data
}
