# Bit Brainic — Frontend

React frontend for **Bit Brainic**, an AI computer-science tutor chat app. This repository contains only the client; it talks to a separate Express/MongoDB backend over a REST API.

## Features

- Public marketing pages: Home, Features, About, Contact, FAQ, Careers, Terms, Privacy
- Authentication: sign up, sign in, forgot password and reset password (token link)
- Interest selection after sign-up
- Chat dashboard: chat list sidebar, create / rename / delete chats, send messages, typing indicator, quick replies, and syntax-highlighted code blocks in responses
- Profile page: update profile, change password, set a tutor persona, update interests, delete account
- Admin panel (password-protected via the backend) with usage statistics charts and user management
- Light / dark theme toggle
- JWT stored in `localStorage` and sent as a `Bearer` token; a 401 response logs the user out

## Tech stack

- React 19 + Vite 7
- React Router 7
- Tailwind CSS 4 (`@tailwindcss/vite`)
- Axios and TanStack React Query
- Framer Motion, Lucide icons
- Recharts (admin statistics)
- react-syntax-highlighter (code blocks)
- ESLint
- Deployed on Vercel (`client/vercel.json` rewrites all routes to `index.html` for client-side routing)

## Project structure

```
client/
├── public/             # static images
├── src/
│   ├── api/            # axios instance + auth/chat/admin API calls
│   ├── components/     # chat, layout, ui and common (ProtectedRoute) components
│   ├── context/        # AuthContext, ThemeContext
│   ├── pages/          # public, auth, dashboard and admin pages
│   ├── App.jsx         # routes
│   └── main.jsx
├── index.html
├── vite.config.js
└── vercel.json
```

## Getting started

Requires Node.js and npm.

```bash
cd client
npm install
npm run dev       # start the Vite dev server
npm run build     # production build to client/dist
npm run preview   # preview the production build
npm run lint      # run ESLint
```

## Backend URL

The API base URL is currently hard-coded in `client/src/api/axios.js` to the deployed backend on Render. To point the app at a local backend, change `baseURL` there. (`vite.config.js` also defines a dev proxy from `/api` to `http://localhost:5000`, but the axios client does not use it as-is.)

No environment variables are read by the client.
