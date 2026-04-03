package br.com.fatec.ods.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.fatec.ods.dto.request.CadastroRequestDTO;
import br.com.fatec.ods.dto.request.CheckinRequestDTO;
import br.com.fatec.ods.dto.response.OpcoesCadastroDTO;
import br.com.fatec.ods.dto.response.ParticipanteResumoDTO;
import br.com.fatec.ods.dto.response.SessaoResponseDTO;
import br.com.fatec.ods.exception.EmailJaCadastradoException;
import br.com.fatec.ods.exception.ParticipanteNaoEncontradoException;
import br.com.fatec.ods.exception.RegraNegocioException;
import br.com.fatec.ods.repository.OpcoesRepository;
import br.com.fatec.ods.repository.ParticipanteRepository;
import br.com.fatec.ods.security.JwtService;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class SessaoService {

    private final ParticipanteRepository participanteRepo;
    private final OpcoesRepository opcoesRepo;
    private final JwtService jwtService;
    
    @Value("${evento.ativo:true}")
    private Boolean eventoAtivo;

    public SessaoResponseDTO checkin(CheckinRequestDTO dto) {
        if (Boolean.FALSE.equals(eventoAtivo)) {
            throw new RegraNegocioException("As credenciais estão suspensas. O evento já foi encerrado!");
        }

        ParticipanteResumoDTO participante = participanteRepo
            .buscarResumoPorEmail(dto.email())
            .orElseThrow(ParticipanteNaoEncontradoException::new);

        if (participanteRepo.verificarSeJaVotou(participante.id())) {
            throw new RegraNegocioException("Este participante já registrou votos nesta conferência.");
        }

        String token = jwtService.gerarToken(participante.id(), participante.email());
        return new SessaoResponseDTO(participante, token);
    }

    @Transactional
    public SessaoResponseDTO cadastrar(CadastroRequestDTO req) {
        if (Boolean.FALSE.equals(eventoAtivo)) {
            throw new RegraNegocioException("As credenciais estão suspensas. O evento já foi encerrado!");
        }
        if (participanteRepo.existsByMail(req.getEmail())) {
            throw new EmailJaCadastradoException(req.getEmail());
        }
        
        int parId = participanteRepo.inserir(req);
        participanteRepo.inserirEixos(parId, req.getEixosInteresseIds());
        participanteRepo.inserirAreas(parId, req.getAreasFormacaoIds());
        participanteRepo.inserirPublicos(parId, req.getPublicosFatecIds());
        if (req.getCadeiasProdutivosIds() != null) participanteRepo.inserirCadeias(parId, req.getCadeiasProdutivosIds());
        if (req.getDeficienciasIds() != null) participanteRepo.inserirDeficiencias(parId, req.getDeficienciasIds());

        ParticipanteResumoDTO resumo = participanteRepo
            .buscarResumoPorEmail(req.getEmail())
            .orElseThrow();

        String token = jwtService.gerarToken(resumo.id(), resumo.email());
        return new SessaoResponseDTO(resumo, token);
    }

    public OpcoesCadastroDTO opcoes() {
        return new OpcoesCadastroDTO(
            opcoesRepo.identidadesGenero(),
            opcoesRepo.orientacoesSexuais(),
            opcoesRepo.racasCores(),
            opcoesRepo.cidades(),
            opcoesRepo.regioes(),
            opcoesRepo.instituicoes(),
            opcoesRepo.areasFormacao(),
            opcoesRepo.publicosFatec(),
            opcoesRepo.cadeiasProdutivas(),
            opcoesRepo.tiposParticipante(),
            opcoesRepo.deficiencias()
        );
    }
}