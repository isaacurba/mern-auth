# MERN Auth (Products)

A full-stack MERN project with a Node/Express API, MongoDB (Mongoose), and a Vite + React frontend. The frontend and backend are configured to run together in production at `http://localhost:5000`.

## Features
- Create, read, update, delete products
- MongoDB persistence via Mongoose
- React UI with Zustand state management
- Vite dev server with API proxy
- Production build served by Express

## Tech Stack
- Backend: Node.js, Express, Mongoose, dotenv
- Frontend: React, Vite, Zustand, Tailwind CSS
- DB: MongoDB Atlas (or local MongoDB)

## Project Structure
- `backend/src/server.js` Express server entry
- `backend/src/config/db.js` MongoDB connection
- `backend/src/controller/productController.js` CRUD controllers
- `backend/src/productRoute/product.route.js` API routes
- `frontend/` React app (Vite)

## Prerequisites
- Node.js 18+ (works with Node 22)
- MongoDB connection string

## Environment Variables
Create `backend/.env` with:

```env
MONGODB_ATLAS_URI="your-mongodb-connection-string"
PORT="5000"
```

> The backend reads `backend/.env` directly.

## Install
From the project root:

```bash
npm install
npm install --prefix frontend
```

## Development
Run backend (from project root):

```bash
npm run dev
```

Run frontend (new terminal):

```bash
npm run dev --prefix frontend
```

Vite will run at `http://localhost:5173` and proxy `/api` requests to `http://localhost:5000`.

## Production (single server)
Build the frontend, then start the backend:

```bash
npm run build
npm run start
```

This serves the React app and API from `http://localhost:5000`.

## API Endpoints
Base path: `/api/products`

- `GET /api/products` — list all products
- `POST /api/products` — create product
- `PUT /api/products/:id` — update product
- `DELETE /api/products/:id` — delete product

### Product Schema

```json
{
  "name": "string",
  "price": 100,
  "image": "https://..."
}
```

## Common Issues
- **MongoDB URI undefined**: Ensure `MONGODB_ATLAS_URI` is set in `backend/.env`.
- **Frontend can’t reach API**: Make sure backend is running on port 5000 before starting Vite.

## License
ISC
