import express from "express";

import { creatBook, deleteBook, getBook, getBooks, uptudateBook } from "../controllers/book.controller.js";

const router = express.Router();

 


router.get("/", getBook);
router.get("/:id", getBooks);
router.post("/", creatBook);

router.put("/:id", uptudateBook);
router.delete("/:id", deleteBook);

export default router;
