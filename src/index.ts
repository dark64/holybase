import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import api from "./api";

const app = new Hono();

app.use(logger());
app.get("/health", (c) => {
  return c.json({ status: "ok" });
});

app.use(
  "/api/*",
  cors({
    origin: process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(",").map((s) => s.trim())
      : "*",
    credentials: true,
  })
);

app.route("/api", api);

export default app;
