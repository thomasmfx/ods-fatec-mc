package br.com.fatec.ods.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

import br.com.fatec.ods.dto.request.CadastroRequestDTO;
import br.com.fatec.ods.dto.request.CheckinRequestDTO;
import br.com.fatec.ods.dto.response.OpcoesCadastroDTO;
import br.com.fatec.ods.dto.response.SessaoResponseDTO;
import br.com.fatec.ods.service.SessaoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/sessao")
public class SessaoController {

    private final SessaoService sessaoService;

    @PostMapping("/checkin")
    public ResponseEntity<SessaoResponseDTO> checkin(@RequestBody CheckinRequestDTO dto) {
        return ResponseEntity.ok(sessaoService.checkin(dto));
    }

    @PostMapping("/cadastro")
    public ResponseEntity<SessaoResponseDTO> cadastrar(@RequestBody @Valid CadastroRequestDTO req) {
        return ResponseEntity.ok(sessaoService.cadastrar(req));
    }

    @GetMapping("/opcoes")
    public ResponseEntity<OpcoesCadastroDTO> opcoes() {
        return ResponseEntity.ok(sessaoService.opcoes());
    }
}
