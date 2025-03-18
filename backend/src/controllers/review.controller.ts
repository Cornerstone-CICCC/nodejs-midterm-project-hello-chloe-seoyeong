import { Request, Response } from "express";

const getAllReviews = (req: Request, res: Response) => {
  res.status(200).json({
    message: "All Reviews",
  });
};

const getReviewById = (req: Request, res: Response) => {
  res.status(200).json({
    message: "Review one",
  });
};

const createReview = (req: Request, res: Response) => {
  res.status(200).json({
    message: "Create Review",
  });
};

const deleteReview = (req: Request, res: Response) => {
  res.status(200).json({
    message: "delete review",
  });
};

const editReview = (req: Request, res: Response) => {
  res.status(200).json({
    message: "edit review",
  });
};
export default {
  getAllReviews,
  getReviewById,
  createReview,
  deleteReview,
  editReview,
};
