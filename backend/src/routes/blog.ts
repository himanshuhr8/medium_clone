import { Hono } from "hono";
import { Context } from "hono";
import { decode, sign, verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const app = new Hono<{
  Variables: {
    userId: string;
  };
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.use("/*", async (c, next) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const header = c.req.header("Authorization");
    if (!header || !header.startsWith("Bearer ")) {
      return c.json({ message: "Unauthorized" }, 401);
    }
    const token = header.split(" ")[1];
    if (!token) {
      return c.json({ message: "Unauthorized" }, 401);
    }
    const decoded = decode(token);

    const userId = decoded.payload.id;
    const response = await prisma.user.findUnique({
      where: {
        id: userId as string,
      },
      select: {
        id: true,
      },
    });
    if (response) {
      c.set("userId", userId as string);
      return next();
    } else {
      return c.json({ message: "Unauthorized" }, 401);
    }
  } catch (e) {
    return c.json({ message: "Unauthorized" }, 401);
  }
});
app.post("/post", (c) => {
  console.log(c.get("userId"));
  return c.text("Hello World from blog");
});
app.put("/edit", (c) => {
  return c.text("Hello World from blog");
});
app.get("/all/:id", (c) => {
  return c.text("Hello World from blog");
});
export default app;
