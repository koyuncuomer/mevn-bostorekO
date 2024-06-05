import Comment from "../models/Comment.js";

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
    const comments = await Comment.find({ book: id }).populate('postedBy', '-password');

    return res.status(200).json({ message: "Comments for book!", comments });
  } catch (error) {
    console.log("Error getCommentsForBook", error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

export { createAComment, getCommentsForBook };
