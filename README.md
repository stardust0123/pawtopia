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

## 📦 Dependencies

### Core Frameworks & Libraries
| Package | Description |
|----------|-------------|
| **next** | React framework for full-stack web apps |
| **react** | UI library used by Next.js |
| **react-dom** | Rendering engine for React components |
| **typescript** | Type checking and better code organization |
| **tailwindcss** | Utility-first CSS framework for styling |
| **postcss** | CSS processor used by Tailwind |
| **autoprefixer** | Automatically adds CSS vendor prefixes |
| **@prisma/client** | Prisma ORM client for database access |
| **prisma** | Database schema & migration management tool |
| **lucide-react** | Modern SVG icon library for React |
| **dotenv** | Loads environment variables from `.env` file |

---

### 🧩 Dev Dependencies
| Package | Description |
|----------|-------------|
| **eslint** | JavaScript/TypeScript linter |
| **eslint-config-next** | ESLint config optimized for Next.js |
| **ts-node** | TypeScript execution for seeding scripts |
| **@types/node** | Type definitions for Node.js |
| **@types/react** | Type definitions for React |
| **@types/react-dom** | Type definitions for React DOM |

---

### ⚙️ Versions (from `package.json`)
If you want reproducibility, here’s your project’s dependency list at a glance:

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
// test 