export function maskPhone(value) {
    return value
        .replaceAll(/\D/g, '')
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d{1,4})/, '$1-$2')
        .slice(0, 15)
}

export function optionCardClass(isSelected) {
    return `option-card ${isSelected ? "sel" : ""}`
}

export function isFormularioValido(form) {
    return (
        form.nome &&
        form.email &&
        form.telefone &&
        form.dataConferencia &&
        form.identidadeGeneroId &&
        form.orientacaoSexualId &&
        form.racaCorId &&
        form.cidadeId &&
        form.regiaoId &&
        form.instituicaoId &&
        form.ocupacao &&
        form.tipoParticipanteId &&
        form.areasFormacaoIds.length > 0 &&
        form.eixosInteresseIds.length > 0 &&
        form.autorizacaoImagem &&
        form.possuiDeficiencia !== null
    )
}

export function toggleList(list, id) {
    return list.includes(id) ? list.filter((i) => i !== id) : [...list, id]
}

// Hardcoded temporariamente
export const eixos = {
      "eixos": [
        {
          "id": 1,
          "nome": "Eixo 1",
          "descricao": "Democracia e instituições fortes",
          "propostas": [
            {
              "id": 1,
              "titulo": "Fortalecimento das instituições democráticas",
              "descricao": "Criação de mecanismos de transparência e controle social nas instituições públicas municipais."
            },
            {
              "id": 2,
              "titulo": "Participação cidadã nos processos decisórios",
              "descricao": "Implementação de plataformas digitais para consulta pública e engajamento da sociedade."
            }
          ]
        },
        {
          "id": 2,
          "nome": "Eixo 2",
          "descricao": "Sustentabilidade ambiental",
          "propostas": [
            {
              "id": 3,
              "titulo": "Redução de resíduos sólidos urbanos",
              "descricao": "Programa de compostagem e coleta seletiva em bairros da cidade com metas anuais."
            },
            {
              "id": 4,
              "titulo": "Arborização urbana e corredores verdes",
              "descricao": "Plantio de espécies nativas em vias públicas e criação de corredores ecológicos urbanos."
            }
          ]
        },
        {
          "id": 3,
          "nome": "Eixo 4",
          "descricao": "Inovação tecnológica para o desenvolvimento sustentável",
          "propostas": [
            {
              "id": 7,
              "titulo": "Incentivo à inovação em startups locais",
              "descricao": "Criação de hub de inovação com suporte técnico e financeiro para empreendedores locais."
            },
            {
              "id": 8,
              "titulo": "Capacitação digital para trabalhadores",
              "descricao": "Programa de letramento digital para trabalhadores de setores tradicionais em transição."
            }
          ]
        },
        {
          "id": 4,
          "nome": "Eixo 5",
          "descricao": "Governança participativa",
          "propostas": [
            {
              "id": 9,
              "titulo": "Orçamento participativo digital",
              "descricao": "Plataforma de votação online para alocação de parte do orçamento municipal pelos cidadãos."
            },
            {
              "id": 10,
              "titulo": "Conselhos municipais fortalecidos",
              "descricao": "Revisão das estruturas dos conselhos municipais para maior representatividade deliberativa."
            }
          ]
        }
      ]
    }