import Comment from "../models/Comment.js";
import { isValidObjectId, findDocumentById } from "../utils/index.js";
const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate("book", "title")
      .populate("postedBy", "username");

    return res.status(200).json(comments);
  } catch (error) {
    console.log("Error getAllComments", error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

const createAComment = async (req, res) => {
  try {
    const { bookId, content, userId } = req.body;

    const newComment = await Comment.create({
      content,
      book: bookId,
      postedBy: userId,
    });

    return res
      .status(201)
      .json({ message: "Comment created!", comment: newComment });
  } catch (error) {
    console.log("Error createAComment", error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

const getCommentsForBook = async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await Comment.find({ book: id }).populate(
      "postedBy",
      "-password"
    );

    return res.status(200).json({ message: "Comments for book!", comments });
  } catch (error) {
    console.log("Error getCommentsForBook", error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

const getCommentsByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await Comment.find({ postedBy: id }).populate("book");

    return res.status(200).json({ message: "Comments by user!", comments });
  } catch (error) {
    console.log("Error getCommentsByUser", error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

const updateAComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  if (isValidObjectId(id, res)) return;

  try {
    const comment = await findDocumentById(Comment, id, res);
    if (!comment) return;

    comment.content = content || comment.content;

    await comment.save();

    return res.status(200).json({ message: "Updated succesfully", comment });
  } catch (error) {
    console.log("Error updateAComment", error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

const deleteAComment = async (req, res) => {
  const { id } = req.params;

  if (isValidObjectId(id, res)) return;

  try {
    const comment = await findDocumentById(Comment, id, res);
    if (!comment) return;

    await comment.deleteOne();
    return res.status(200).json({ message: "Comment deleted!" });
  } catch (error) {
    console.log("Error deleteAComment", error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

const upvoteComment = async (req, res) => {
  const commentId = req.params.id;
  const userId = req.user._id;

  if (isValidObjectId(commentId, res)) return;

  try {
    const comment = await findDocumentById(Comment, commentId, res);
    if (!comment) return;

    comment.upvotes.push(userId);

    await comment.save();

    return res.status(200).json({ message: "Upvoted succesfully", comment });
  } catch (error) {
    console.log("Error upvoteComment", error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

const downvoteComment = async (req, res) => {
  const commentId = req.params.id;
  const userId = req.user._id;

  if (isValidObjectId(commentId, res)) return;

  try {
    const comment = await findDocumentById(Comment, commentId, res);
    if (!comment) return;

    comment.upvotes = comment.upvotes.filter(
      (upvote) => upvote.toString() !== userId.toString()
    );

    await comment.save();

    return res.status(200).json({ message: "Dowvoted succesfully", comment });
  } catch (error) {
    console.log("Error upvoteComment", error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

export {
  getAllComments,
  createAComment,
  getCommentsForBook,
  getCommentsByUser,
  updateAComment,
  deleteAComment,
  upvoteComment,
  downvoteComment,
};
