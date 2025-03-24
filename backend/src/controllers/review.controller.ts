import { Request, Response } from "express";
import reviewModel from "../models/review.model";
import { IUser } from "../types/user";
import { IBoardGameReview } from "../types/game";

/**
 * Get all reviews
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Return all reviews
 */
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

/**
 *
 * @param {Request<{id: string }, {}, Partial<IUser> >} req
 * @param {Response} res
 * @returns {void} Return review got by id
 */
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
  const { title, category, detail, rate } = req.body;
  const review = reviewModel.createReview({
    title,
    detail,
    rate,
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
  const deleted = reviewModel.deleteReview(id); // Returns reviews after deleting review by id from model.
  if (!deleted) {
    res.status(400).json({
      message: "Fail to delete",
    });
    return;
  }
  res.status(200).json(deleted);
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

const getSearchReview = async (
  req: Request<{}, {}, {}, { search: string }>,
  res: Response
) => {
  const { search } = req.query;
  const searchResult: IBoardGameReview[] = await reviewModel.searchReview(
    search
  );
  if (searchResult.length === 0) {
    res.status(400).json({
      message: "No result",
    });
    return;
  }
  res.status(200).json(searchResult);
};
export default {
  getAllReviews,
  getReviewById,
  createReview,
  deleteReview,
  editReview,
  getSearchReview,
};
