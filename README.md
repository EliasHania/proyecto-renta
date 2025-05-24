# 📊 Proyecto Renta

Aplicación web fullstack para gestionar finanzas personales y declarar criptomonedas con generación de informes fiscales.

---

## 🧩 Tecnologías usadas

### Frontend (React + Vite)

- React 19 + Vite
- TailwindCSS
- React Router DOM
- XLSX (exportación Excel)
- react-datepicker / recharts

### Backend (Node.js + Express)

- Express.js
- MongoDB + Mongoose
- dotenv / cors

---

## ⚙️ Instalación y ejecución local

### 1. Clonar el repositorio

```bash
git clone https://github.com/EliasHania/proyecto-renta.git
cd proyecto-renta
```

### 2. Configurar variables de entorno

#### 🗂️ Frontend (.env en raíz)

```
VITE_API_URL=http://localhost:5000
```

#### 🔐 Backend (`server/.env`)

```
MONGO_URI=your_mongo_uri
PORT=5000
```

### 3. Instalar dependencias

#### Frontend:

```bash
npm install
npm run dev
```

#### Backend:

```bash
cd server
npm install
npm start
```

---

## 🚀 Despliegue

- Backend: [Render](https://render.com)
- Frontend: [Netlify](https://netlify.com)

---

## 📂 Estructura

```
proyecto-renta/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   └── App.jsx
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── index.js
└── .env / .env.example / .gitignore
```

---

## ✍️ Autor

**Elias Hania** — [github.com/EliasHania](https://github.com/EliasHania)

---

## 📄 Licencia

Este proyecto se distribuye bajo licencia MIT.
