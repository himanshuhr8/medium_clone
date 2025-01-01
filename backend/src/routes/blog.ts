import { Hono } from "hono";
const app = new Hono();

app.put("/edit", (c) => {
  return c.text("Hello World from blog");
});
app.get("/all/:id", (c) => {
  return c.text("Hello World from blog");
});
export default app;
