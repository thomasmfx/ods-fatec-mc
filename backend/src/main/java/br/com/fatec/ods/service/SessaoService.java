package br.com.fatec.ods.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.fatec.ods.dto.request.CadastroRequestDTO;
import br.com.fatec.ods.exception.EmailJaCadastradoException;
import br.com.fatec.ods.repository.ParticipanteRepository;

@Service
public class SessaoService {

    private final ParticipanteRepository repo;

    public SessaoService(ParticipanteRepository repo) {
        this.repo = repo;
    }

    @Transactional
    public void cadastrar(CadastroRequestDTO req) {
        if (repo.existsByMail(req.getEmail())) {
            throw new EmailJaCadastradoException(req.getEmail());
        }
        int parId = repo.inserir(req);
        repo.inserirEixos(parId, req.getEixosInteresseIds());
        repo.inserirAreas(parId, req.getAreasFormacaoIds());
        repo.inserirPublicos(parId, req.getPublicosFatecIds());
        if (req.getCadeiasProdutivosIds() != null) repo.inserirCadeias(parId, req.getCadeiasProdutivosIds());
        if (req.getDeficienciasIds() != null) repo.inserirDeficiencias(parId, req.getDeficienciasIds());
    }
}
