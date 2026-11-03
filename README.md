# WTWR — What to Wear?

WTWR is a full-stack weather-aware clothing app. The React frontend displays current weather and clothing recommendations, while the Express backend provides user accounts and a shared clothing-item API.

## Backend GitHub Repository

The backend source code is available in the public [WTWR backend GitHub repository](https://github.com/ivdah/se_project_express). Use this repository to review and run the Express and MongoDB API.

## Project structure

- [`se_project_react/`](./se_project_react/) — React 18 and Vite frontend.
- [`se_project_express-main/se_project_express-main/`](./se_project_express-main/se_project_express-main/) — Express and MongoDB backend.

## Features

- Displays current weather and recommends clothing for hot, warm, or cold conditions.
- Supports account registration, sign-in, and sign-out.
- Lets signed-in users add clothing items, like items, and delete their own items.
- Includes a profile page for updating the user's name and avatar.
- Uses JWT bearer tokens to protect user and clothing-item operations.

## Requirements

- Node.js and npm
- MongoDB running locally
- An OpenWeather API key for live weather data

## Run locally

### 1. Start MongoDB

The backend connects to `mongodb://127.0.0.1:27017/wtwr_db`.

### 2. Start the backend

In a terminal:

```bash
cd se_project_express-main/se_project_express-main
npm install
npm run dev
```

The API listens on `http://localhost:3001` by default. You can set `PORT` to use another port. Set a private `JWT_SECRET` in the environment before running the backend; the source includes a development fallback that should not be used in production.

PowerShell example:

```powershell
$env:JWT_SECRET = "replace-with-a-private-secret"
npm run dev
```

### 3. Configure and start the frontend

Set your OpenWeather API key in `se_project_react/src/utils/constants.js`. The frontend API base URL is currently `http://localhost:3001`.

In a separate terminal:

```bash
cd se_project_react
npm install
npm run dev
```

Open the local URL printed by Vite.

## API overview

Protected routes require an `Authorization: Bearer <token>` header.

| Method | Route | Description |
| --- | --- | --- |
| `POST` | `/signup` | Create an account. |
| `POST` | `/signin` | Sign in and receive a JWT. |
| `GET` | `/users/me` | Get the signed-in user's profile. |
| `PATCH` | `/users/me` | Update the signed-in user's name and/or avatar. |
| `GET` | `/items` | List clothing items. |
| `POST` | `/items` | Add a clothing item. |
| `DELETE` | `/items/:itemId` | Delete an item owned by the signed-in user. |
| `PUT` | `/items/:itemId/likes` | Like an item. |
| `DELETE` | `/items/:itemId/likes` | Remove a like. |

Item `weather` values are `hot`, `warm`, or `cold`.

## Useful commands

Run these commands from the corresponding project directory:

| Project | Command | Purpose |
| --- | --- | --- |
| Frontend | `npm run dev` | Start the Vite development server. |
| Frontend | `npm run build` | Create a production build in `dist/`. |
| Frontend | `npm run lint` | Run ESLint. |
| Backend | `npm run dev` | Start the API with Nodemon. |
| Backend | `npm start` | Start the API. |
| Backend | `npm run lint` | Run ESLint. |