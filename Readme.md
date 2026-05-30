# GitHub User Analyzer

A web app to analyze GitHub user profiles — fetch repos, view language charts, save analysis to a MySQL database, and browse stored results.

---

## Features

- Search any GitHub user by username
- View followers, public repos, and login info
- Fetch all repositories with stars, forks, and language
- Interactive pie chart for language breakdown per repo
- Save analysis data to a MySQL database
- Browse all saved analyses

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite |
| Routing | React Router DOM |
| Charts | Chart.js |
| Backend | Node.js / Express |
| Database | MySQL |
| Deployment | Vercel (frontend) |

---

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or above)
- [MySQL](https://www.mysql.com/) (v8 or above)
- npm or yarn

---

## Project Structure

```
/
├── front/         # React + Vite app
│   ├── src/
│   │   ├── Home.jsx
│   │   └── ...
│   └── .env
├── back/          # Express server
│   ├── server.js
│   └── .env
└── README.md
```


---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/vansh1011/GitHub_Analyzer.git
cd GitHub_Analyzer 
```

---

### 2. Database Setup (MySQL)

1. Open your MySQL client and create a database:

```sql
CREATE DATABASE test;
```

2. Create the analysis table:

```sql
USE test;

CREATE TABLE profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    followers INT,
    following INT,
    public_repos INT,
    total_stars INT,
    total_forks INT,
    top_language VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### 3. Backend Setup

```bash
cd back
npm install
```

Create a `.env` file inside the `back/` folder:

```env
HOST=mysql_host
USER=mysql_username
PASSWORD=mysql_password
DB = your database
PORT=8000
PORT2 = 4000
FRONTURL = frontend_url
```

Start the backend server:

```bash
node --watch server.js
```

The server will run at `http://localhost:8000`

---

### 4. Frontend Setup

```bash
cd front
npm install
```

Create a `.env` file inside the `front/` folder:

```env
VITE_SERVER=http://localhost:8000
```



Start the frontend dev server:

```bash
npm run dev
```

The app will run at `http://localhost:5173`

---

## Deployment

### Frontend (Vercel)

1. Push your frontend folder to GitHub
2. Import the repo on [Vercel](https://vercel.com)
3. Set the environment variable in Vercel dashboard:
   - `VITE_SERVER` → your backend's live URL
4. Deploy

### Backend

You can deploy the backend on any Node.js hosting platform such as:
- [Render](https://render.com)
- [Railway](https://railway.app)
- [Cyclic](https://cyclic.sh)

Make sure to set the same environment variables (`HOST`, `USER`, etc.) on the platform.

---

## Environment Variables Summary

### Frontend (`front/.env`)

| Variable | Description |
|----------|-------------|
| `VITE_SERVER` | Base URL of your backend server |

### Backend (`back/.env`)

| Variable | Description |
|----------|-------------|
| `HOST` | MySQL host (e.g. `localhost`) |
| `USER` | MySQL username |
| `PASSWORD` | MySQL password |
| `DB` | MySQL database name |
| `PORT` | Port for the backend server |

---

> [POSTMAN_COLLECTION](https://documenter.getpostman.com/view/40998849/2sBXwntCRs)

---

## Usage

1. Enter a GitHub username in the search box and click **Find**
2. Click **Get All Repos** to load the user's repositories
3. Click **View Chart** on any repo to see a language breakdown pie chart
4. Click **Save Analysis** to store the user's stats in the database
5. Click **Find Analysis** or **Find All** to browse saved data

---

