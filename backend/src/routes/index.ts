import { Hono } from "hono";
const app = new Hono();
import userRouter from "./user";
import blogRouter from "./blog";

app.route("/user", userRouter);
app.route("/blog", blogRouter);

export default app;
