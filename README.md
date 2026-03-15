```markdown
# ODS Mogi das Cruzes

Sistema de votação da 1ª Conferência Nacional ODS — Etapa Livre  
Fatec Mogi das Cruzes · 28/03 e 04/04/2026

---

## Estrutura

```
/
├── frontend/               # Subgrupo frontend
├── backend/                # Subgrupo backend
├── ods_api_contract.yaml   # Contrato OpenAPI 3.0 — fonte da verdade da API
├── pnpm-workspace.yaml
└── package.json
```

---

## Contrato de API

O arquivo `ods_api_contract.yaml` define todos os endpoints, parâmetros e respostas.  
**Nenhum dos dois subgrupos deve começar a integrar sem ler este arquivo.**

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

## Banco de dados local

O banco MySQL roda via Docker. Na raiz do repo:

```bash
cp .env.example .env     # ajustar credenciais se necessário
docker-compose up -d     # sobe MySQL em localhost:3306
docker-compose down      # para o banco
```

---

## Documentação da API (Swagger UI local)

```bash
cd backend/docs
docker-compose up -d     # sobe Swagger UI em http://localhost:8080
```

Ou cole o conteúdo de `ods_api_contract.yaml` em https://editor.swagger.io

---

## Decisões de infraestrutura

- **Deploy:** Vercel (frontend) + Railway (backend)
- **Banco:** MySQL
- **Monorepo:** pnpm workspaces — cada serviço aponta pra sua subpasta

Cada subgrupo é responsável por configurar sua stack internamente.
```