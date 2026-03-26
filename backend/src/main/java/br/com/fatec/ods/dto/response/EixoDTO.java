package br.com.fatec.ods.dto.response;

import java.util.List;

public record EixoDTO(Integer id, String nome, String descricao, List<PropostaDTO> propostas) {} 
