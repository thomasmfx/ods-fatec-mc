# Backend — ODS Mogi das Cruzes

Java 21 + Spring Boot 4 + MySQL

---

## Setup

**Pré-requisitos:** Java 21
```bash
cd backend
cp src/main/resources/application-local.properties.example src/main/resources/application-local.properties
# editar application-local.properties com as credenciais do banco
./mvnw spring-boot:run -Dspring-boot.run.profiles=local
```

Acessa http://localhost:8080  
Swagger UI: http://localhost:8080/swagger-ui.html

---

## Variáveis de ambiente (application-local.properties)

| Propriedade | Descrição |
|---|---|
| `spring.datasource.url` | URL do banco MySQL |
| `spring.datasource.username` | Usuário do banco |
| `spring.datasource.password` | Senha do banco |
| `spring.datasource.driver-class-name` | Driver MySQL |
| `jwt.secret` | Chave secreta para geração de tokens JWT |

---

## Estrutura de pacotes
```
src/main/java/br/com/fatec/ods/
├── config/        # configurações (CORS, etc.)
├── controller/    # endpoints REST
├── service/       # regras de negócio
├── repository/    # queries SQL (JdbcTemplate)
└── model/         # classes de domínio
```

---

## Contrato de API

Consulte `ods_api_contract.yaml` na raiz do repositório.  
Com o servidor rodando, acesse http://localhost:8080/swagger-ui.html