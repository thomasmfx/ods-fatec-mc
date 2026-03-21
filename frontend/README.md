# Frontend — ODS Mogi das Cruzes

React + JavaScript + CSS Modules

---

## Setup
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Acessa http://localhost:5173

---

## Estrutura
```
src/
├── components/       # componentes reutilizáveis
├── pages/            # uma pasta por tela
│   ├── Login/
│   ├── Cadastro/
│   ├── Votacao/
│   ├── Confirmacao/
│   └── Dashboard/
├── services/
│   └── api.js        # instância Axios com baseURL configurada
├── App.jsx           # rotas
├── index.css         # reset + variáveis globais
└── main.jsx
```

---

## Variáveis de ambiente

| Variável | Descrição |
|---|---|
| `VITE_API_URL` | URL base do backend |

---

## Chamadas à API
```javascript
import api from '../services/api'

const response = await api.post('/sessao/checkin', { email })
```

Consulte `ods_api_contract.yaml` na raiz para ver todos os endpoints disponíveis.

---

## Referência visual

O protótipo completo está em `frontend/public/ods.html` — abre direto no browser.