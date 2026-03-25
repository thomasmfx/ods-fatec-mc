package br.com.fatec.ods.controller;

import br.com.fatec.ods.dto.response.EixosResponseDTO;
import br.com.fatec.ods.service.EixoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/eixos")
public class EixoController {

    private final EixoService eixoService;

    public EixoController(EixoService eixoService) {
        this.eixoService = eixoService;
    }

    @GetMapping
    public ResponseEntity<EixosResponseDTO> listar() {
        EixosResponseDTO response = eixoService.listarEixosComPropostas();
        return ResponseEntity.ok(response);
    }
}