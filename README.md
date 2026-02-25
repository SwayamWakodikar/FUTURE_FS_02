<h1 align="center">
  <br>
  Quantive CRM
  <br>
</h1>

<h4 align="center">A Next-Generation Lead Management System built with the MERN Stack.</h4>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#deployment">Deployment</a> •
  <a href="#api-reference">API Reference</a>
</p>

![Project Banner](https://via.placeholder.com/1000x300?text=Quantive+CRM+Dashboard) <!-- 

---

## 🚀 Key Features

* **Comprehensive Lead Management**: Seamlessly add, track, update, and organize your leads.
* **Modern Dashboard Interface**: An intuitive, highly responsive frontend built with React, Vite, and Tailwind CSS.
* **RESTful Backend Architecture**: Scalable and robust NodeJS backend utilizing Express & MongoDB.
* **Typesafe Frontend**: Built using TypeScript to ensure robust UI development and fewer runtime errors.
* **Docker Ready**: Includes Dockerfiles and docker-compose setups for streamlined deployment.
* **Fast Development**: Harnessing Vite for lightning-quick Hot Module Replacement (HMR).

## 🛠 Tech Stack

**Frontend:**
* [React 19](https://react.dev/)
* [TypeScript](https://www.typescriptlang.org/)
* [Vite](https://vitejs.dev/)
* [TailwindCSS 4](https://tailwindcss.com/)
* [Axios](https://axios-http.com/)

**Backend:**
* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/) (Mongoose)
* [Docker](https://www.docker.com/)

## 🏗 Architecture

The project follows a standard client-server architecture:

```
Quantive CRM
├── client/          # React + Vite + TS Frontend Application
│   ├── src/
│   │   ├── components/
│   │   ├── assets/
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
└── server/          # Node.js + Express + MongoDB Backend Service
    ├── src/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── server.js 
    ├── Dockerfile
    └── compose.yaml
```

## 🏁 Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

* Node.js (v18 or higher recommended)
* MongoDB (Local instance or MongoDB Atlas cluster)
* Git
* *(Optional)* Docker Desktop (for containerized setup)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/quantive-crm.git
   cd quantive-crm
   ```

2. **Setup the Backend**
   ```bash
   cd server
   npm install
   ```
   *Create a `.env` file in the `server` directory and add your MongoDB connection string and port:*
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```

3. **Setup the Frontend**
   ```bash
   cd ../client
   npm install
   ```

### Running Locally

You can run both servers concurrently or in separate terminals.

**Terminal 1 (Backend - Development Server):**
```bash
cd server
npm run dev
```

**Terminal 2 (Frontend - Vite App):**
```bash
cd client
npm run dev
```

Your frontend should now be running securely on `http://localhost:5173/` and backend on `http://localhost:5000/`.

## 🐳 Docker Setup

Quantive CRM supports Docker for seamless environment setup.

Ensure Docker is running, navigate to the `server` or the root depending on your target environment, and use docker-compose:

```bash
cd server
docker compose up -d
```
*Further details for Docker deployment can be found in `server/README.Docker.md`.*

## 📖 API Reference

Here are some of the primary endpoints exposed by the Express server. *(Adjust according to your exact routes)*

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/leads` | Fetch all leads |
| `POST` | `/api/leads` | Create a new lead |
| `GET` | `/api/leads/:id` | Fetch a single lead by ID |
| `PUT` | `/api/leads/:id` | Update an existing lead |
| `DELETE` | `/api/leads/:id` | Delete a single lead |

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---
*Designed with ❤️ for modern sales and administrative teams.*
