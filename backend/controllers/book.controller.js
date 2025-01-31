import Book from "../models/book.model.js";
import mongoose from "mongoose";


export const getBooks =async (req, res) => {
    try {
      const books = await Book.find({});
      res.status(200).json({ success: true, data: books });
    } catch (error) {
      console.log("Error getting books", error.message);
      res.status(500).json({ success: false, message: "server error" });
    }
  };
  export const getBook=async (req, res) => {
      try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(404).json({ success: false, message: "Invalid book id" });
        }
        const book = await Book.findById(id);
        res.status(200).json({ success: true, data: book });
      } catch (error) {
        console.log("Error getting abook:", error.message);
        res.status(500).json({ success: false, message: "server error" });
      }
    }

  export const creatBook = async (req, res) => {
    const book = req.body;
  
    if (!book.title || !book.author || !book.price || !book.cover) {
      return res
        .status(400).json({ success: false, message: "Please proved all fields" });
    }
  
    const newBook = new Book(book);
  
    try {
      await newBook.save();
      res.status(201).json({ success: true, data: newBook });
    } catch (error) {
      console.log("Error in creating a book:", error.message);
      res.status(500).json({ success: false, message: "Servsr error" });
    };
  }
  export const uptudateBook = async (req, res) => {
    const { id } = req.params;
    const book = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, message: "Invalid book id" });
    }
    try {
      const uppdatedBook = await Book.findByIdAndUpdate(id, book, { new: true });
      res.status(200).json({ success: true, data: uppdatedBook });
    } catch (error) {
      res.status(500).json({ success: false, message: "sever error" });
    };
  }
  export const deleteBook =  async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, message: "Invalid book id" });
    }
    try {
      await Book.findByIdAndDelete(id);
      res
        .status(200)
        .json({ success: true, message: "book deleted successfully" });
    } catch (error) {
      console.log("Error deleting a book:", error.message);
      res.status(500).json({ success: false, message: "server error" });
    }
  }

