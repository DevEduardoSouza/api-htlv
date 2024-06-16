# Project README

This project is still under development and aims to provide additional routes in the future.

## How to Use

To use this project, follow these steps:

1. **Install Dependencies**

```bash
npm install
```

2. **Start the Server**

```bash
npm start:dev
```


3. **Access Endpoints**

- Fetch Matches:
  ```
  GET /api/matches
  ```
  Retrieves upcoming match data from HLTV.

- Fetch Results:
  ```
  GET /api/results
  ```
  Retrieves recent match results from HLTV.

## API Documentation

### Fetch Matches Endpoint

Retrieves upcoming match data from HLTV.

#### Endpoint

## GET /api/matches

### Response

Returns an array of match objects with the following structure:

```json
{
  "id": 1234,
  "time": "12:00 PM",
  "event": {
    "name": "Example Event",
    "logo": "https://example.com/event_logo.png"
  },
  "stars": 5,
  "maps": "Map Name",
  "teams": [
    {
      "id": 1,
      "name": "Team A",
      "logo": "https://example.com/teamA_logo.png"
    },
    {
      "id": 2,
      "name": "Team B",
      "logo": "https://example.com/teamB_logo.png"
    }
  ],
  "date": "2024-06-15"
}
```

## GET /api/results

### Response
Returns an array of result objects with the following structure:

```json
{
  "matchId": 5678,
  "date": "2024-06-14",
  "teams": [
    {
      "name": "Team A",
      "logo": "https://example.com/teamA_logo.png",
      "resultScore": 1
    },
    {
      "name": "Team B",
      "logo": "https://example.com/teamB_logo.png",
      "resultScore": 2
    }
  ],
  "event": {
    "name": "Example Event",
    "logo": "https://example.com/event_logo.png"
  },
  "maps": "Map Name",
  "matchLink": "https://example.com/match"
}
```


This README provides a brief overview of the project's current status and how to use it, along with examples of API endpoints for fetching match and result data from HLTV.





