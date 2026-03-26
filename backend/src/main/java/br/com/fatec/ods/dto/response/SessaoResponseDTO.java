package br.com.fatec.ods.dto.response;

public record SessaoResponseDTO(
    ParticipanteResumoDTO participante,
    String sessaoToken
) {}