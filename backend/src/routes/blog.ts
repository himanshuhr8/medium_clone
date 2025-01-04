import { Hono } from "hono";
import { Context } from "hono";
import { decode, sign, verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { z } from "zod";

const app = new Hono<{
  Variables: {
    userId: string;
  };
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

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
app.post("/", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const userId = c.get("userId");
    const body = await c.req.json();
    const schema = z.object({
      title: z.string(),
      content: z.string(),
    });
    const data = schema.parse(body);
    const post = await prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        authorId: userId,
      },
      select: {
        id: true,
      },
    });
    return c.json({ id: post.id });
  } catch (e) {
    return c.json({ message: "Internal Server Error" }, 500);
  }
});
app.put("/", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const schema = z.object({
      title: z.string(),
      content: z.string(),
      id: z.string(),
    });
    const data = schema.parse(body);
    const post = await prisma.post.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        content: data.content,
      },
      select: {
        id: true,
      },
    });
    return c.json({ message: "Post Updated" });
  } catch (e) {
    return c.json({ message: "Internal Server Error" }, 500);
  }
});

app.get("/bulk", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const posts = await prisma.post.findMany({
      select: {
        title: true,
        content: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return c.json({ blogs: posts });
  } catch (e) {
    return c.json({ message: "Internal Server Error" }, 500);
  }
});
app.get("/:id", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogId = c.req.param("id");
    console.log(blogId);
    const post = await prisma.post.findFirst({
      where: {
        id: blogId,
      },
      select: {
        title: true,
        content: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return c.json({ blog: post });
  } catch (e) {
    return c.json({ message: "Internal Server Error" }, 500);
  }
});
export default app;
