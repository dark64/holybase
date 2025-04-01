import { APIContext } from "@src/api";
import { Context, Next } from "hono";

export const authMiddleware = async (c: Context<APIContext>, next: Next) => {
  const user = c.get("user");
  if (!user) {
    return c.json(
      { error: "UNAUTHORIZED", message: "Unauthorized access" },
      { status: 401 }
    );
  }
  return next();
};
