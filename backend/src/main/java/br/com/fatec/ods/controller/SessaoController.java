package br.com.fatec.ods.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

import br.com.fatec.ods.dto.request.CadastroRequestDTO;
import br.com.fatec.ods.dto.response.OpcoesCadastroDTO;
import br.com.fatec.ods.service.SessaoService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/sessao")
public class SessaoController {

    private final SessaoService service;

    public SessaoController(SessaoService service) {
        this.service = service;
    }

    @PostMapping("/cadastro")
    public ResponseEntity<Void> cadastrar(@RequestBody @Valid CadastroRequestDTO req) {
        service.cadastrar(req);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/opcoes")
    public ResponseEntity<OpcoesCadastroDTO> opcoes() {
        return ResponseEntity.ok(service.opcoes());
    }
}
