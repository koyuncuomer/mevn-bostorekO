import {
  isValidObjectId,
  findDocumentById,
  checkValidationErrors,
} from "../utils/index.js";
import Book from "../models/Book.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).json(books);
  } catch (error) {
    console.log("Error getAllBooks", error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

const getBooksByUploader = async (req, res) => {
  try {
    const uploaderId = req.user._id;
    const books = await Book.find({ uploader: uploaderId });
    return res.status(200).json(books);
  } catch (error) {
    console.log("Error getBooksByUploader", error);
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
  const cloudinaryRes = await cloudinary.uploader
    .upload(req.files.image.tempFilePath, {
      user_filename: true,
      folder: "bostorekO",
    })
    .catch((error) => {
      console.log("cloudinary upload error", error);
      return res.status(500).json({ error });
    });

  try {
    const { title, author, description, pageNumber } = req.body;
    const uploader = req.user._id;
    const imageUrl = cloudinaryRes.secure_url;

    const existingBook = await Book.findOne({ title, author });
    if (existingBook) {
      return res.status(400).json({ error: "A book already exist!" });
    }

    const newBook = await Book.create({
      title,
      author,
      description,
      pageNumber,
      uploader,
      imageUrl,
    });

    fs.unlinkSync(req.files.image.tempFilePath);

    return res.status(201).json({ message: "Book created!", book: newBook });
  } catch (error) {
    //Handle mongoose validation error
    if (error.name === "ValidationError") {
      if (checkValidationErrors(error, res)) return;
    } else {
      console.log("Error createABook", error);
      return res.status(500).json({ error: "Internal Server error" });
    }
  }
};

const updateABook = async (req, res) => {
  const { id } = req.params;
  const { title, author, description, pageNumber } = req.body;

  if (isValidObjectId(id, res)) return;

  try {
    const book = await findDocumentById(Book, id, res);
    if (!book) return;

    book.title = title || book.title;
    book.author = author || book.author;
    book.description = description || book.description;
    book.pageNumber = pageNumber || book.pageNumber;

    await book.save();

    return res.status(200).json({ message: "Updated succesfully", book });
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

    await book.deleteOne();
    return res.status(200).json({ message: "Book deleted!" });
  } catch (error) {
    console.log("Error deleteABook", error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

export {
  getAllBooks,
  createABook,
  getABook,
  updateABook,
  deleteABook,
  getBooksByUploader,
};
