import { Hono } from "hono";
import { auth } from "../lib/auth";
import hello from "./routes/hello";

export type APIContext = {
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
};

const api = new Hono<APIContext>();

api.use("*", async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    c.set("user", null);
    c.set("session", null);
    return next();
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return next();
});

api.on(["POST", "GET"], "/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

// register your route groups here
api.route("/hello", hello);

export default api;
