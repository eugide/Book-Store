import express, { json } from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import bookRouter from "./routers/book.route.js";




dotenv.config();

const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use("/api/books", bookRouter);

app.listen(port, async () => {
  await connectDb();
  console.log(`Server started on port ${port}`);
});
