package br.com.fatec.ods.service;

import br.com.fatec.ods.dto.response.EixosResponseDTO;
import br.com.fatec.ods.repository.EixoRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class EixoService {

    private final EixoRepository eixoRepository;

    @Value("${evento.data.atual}")
    private String dataAtualEvento;

    public EixoService(EixoRepository eixoRepository) {
        this.eixoRepository = eixoRepository;
    }

    public EixosResponseDTO listarEixosComPropostas() {
        return new EixosResponseDTO(eixoRepository.buscarEixosComPropostas(dataAtualEvento));
    }
}