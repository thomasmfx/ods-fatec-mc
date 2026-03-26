package br.com.fatec.ods.controller;

import br.com.fatec.ods.dto.request.VotacaoRequestDTO;
import br.com.fatec.ods.dto.response.VotacaoResponseDTO;
import br.com.fatec.ods.service.VotacaoService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/votacao")
public class VotacaoController {

    private final VotacaoService votacaoService;

    public VotacaoController(VotacaoService votacaoService) {
        this.votacaoService = votacaoService;
    }

    @PostMapping
    public ResponseEntity<?> registrarVotos(@RequestBody VotacaoRequestDTO request, HttpServletRequest httpReq) {
        try {
            // Pega o ID injetado pelo JwtAuthFilter
            Integer participanteId = (Integer) httpReq.getAttribute("participanteId");
            
            if (participanteId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("erro", "nao_autorizado", "mensagem", "Token inválido ou ausente."));
            }

            VotacaoResponseDTO response = votacaoService.registrarVotos(participanteId, request);
            return ResponseEntity.ok(response);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("erro", "votos_invalidos", "mensagem", e.getMessage()));
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("erro", "voto_duplicado", "mensagem", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("erro", "erro_interno", "mensagem", "Falha ao processar a votação."));
        }
    }
}