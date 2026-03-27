package br.com.fatec.ods.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record PropostaRequestDTO(
    @NotNull Integer eixoId,
    @NotBlank String titulo,
    @NotBlank String descricao,
    String autor,
    String autorEmail
) {}