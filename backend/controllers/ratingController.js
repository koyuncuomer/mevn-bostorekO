import Rating from "../models/Rating.js";
import { isValidObjectId, findDocumentById } from "../utils/index.js";
const createARate = async (req, res) => {
  try {
    const { bookId, rate, userId } = req.body;

    const newRate = await Rating.create({
      rate,
      book: bookId,
      ratedBy: userId,
    });

    return res.status(201).json({ message: "Rate created!", rating: newRate });
  } catch (error) {
    console.log("Error createARate", error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

const getRatingsForBook = async (req, res) => {
  try {
    const { id } = req.params;
    const ratings = await Rating.find({ book: id }).populate(
      "ratedBy",
      "-password"
    );

    return res.status(200).json({ message: "Ratings for book!", ratings });
  } catch (error) {
    console.log("Error getRatingsForBook", error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

const updateARate = async (req, res) => {
  const { id } = req.params;
  const { rate } = req.body;

  if (isValidObjectId(id, res)) return;

  try {
    const rating = await findDocumentById(Rating, id, res);
    if (!rating) return;

    rating.rate = rate || rating.rate;

    await rating.save();

    return res.status(200).json({ message: "Updated succesfully", rating });
  } catch (error) {
    console.log("Error updateARate", error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

const deleteARate = async (req, res) => {
  const { id } = req.params;

  if (isValidObjectId(id, res)) return;

  try {
    const comment = await findDocumentById(Rating, id, res);
    if (!comment) return;

    await comment.deleteOne();
    return res.status(200).json({ message: "Rate deleted!" });
  } catch (error) {
    console.log("Error deleteARate", error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

export { createARate, getRatingsForBook, updateARate, deleteARate };
