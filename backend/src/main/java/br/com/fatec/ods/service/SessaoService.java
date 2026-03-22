package br.com.fatec.ods.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.fatec.ods.dto.request.CadastroRequestDTO;
import br.com.fatec.ods.dto.response.OpcoesCadastroDTO;
import br.com.fatec.ods.exception.EmailJaCadastradoException;
import br.com.fatec.ods.repository.OpcoesRepository;
import br.com.fatec.ods.repository.ParticipanteRepository;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class SessaoService {

    private final ParticipanteRepository participanteRepo;
    private final OpcoesRepository opcoesRepo;

    @Transactional
    public void cadastrar(CadastroRequestDTO req) {
        if (participanteRepo.existsByMail(req.getEmail())) {
            throw new EmailJaCadastradoException(req.getEmail());
        }
        int parId = participanteRepo.inserir(req);
        participanteRepo.inserirEixos(parId, req.getEixosInteresseIds());
        participanteRepo.inserirAreas(parId, req.getAreasFormacaoIds());
        participanteRepo.inserirPublicos(parId, req.getPublicosFatecIds());
        if (req.getCadeiasProdutivosIds() != null) participanteRepo.inserirCadeias(parId, req.getCadeiasProdutivosIds());
        if (req.getDeficienciasIds() != null) participanteRepo.inserirDeficiencias(parId, req.getDeficienciasIds());
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
