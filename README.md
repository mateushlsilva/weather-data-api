# Weather Data API

API para consulta do clima com cache em Redis, banco de dados PostgreSQL e integração com APIs externas.

---

## 📦 Tecnologias Utilizadas

* **Node.js** + **TypeScript** – Linguagem do servidor
* **Express.js** – Framework web
* **TypeORM** – ORM para PostgreSQL
* **PostgreSQL** – Banco de dados relacional 
* **Redis** – Cache para otimização de consultas
* **dotenv** – Gerenciamento de variáveis de ambiente
* **Swagger** – Documentação das rotas
* **Docker & Docker Compose** – Containerização da aplicação

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

| Variável            | Descrição                      | Exemplo                            |
| ------------------- | ------------------------------ | ---------------------------------- |
| `PORT`              | Porta que o servidor irá rodar | `3001`                             |
| `DATABASE_HOST`     | Host do banco PostgreSQL       | `seuhost`                        |
| `DATABASE_PORT`     | Porta do banco PostgreSQL      | `5432`                             |
| `DATABASE_USER`     | Usuário do banco               | `seuusuario`                         |
| `DATABASE_PASSWORD` | Senha do banco                 | `suasenha`                         |
| `DATABASE_NAME`     | Nome do banco                  | `seubanco`                        |
| `REDIS_HOST`        | Host do Redis                  | `seuhost`                        |
| `REDIS_PORT`        | Porta do Redis                 | `6379`                |                         |
| `API`  | URL da API externa     | `https://api.weatherapi.com/v1/current.json` |
| `API_KEY`  | KEY da API externa     | `suaKEY` |


---

## 🚀 Rodando o Projeto

### 1. Com Docker

```bash
make setup
```

Isso irá subir:

* Banco de dados PostgreSQL
* Redis
* API Node.js

## 🗂 Estrutura de Pastas

```
src/
├─ config/           # Configurações do banco e Redis
├─ controllers/      # Controllers das rotas
├─ docs/              # Documentção com Swagger
├─ entities/         # Entidades TypeORM
├─ services/         # Lógica de negócio
├─ migrations/       # Migrations do TypeORM
├─ routes/           # Definição de rotas
├─ types/            # Tipagens TypeScript
├─ external/         # Integração com APIs externas
├─ interfaces/       # Interfaces do projeto
├─ utils/        
```

---

## 📚 Rotas e Documentação



## Base URL

```
http://localhost:3001
```

---

## Endpoints

---

### GET `/climate/find/:city`

Busca o **clima atual de uma cidade**.

Fluxo da requisição:

* Primeiro consulta o **Redis (cache)**.
* Se não encontrar no cache:

  * Consulta a **API externa de clima**.
  * Salva a cidade (caso não exista).
  * Salva o clima no **banco de dados (Postgres)**.
  * Salva o resultado no **Redis**.
* Retorna o clima atual da cidade.

---

#### Path Params

| Parâmetro | Tipo   | Descrição                       | Exemplo |
| --------- | ------ | ------------------------------- | ------- |
| city      | string | Nome da cidade a ser consultada | London  |

---

#### Resposta de sucesso

```json
{
  "temp_c": 18.5,
  "feelslike_c": 17.2,
  "humidity": 72,
  "cloud": 40,
  "wind_kph": 13.0,
  "wind_degree": 220,
  "pressure_mb": 1012,
  "precip_mm": 0.0,
  "uv": 4,
  "last_updated": "2024-10-01 09:00",
  "condition_text": "Partly cloudy",
  "condition_code": 1003,
  "city": {
    "name": "London",
    "country": "United Kingdom"
  }
}
```

---

#### Status Codes

* **200 OK** – Clima encontrado.
* **500 Internal Server Error** – Erro interno.

---

#### Cache Redis

* **Key:** `city:<city>`
* **TTL:** 10 minutos

---

### GET `/climate/history/:city`

Busca o **histórico de registros de clima** de uma cidade, com paginação.

Fluxo da requisição:

* Consulta o **banco de dados (Postgres)**.
* Retorna os registros ordenados do mais recente para o mais antigo.
* Suporta **paginação** via query params.

---

#### Path Params

| Parâmetro | Tipo   | Descrição      | Exemplo |
| --------- | ------ | -------------- | ------- |
| city      | string | Nome da cidade | London  |

---

#### Query Params

| Parâmetro | Tipo   | Descrição                          | Default |
| --------- | ------ | ---------------------------------- | ------- |
| page      | number | Número da página                   | 1       |
| limit     | number | Quantidade de registros por página | 10      |

---

#### Resposta de sucesso

```json
{
  "climate": [
    {
      "temp_c": 18.5,
      "feelslike_c": 17.2,
      "humidity": 72,
      "cloud": 40,
      "wind_kph": 13.0,
      "pressure_mb": 1012,
      "last_updated": "2024-10-01 09:00",
      "condition_text": "Partly cloudy"
    }
  ],
  "total": 25,
  "page": 1,
  "limit": 10
}
```

---

#### Status Codes

* **200 OK** – Histórico encontrado.
* **500 Internal Server Error** – Erro interno.

---

## Documentação Swagger

A documentação interativa da API está disponível em:

```
http://localhost:3001/docs
```


---
## 🧑‍💻 Autor
### Mateus Silva