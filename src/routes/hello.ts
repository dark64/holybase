import { APIContext } from "@src/api";
import { authMiddleware } from "@src/middleware/auth";
import { Hono } from "hono";

const hello = new Hono<APIContext>();

hello.get("/", async (c) => {
  return c.json({ message: `Hello, guest!` });
});

hello.get("/me", authMiddleware, async (c) => {
  const user = c.get("user");
  return c.json({ message: `Hello, ${user!.name}!` });
});

export default hello;
