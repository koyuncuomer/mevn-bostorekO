import { isValidObjectId, findDocumentById } from "../utils/index.js";
import Book from "../models/Book.js";

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).json(books);
  } catch (error) {
    console.log("Error getAllBooks", error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

const getABook = async (req, res) => {
  const { id } = req.params;

  if (isValidObjectId(id, res)) return;

  try {
    const book = await findDocumentById(Book, id, res);
    if (!book) return;

    return res.status(200).json(book);
  } catch (error) {
    console.log("Error getABook", error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

const createABook = async (req, res) => {
  try {
    const { title, author } = req.body;
    const existingBook = await Book.findOne({ title, author });
    if (existingBook) {
      return res.status(400).json({ error: "A book already exist!" });
    }

    const newBook = await Book.create(req.body);

    return res.status(201).json({ message: "Book created!", book: newBook });
  } catch (error) {
    //Handle mongoose validation error
    if (error.name === "ValidationError") {
      const validationErrors = {};

      for (const field in error.errors) {
        validationErrors[field] = error.errors[field].message;
      }

      return res
        .status(400)
        .json({ error: "Validation error!", validationErrors });
    } else {
      console.log("Error createABook", error);
      return res.status(500).json({ error: "Internal Server error" });
    }
  }
};

const updateABook = async (req, res) => {
  const { id } = req.params;
  const { title, author, description, pageNumber, rating } = req.body;

  if (isValidObjectId(id, res)) return;

  try {
    const book = await findDocumentById(Book, id, res);
    if (!book) return;

    book.title = title || book.title;
    book.author = author || book.author;
    book.description = description || book.description;
    book.pageNumber = pageNumber || book.pageNumber;
    book.rating = rating || book.rating;

    await book.save();

    return res.status(200).json({ message: "Updated succesfully" });
  } catch (error) {
    console.log("Error updateABook", error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

const deleteABook = async (req, res) => {
  const { id } = req.params;

  if (isValidObjectId(id, res)) return;

  try {
    const book = await findDocumentById(Book, id, res);
    if (!book) return;

    await Book.deleteOne();
    return res.status(200).json({ message: "Book deleted!" });
  } catch (error) {
    console.log("Error deleteABook", error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

export { getAllBooks, createABook, getABook, updateABook, deleteABook };