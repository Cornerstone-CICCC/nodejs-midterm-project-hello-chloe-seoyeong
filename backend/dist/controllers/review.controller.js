"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const review_model_1 = __importDefault(require("../models/review.model"));
/**
 * Get all reviews
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Return all reviews
 */
const getAllReviews = (req, res) => {
    const reviews = review_model_1.default.getAllReviews();
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
const getReviewById = (req, res) => {
    const { id } = req.params;
    const review = review_model_1.default.getReviewById(id);
    if (!review) {
        res.status(400).json({
            message: "Fail to get review",
        });
        return;
    }
    res.status(200).json(review);
};
const createReview = (req, res) => {
    const { title, category, detail, rate } = req.body;
    const review = review_model_1.default.createReview({
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
const deleteReview = (req, res) => {
    const { id } = req.params;
    const deleted = review_model_1.default.deleteReview(id); // Returns reviews after deleting review by id from model.
    if (!deleted) {
        res.status(400).json({
            message: "Fail to delete",
        });
        return;
    }
    res.status(200).json(deleted);
};
const editReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, category } = req.body;
    const edited = yield review_model_1.default.editReview(id, { title, category });
    if (!edited) {
        res.status(400).json({
            message: "Fail to edit",
        });
        return;
    }
    res.status(200).json(edited);
});
const getSearchReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search } = req.query;
    const searchResult = yield review_model_1.default.searchReview(search);
    if (searchResult.length === 0) {
        res.status(400).json({
            message: "No result",
        });
        return;
    }
    res.status(200).json(searchResult);
});
exports.default = {
    getAllReviews,
    getReviewById,
    createReview,
    deleteReview,
    editReview,
    getSearchReview,
};
