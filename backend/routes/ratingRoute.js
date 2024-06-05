import express from "express";
import * as ratingController from "../controllers/ratingController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/book/:id").get(ratingController.getRatingsForBook);

router
  .route("/")
  .post(authMiddleware.authenticateUser, ratingController.createARate);

router
  .route("/:id")
  .put(authMiddleware.authenticateUser, ratingController.updateARate)
  .delete(authMiddleware.authenticateUser, ratingController.deleteARate);

export default router;
