import { Router } from "express";
import reviewController from "../controllers/review.controller";

const reviewRouter = Router();

reviewRouter.get("/", reviewController.getAllReviews);
reviewRouter.get("/:id", reviewController.getReviewById);
reviewRouter.delete("/:id/delete", reviewController.deleteReview);
reviewRouter.put("/:id/edit", reviewController.editReview);
reviewRouter.post("/create", reviewController.createReview);

export default reviewRouter;
