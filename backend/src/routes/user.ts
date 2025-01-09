import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import { z } from "zod";
import { compare, compareSync, hash } from "bcryptjs";

const app = new Hono<{
  Variables: {
    userId: string;
  };
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.post("/signup", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const schema = z.object({
      email: z.string().email(),
      name: z.string(),
      password: z.string().min(8).max(15),
    });
    const body = await c.req.json();
    const data = schema.parse(body);
    const hashedPassword = await hash(data.password, 12);

    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: hashedPassword,
      },
    });
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ token: token });
  } catch (err) {
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

app.post("/signin", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const schema = z.object({
      email: z.string().email(),
      password: z.string().min(8).max(15),
    });
    const body = await c.req.json();
    const data = schema.parse(body);
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    if (!user) {
      return c.json({ error: "Invalid Email or Password" }, 400);
    }
    const checkPassword = await compare(data.password, user.password);
    if (!checkPassword) {
      return c.json({ error: "Invalid Email or Password" }, 400);
    }
    const token = await sign({ id: user!.id }, c.env.JWT_SECRET);
    return c.json({ token: token });
  } catch (err) {
    return c.json({ error: "Internal Server Error" }, 500);
  }
});
app.use("*", async (c, next) => {
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
app.get("/profile", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const response = await prisma.user.findUnique({
      where: {
        id: c.get("userId"),
      },
      select: {
        email: true,
        name: true,
      },
    });
    return c.json({ user: response });
  } catch (e) {
    return c.json({ message: "Internal Server Error" }, 500);
  }
});
export default app;
