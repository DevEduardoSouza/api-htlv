# Projeto de Scraping

## Descrição
Este projeto é um scraper de dados desenvolvido com TypeScript, Node.js, Express e JSDOM. O objetivo do projeto é coletar informações de partidas esportivas de um site específico e retornar esses dados em um formato estruturado.

# LiveBetBot API Documentation 


1. **Clone the repository:**

```bash
git clone https://github.com/DevEduardoSouza/LiveBetBot.git
```

2. **Navigate to the backend directory:**

```bash
cd LiveBetBot
```


3. **Install dependencies:**

```bash
  npm install
````

4. **Start the server:**

```bash
  npm run start:dev
````

## Endpoints

### 1. Get Odds aovivo

- **URL**: `/api/odds`
- **Method**: `GET`
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**: 
    ```json
       {
  		"competitionName": "Alemanha - Landesliga",
  		"timeMatch": "26:44",
  		"teams": {
  			"home": {
  				"name": "ATS Buntentor",
  				"score": "1",
  				"odds": "2.10"
  			},
  			"away": {
  				"name": "1. FC Burg",
  				"score": "1",
  				"odds": "2.75"
  			},
  			"drawOdds": "4.00"
  		}
  	}
    ```
- **Error Response**:
  - **Code**: `400 Bad Request`
  - **Content**: 
    ```json
    {
      "error": "error"
    }
    ```

## How to Use


GET http://localhost:3000/api/odds


