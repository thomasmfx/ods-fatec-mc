# ODS Mogi das Cruzes

Sistema de votação da 1ª Conferência Nacional ODS — Etapa Livre  
Fatec Mogi das Cruzes · 28/03 e 04/04/2026

---

## Estrutura
```
/
├── frontend/
├── backend/
├── ods_api_contract.yaml   # Contrato OpenAPI 3.0 — fonte da verdade da API
├── pnpm-workspace.yaml
└── package.json
```

---

## Contrato de API

O arquivo `ods_api_contract.yaml` define todos os endpoints, parâmetros e respostas.

Visualização interativa: cole o conteúdo em https://editor.swagger.io

### Endpoints

| Método | Rota | Descrição |
|---|---|---|
| POST | `/sessao/checkin` | Check-in por e-mail |
| POST | `/sessao/cadastro` | Cadastro completo |
| POST | `/sessao/nova` | Encerrar sessão (instrutor) |
| POST | `/votacao` | Registrar votos + enviar certificado |
| GET | `/eixos` | Listar eixos e propostas |
| GET | `/dashboard` | Resultados em tempo real |

---

## Banco de dados local + Documentação da API (Swagger UI local)

O banco MySQL e a documentação do contrato da API rodam via Docker. Na raiz do repo:
```bash
docker-compose up -d     # sobe MySQL em localhost:3306 e Swagger UI em localhost:8080
```

Outra opção para visualizar o contrato da API é colar o conteúdo de `ods_api_contract.yaml` em https://editor.swagger.io

---

## Desenvolvimento

Instalar dependências:
```bash
pnpm install
```

Rodar cada subgrupo separadamente:
```bash
pnpm --filter frontend dev   # só o frontend
pnpm --filter backend dev    # só o backend
```

Rodar os dois juntos (integração):
```bash
pnpm --parallel -r dev
```

---

## Infraestrutura

- **Monorepo:** pnpm workspaces — cada serviço aponta pra sua subpasta
- **Frontend:** *a decidir*
- **Backend:** *a decidir*
- **Banco:** MySQL
- **Deploy:** Vercel (frontend) + Railway (backend)