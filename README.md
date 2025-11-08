# 🐾 Pawtopia — Integrated Cat Care Platform

Pawtopia is a modern web platform designed to provide **all-in-one services for cat owners** — including products, hotels, sitters, insurance, and pharmacies.  
Built using **Next.js 14**, **TailwindCSS**, and **PostgreSQL (via Prisma ORM)**, it delivers a responsive, scalable experience across devices.

---

## 🧭 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Setup](#-environment-setup)
- [Database Management (Prisma)](#-database-management-prisma)
- [Scripts](#-scripts)
- [Deployment](#-deployment)
- [License](#-license)

---

## ✨ Features

- 🏠 **Home Page** — Welcoming hero section with CTA buttons  
- 🐈 **Services Page** — Cat hotels, sitters, insurance, and pharmacy cards  
- 🛍️ **Products Page** — Fetches products dynamically from PostgreSQL  
- 📱 **Fully Responsive UI** — Mobile-friendly with hamburger navigation  
- 💾 **Database Integration** — Prisma ORM + Neon PostgreSQL  
- 🎨 **Custom Theme Colors** — Tailwind extended palette for brand identity  

---

## 🛠️ Tech Stack

| Category | Technology |
|-----------|-------------|
| Framework | [Next.js 14](https://nextjs.org/) (App Router) |
| Styling | [TailwindCSS](https://tailwindcss.com/) |
| Icons | [lucide-react](https://lucide.dev/) |
| ORM | [Prisma](https://www.prisma.io/) |
| Database | [PostgreSQL](https://www.postgresql.org/) via [Neon.tech](https://neon.tech/) |
| Language | TypeScript |


## 🚀 Getting Started

1️⃣ Clone the repository
git clone https://github.com/yourusername/pawtopia.git
cd pawtopia

2️⃣ Install dependencies
npm install

3️⃣ Run the development server
npm run dev
Then open your browser to http://localhost:3000
⚙️ Environment Setup

Create a .env file in your project root:

DATABASE_URL="postgresql://neondb_owner:yourpassword@your-neon-host/neondb?sslmode=require"

🐘 Database Management (Prisma)
Initialize Prisma 
npx prisma init

Apply database migrations
npx prisma migrate dev --name init

### ⚙️ Versions (from `package.json`)
```json
"dependencies": {
  "@prisma/client": "^5.x",
  "lucide-react": "^0.x",
  "next": "^14.x",
  "react": "^18.x",
  "react-dom": "^18.x",
  "tailwindcss": "^3.x",
  "postcss": "^8.x",
  "autoprefixer": "^10.x",
  "dotenv": "^16.x"
},
"devDependencies": {
  "@types/node": "^20.x",
  "@types/react": "^18.x",
  "@types/react-dom": "^18.x",
  "eslint": "^8.x",
  "eslint-config-next": "^14.x",
  "ts-node": "^10.x",
  "typescript": "^5.x"
}

Open Prisma Studio (browser UI)
npx prisma studio

Seed example products
npm run seed
