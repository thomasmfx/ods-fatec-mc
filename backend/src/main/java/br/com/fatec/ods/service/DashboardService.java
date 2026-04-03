package br.com.fatec.ods.service;

import br.com.fatec.ods.repository.DashboardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@RequiredArgsConstructor
@Service
public class DashboardService {

    private final DashboardRepository dashboardRepository;

    public Map<String, Object> obterDados(LocalDate data) {
        Integer totalInscritos = dashboardRepository.countInscritos(data);
        Integer totalVotantes = dashboardRepository.countVotantes(data);
        Integer totalVotos = dashboardRepository.countVotos(data); 

        List<Map<String, Object>> rows = dashboardRepository.getVotosPorProposta(data);

        Map<Integer, Map<String, Object>> eixosMap = new LinkedHashMap<>();

        for (Map<String, Object> row : rows) {
            Integer eixoId = ((Number) row.get("eixo_id")).intValue();
            
            // Aqui é a mágica: juntamos o nome e a descrição do banco
            String nomeCompleto = row.get("eixo_nome") + " - " + row.get("eixo_descricao");
            
            eixosMap.putIfAbsent(eixoId, new HashMap<>(Map.of(
                "id", eixoId,
                "num", "EIXO 0" + eixoId,
                "nome", nomeCompleto,
                "propostas", new ArrayList<Map<String, Object>>()
            )));

            Map<String, Object> eixo = eixosMap.get(eixoId);
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> propostas = (List<Map<String, Object>>) eixo.get("propostas");

            Map<String, Object> proposta = new HashMap<>();
            proposta.put("id", row.get("prop_id"));
            proposta.put("titulo", row.get("prop_titulo"));
            proposta.put("votos", ((Number) row.get("qtd_votos")).intValue());
            
            propostas.add(proposta);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("totalInscritos", totalInscritos != null ? totalInscritos : 0);
        response.put("totalVotantes", totalVotantes != null ? totalVotantes : 0);
        response.put("totalVotos", totalVotos != null ? totalVotos : 0);
        response.put("eixos", eixosMap.values());

        return response;
    }
}