package br.com.fatec.ods.dto.response;

public record ParticipanteResumoDTO(
    Integer id,
    String nome,
    String email,
    String tipoParticipante
) {}