package br.com.fatec.ods.service;

import br.com.fatec.ods.dto.request.VotacaoRequestDTO;
import br.com.fatec.ods.dto.request.VotoDTO;
import br.com.fatec.ods.dto.response.VotacaoResponseDTO;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class VotacaoService {

    private final JdbcTemplate jdbcTemplate;
    private final CertificadoService certificadoService;
    private final EmailService emailService;

    public VotacaoService(JdbcTemplate jdbcTemplate, CertificadoService certificadoService, EmailService emailService) {
        this.jdbcTemplate = jdbcTemplate;
        this.certificadoService = certificadoService;
        this.emailService = emailService;
    }

    @Transactional
    public VotacaoResponseDTO registrarVotos(Integer participanteId, VotacaoRequestDTO request) {
        List<VotoDTO> votos = request.votos();

        if (votos == null || votos.size() != 4) {
            throw new IllegalArgumentException("É necessário votar em exatamente 1 proposta por eixo.");
        }
        Set<Integer> eixosVotados = votos.stream().map(VotoDTO::eixoId).collect(Collectors.toSet());
        if (eixosVotados.size() != 4) {
            throw new IllegalArgumentException("Não é permitido votar mais de uma vez no mesmo eixo.");
        }

        Integer qtdVotosExistentes = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM VOTACOES WHERE vot_par_id = ?", Integer.class, participanteId);
        if (qtdVotosExistentes != null && qtdVotosExistentes > 0) {
            throw new IllegalStateException("Este participante já registrou votos nesta conferência.");
        }

        if (request.email() != null && !request.email().isBlank()) {
            jdbcTemplate.update("UPDATE PARTICIPANTES SET par_mail = ? WHERE par_id = ?", request.email(), participanteId);
        }

        LocalDate dataAtual = LocalDate.now();
        for (VotoDTO voto : votos) {
            jdbcTemplate.update(
                    "INSERT INTO VOTACOES (vot_par_id, vot_prp_id, vot_data) VALUES (?, ?, ?)",
                    participanteId, voto.propostaId(), dataAtual
            );
        }

        Map<String, Object> participante = jdbcTemplate.queryForMap(
                "SELECT par_nome, par_mail FROM PARTICIPANTES WHERE par_id = ?", participanteId);
        String nome = (String) participante.get("par_nome");
        String email = (String) participante.get("par_mail");

        String certificadoBase64 = null;
        try {
            byte[] pdf = certificadoService.gerarCertificadoPdf(nome);
            emailService.enviarCertificado(email, nome, pdf);
            certificadoBase64 = Base64.getEncoder().encodeToString(pdf);
        } catch (Exception e) {
            System.err.println("Erro ao gerar/enviar certificado para " + email + ": " + e.getMessage());
            throw new RuntimeException("Erro interno ao processar o certificado.");
        }

        return new VotacaoResponseDTO("Votação concluída. Certificado enviado para " + email + ".", email, certificadoBase64);
    }
}