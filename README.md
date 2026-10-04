# Full-Stack Netflix Clone

🎬 **Live Demo:** [https://netflix-clone-cyan-seven-20.vercel.app/](https://netflix-clone-cyan-seven-20.vercel.app/)

A pixel-perfect, fully responsive Netflix clone web application built with the MERN stack (MongoDB, Express, React, Node.js). Features a complete authentication system and a functional "My Watchlist" CRUD feature.

## Features

*   **Pixel-Perfect Netflix UI:** Accurately recreates the landing, login, signup, and browse pages.
*   **Authentication:** Secure user registration and login using JWT (JSON Web Tokens) stored in HTTP-only cross-site cookies, with passwords hashed via `bcryptjs`.
*   **"My Watchlist" CRUD Feature:** Logged-in users can add, view, and remove movies from their personal watchlist.
*   **Dynamic Data:** Uses a rich mock dataset with real TMDB image URLs for trending and action movies.
*   **Responsive Design:** Fully responsive layout built with Tailwind CSS.
*   **State Management:** Utilizes Zustand for efficient and simple global state management (auth and movies).

## Tech Stack

*   **Frontend:** React (Vite), Tailwind CSS, Lucide-react (icons), Zustand (state), React Router, Axios.
*   **Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT, bcryptjs.
