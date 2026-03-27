package br.com.fatec.ods.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.fatec.ods.dto.request.PropostaRequestDTO;
import br.com.fatec.ods.exception.RegraNegocioException;
import br.com.fatec.ods.service.PropostaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/propostas")
public class PropostaController {

    private final PropostaService propostaService;
    
    @PostMapping
    public ResponseEntity<?> cadastrar(
        @RequestHeader(value = "X-Admin-Secret", required = false) String adminSecret,
        @RequestBody @Valid PropostaRequestDTO dto
    ) {
        try {
            propostaService.cadastrar(dto, adminSecret);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (RegraNegocioException e) {
            // Retorna 401 Unauthorized se a senha estiver errada
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                 .body("{\"erro\":\"nao_autorizado\",\"mensagem\":\"" + e.getMessage() + "\"}");
        }
    }

    @GetMapping("/auth")
    public ResponseEntity<?> verificarAuth(
        @RequestHeader(value = "X-Admin-Secret", required = false) String adminSecret
    ) {
        try {
            propostaService.validarSecret(adminSecret);
            return ResponseEntity.ok().build(); // Retorna 200 OK se a senha bater
        } catch (RegraNegocioException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 401 se errar
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> excluir(
        @RequestHeader(value = "X-Admin-Secret", required = false) String adminSecret,
        @PathVariable Integer id
    ) {
        try {
            propostaService.excluir(id, adminSecret);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                .body("{\"erro\":\"conflito\",\"mensagem\":\"" + e.getMessage() + "\"}");
        }
    }
}