"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class BoardGame {
    constructor() {
        this.boardGamesReviews = [];
    }
    getAllReviews() {
        return this.boardGamesReviews;
    }
    getReviewById(id) {
        const review = this.boardGamesReviews.findIndex((r) => r.id === id);
        if (review === -1)
            return false;
        return review;
    }
    createReview(review) {
        const { title, category } = review;
        const newReview = {
            id: (0, uuid_1.v4)(),
            title,
            category,
        };
        this.boardGamesReviews.push(newReview);
        return newReview;
    }
    editReview() { }
    deleteReview() { }
}
exports.default = new BoardGame();
