# ODS Mogi das Cruzes

Sistema de votação da 1ª Conferência Nacional ODS — Etapa Livre  
Fatec Mogi das Cruzes · 28/03 e 04/04/2026

---

## Estrutura
```
/
├── frontend/
├── backend/
├── db/
│   └── init.sql
├── ods_api_contract.yaml
├── docker-compose.yml
└── .env.example
```

---

## Stacks

| Subgrupo | Tecnologias |
|---|---|
| Frontend | React + JavaScript + CSS Modules |
| Backend | Java + Spring Boot + MySQL |

---

## Contrato de API

O arquivo `ods_api_contract.yaml` define todos os endpoints, parâmetros e respostas.  
**Nenhum dos dois subgrupos deve começar a integrar sem ler este arquivo.**

Visualização interativa:
```bash
docker-compose up swagger-ui
# acessa http://localhost:8081
```

Ou cole o conteúdo em https://editor.swagger.io

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

O banco roda localmente via MySQL. Configure as credenciais no `application.properties` do backend.

Para criar o banco e o usuário (primeira vez):
```bash
sudo mysql
```
```sql
CREATE DATABASE IF NOT EXISTS ods;
CREATE USER 'ods_user'@'localhost' IDENTIFIED BY 'sua_senha';
GRANT ALL PRIVILEGES ON ods.* TO 'ods_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

Para criar as tabelas, execute o script de inicialização:
```bash
mysql -u ods_user -p ods < db/init.sql
```

---

## Workflow

- Branch principal de desenvolvimento: `dev` — push direto permitido
- `main` é reservada para produção — **nunca fazer push direto**
- Quando pronto, abrir PR de `dev` → `main` para deploy
```
dev    → desenvolvimento diário
main   → produção (deploy automático no Vercel e Railway)
```

---

## Infraestrutura

- **Frontend:** Vercel — root directory `/frontend`
- **Backend:** Railway — root directory `/backend`
- **Banco:** MySQL — Railway em produção, MySQL local em desenvolvimento
- **Deploy:** automático na `main`