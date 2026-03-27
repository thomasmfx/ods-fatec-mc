package br.com.fatec.ods.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import br.com.fatec.ods.dto.request.PropostaRequestDTO;
import br.com.fatec.ods.exception.RegraNegocioException;
import br.com.fatec.ods.repository.PropostaRepository;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class PropostaService {

    private final PropostaRepository propostaRepo;
    
    @Value("${admin.secret:senha_padrao_local}") // Fallback para rodar localmente sem travar
    private String adminSecret;
    

    public void validarSecret(String secretRecebido) {
        if (secretRecebido == null || !secretRecebido.equals(adminSecret)) {
            throw new RegraNegocioException("Não autorizado. Credencial de admin inválida.");
        }
    }

    public void cadastrar(PropostaRequestDTO dto, String secretRecebido) {
        validarSecret(secretRecebido);
        propostaRepo.inserir(dto);
    }

    public void excluir(Integer id, String secretRecebido) {
        validarSecret(secretRecebido);
        propostaRepo.deletar(id);
    }
}