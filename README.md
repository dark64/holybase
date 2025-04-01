# Holybase 🪽

A minimal, yet powerful starter kit using **TypeScript, Hono, Postgres, Prisma, BetterAuth, and Zod** to kickstart your backends with ease. I prefer to keep my starter kits minimal, allowing you to extend and customize them as needed without unnecessary bloat.

## 🚀 Tech Stack

This starter base is built using a modern stack:

- **Bun** – A fast JavaScript runtime that makes package management and execution seamless.
- **Hono** – A lightweight, high-performance web framework for building APIs effortlessly.
- **TypeScript** – Strongly typed JavaScript for improved development and maintainability.
- **PostgreSQL** – A robust and scalable relational database.
- **Prisma** – A modern ORM that simplifies database queries and migrations.
- **BetterAuth** – Secure and flexible authentication for your applications.
- **Zod** – A powerful schema validation library to ensure data integrity.

## 📦 Installation

Clone the repository and install dependencies:

```sh
bun install
```

## 🔧 Setup

1. **Environment Variables**
   - Copy `.env.dev` to `.env`
   - Fill in database and authentication details

2. **Database Setup**
   ```sh
   bunx prisma migrate dev --name init
   ```

3. **Run the Development Server**
   ```sh
   bun run dev
   ```

## 🤝 Contributing

PRs are welcome! Feel free to fork and modify.
