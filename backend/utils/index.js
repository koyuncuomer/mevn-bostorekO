import mongoose from "mongoose";

const isValidObjectId = (id, res) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Object Id" });
  }
};

const findDocumentById = async (model, id, res) => {
  try {
    const document = await model.findById(id);

    if (!document) {
      res.status(404).json({ error: `${model.modelName} does not exist!` });
      return null;
    }
    return document;
  } catch (error) {
    console.log(`Error finding ${model.modelName} by Id!`, error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

const checkValidationErrors = (error, res) => {
  const validationErrors = {};

  for (const field in error.errors) {
    validationErrors[field] = error.errors[field].message;
  }

  return res.status(400).json({ error: "Validation error!", validationErrors });
};

export { isValidObjectId, findDocumentById, checkValidationErrors };
