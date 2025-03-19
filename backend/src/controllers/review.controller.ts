import { Request, Response } from "express";
import reviewModel from "../models/review.model";
import { IUser } from "../types/user";
import { IBoardGameReview } from "../types/game";

const getAllReviews = (req: Request, res: Response) => {
  const reviews = reviewModel.getAllReviews();
  if (!reviews) {
    res.status(400).json({
      message: "No Review.",
    });
    return;
  }
  res.status(200).json(reviews);
};

const getReviewById = (
  req: Request<{ id: string }, {}, Partial<IUser>>,
  res: Response
) => {
  const { id } = req.params;
  const review = reviewModel.getReviewById(id);
  if (!review) {
    res.status(400).json({
      message: "Fail to get review",
    });
    return;
  }
  res.status(200).json(review);
};

const createReview = (
  req: Request<{}, {}, Omit<IBoardGameReview, "id">>,
  res: Response
) => {
  const { title, category } = req.body;
  const review = reviewModel.createReview({
    title,
    category,
  });
  if (!review) {
    res.status(402).json({
      message: "Fail to create new review.",
    });
    return;
  }
  res.status(200).json({
    message: "Create Review",
  });
};

const deleteReview = (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const deleted = reviewModel.deleteReview(id);
  if (!deleted) {
    res.status(400).json({
      message: "Fail to delete",
    });
    return;
  }
  res.status(200).json({
    message: "delete review",
  });
};

const editReview = async (
  req: Request<{ id: string }, {}, Partial<IBoardGameReview>>,
  res: Response
) => {
  const { id } = req.params;
  const { title, category } = req.body;
  const edited = await reviewModel.editReview(id, { title, category });
  if (!edited) {
    res.status(400).json({
      message: "Fail to edit",
    });
    return;
  }
  res.status(200).json(edited);
};
export default {
  getAllReviews,
  getReviewById,
  createReview,
  deleteReview,
  editReview,
};
