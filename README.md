# Blogging Platform

A modern blogging platform similar to Medium, built with cutting-edge technologies for both backend and frontend.

## Features

- **Backend**:
  - Built with [TypeScript](https://www.typescriptlang.org/) and [Hono](https://hono.dev/)
  - Deployed on [Cloudflare Workers](https://workers.cloudflare.com/)
  - Database using [PostgreSQL](https://www.postgresql.org/)
  - ORM with [Prisma](https://www.prisma.io/) and [Prisma Accelerate](https://www.prisma.io/docs/guides/performance-and-optimization/prisma-accelerate)
- **Frontend**:
  - Built with [React](https://react.dev/) and TypeScript
  - Bundled with [Vite](https://vitejs.dev/)
- **Deployment**:
  - Backend: Cloudflare Workers
  - Frontend: Vercel

## Installation and Setup

### Prerequisites

- Node.js (>=16.x)
- PostgreSQL database
- Cloudflare Workers account
- Prisma CLI installed globally

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/himanshuhr8/medium_clone.git
   cd medium_clone/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure your environment variables:
   Create a `.env` file in the `backend` directory with the following:
   ```env
   DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/<database>"
   ```

4. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

5. Deploy Prisma schema:
   ```bash
   npx prisma migrate deploy
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

7. Deploy to Cloudflare Workers:
   ```bash
   npm run deploy
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Deploy the frontend:
   Upload the `dist` folder to your hosting provider.

## Project Structure

```plaintext
root/
├── backend/       # Backend application using Hono and Prisma
│   ├── src/
│   ├── prisma/
│   ├── package.json
│   └── ...
├── frontend/      # Frontend application using React and Vite
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
└── README.md      # Project documentation
```

## Scripts

### Backend
- `npm run dev` - Start the backend in development mode
- `npm run deploy` - Deploy the backend to Cloudflare Workers

### Frontend
- `npm run dev` - Start the frontend in development mode
- `npm run build` - Build the frontend for production

## Technologies Used

### Backend
- **Hono**
- **Prisma**
- **PostgreSQL**

### Frontend
- **React**
- **Typescript**

## Deployment

1. Backend:
   - Deploy the backend to Cloudflare Workers using `npm run deploy`.

2. Frontend:
   - Build the frontend with `npm run build` and deploy the `dist` folder to your preferred hosting provider.


## License

This project is licensed under the [MIT License](LICENSE).
