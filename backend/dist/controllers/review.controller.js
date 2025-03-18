"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getAllReviews = (req, res) => {
    res.status(200).json({
        message: "All Reviews",
    });
};
const getReviewById = (req, res) => {
    res.status(200).json({
        message: "Review one",
    });
};
const createReview = (req, res) => {
    res.status(200).json({
        message: "Create Review",
    });
};
const deleteReview = (req, res) => {
    res.status(200).json({
        message: "delete review",
    });
};
const editReview = (req, res) => {
    res.status(200).json({
        message: "edit review",
    });
};
exports.default = {
    getAllReviews,
    getReviewById,
    createReview,
    deleteReview,
    editReview,
};
