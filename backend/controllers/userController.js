import { isValidObjectId, findDocumentById } from "../utils/index.js";
import User from "../models/User.js";

const updateUser = async (req, res) => {
  const { username, email, password } = req.body;
  const id = req.user._id;

  if (isValidObjectId(id, res)) return;

  try {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already exist!" });
    }

    const user = await findDocumentById(User, id, res);
    if (!user) return;

    user.username = username || user.username;
    user.email = email || user.email;
    user.password = password || user.password;

    await user.save();

    return res.status(200).json({ message: "Updated succesfully" });
  } catch (error) {
    console.log("Error updateUser", error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

export { updateUser };
