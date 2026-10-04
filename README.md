# Full-Stack Netflix Clone

A pixel-perfect, fully responsive Netflix clone web application built with the MERN stack (MongoDB, Express, React, Node.js). Features a complete authentication system and a functional "My Watchlist" CRUD feature.

## Features

*   **Pixel-Perfect Netflix UI:** Accurately recreates the landing, login, signup, and browse pages.
*   **Authentication:** Secure user registration and login using JWT (JSON Web Tokens) stored in HTTP-only cookies, with passwords hashed via `bcryptjs`.
*   **"My Watchlist" CRUD Feature:** Logged-in users can add, view, and remove movies from their personal watchlist.
*   **Dynamic Data:** Uses a rich mock dataset with real TMDB image URLs for trending and action movies.
*   **Responsive Design:** Fully responsive layout built with Tailwind CSS.
*   **State Management:** Utilizes Zustand for efficient and simple global state management (auth and movies).

## Tech Stack

*   **Frontend:** React (Vite), Tailwind CSS, Lucide-react (icons), Zustand (state), React Router, Axios.
*   **Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT, bcryptjs.

## Local Setup Instructions

1.  **Clone the repository** (if applicable):
    ```bash
    git clone <your-repo-url>
    cd Netflix_Copy
    ```

2.  **Setup the Backend:**
    ```bash
    cd server
    npm install
    ```
    *   Ensure MongoDB is running locally on `mongodb://localhost:27017` or update the `MONGO_URI` in `server/.env`.
    *   Start the server:
        ```bash
        npm run dev
        ```
    *   The server will run on `http://localhost:5000`.

3.  **Setup the Frontend:**
    ```bash
    cd ../client
    npm install
    ```
    *   Start the Vite development server:
        ```bash
        npm run dev
        ```
    *   The client will run on `http://localhost:5173`.

## Deployment Steps

### 1. Backend (Render / Railway)
*   Create a new Web Service on Render or Railway.
*   Connect your GitHub repository and select the `server` directory as the root (or configure the build command as `cd server && npm install`).
*   Set the Start Command to `npm start` (or `node server.js`).
*   **Environment Variables:** Add the following environment variables in the Render/Railway dashboard:
    *   `MONGO_URI` = Your MongoDB Atlas connection string (e.g., `mongodb+srv://<user>:<password>@cluster...`).
    *   `JWT_SECRET` = A strong, random secret key.
    *   `NODE_ENV` = `production`
    *   `CLIENT_URL` = The deployed URL of your frontend (e.g., `https://your-netflix-clone.vercel.app`).
*   Deploy the backend.

### 2. Frontend (Vercel / Netlify)
*   Create a new project on Vercel or Netlify.
*   Connect your GitHub repository and select the `client` directory as the Root Directory.
*   The Build Command should be automatically detected as `npm run build` and Output Directory as `dist`.
*   Before deploying, update the `API_URL` in `client/src/store/authStore.js` and `client/src/store/movieStore.js` from `http://localhost:5000/api` to your deployed backend URL (e.g., `https://your-backend-url.onrender.com/api`).
*   Deploy the frontend.
