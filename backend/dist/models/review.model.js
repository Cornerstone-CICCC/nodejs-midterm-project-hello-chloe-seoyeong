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
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class BoardGame {
    constructor() {
        this.boardGamesReviews = [];
    }
    getAllReviews() {
        if (this.boardGamesReviews.length === 0)
            return false;
        return this.boardGamesReviews;
    }
    getReviewById(id) {
        const reviewIndex = this.foundIndexReview(id);
        if (reviewIndex === -1)
            return false;
        const review = this.boardGamesReviews[reviewIndex];
        return review;
    }
    createReview(review) {
        const { title, category, rate, detail } = review;
        const newReview = {
            id: (0, uuid_1.v4)(),
            title,
            category,
            rate,
            detail,
        };
        this.boardGamesReviews.push(newReview);
        return newReview;
    }
    editReview(id, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const review = this.foundIndexReview(id);
            if (review === -1)
                return false;
            const updateReview = Object.assign(Object.assign({}, this.boardGamesReviews[review]), { title: (_a = updates.title) !== null && _a !== void 0 ? _a : this.boardGamesReviews[review].title, category: (_b = updates.category) !== null && _b !== void 0 ? _b : this.boardGamesReviews[review].category });
            this.boardGamesReviews = [
                ...this.boardGamesReviews.slice(0, review),
                updateReview,
                ...this.boardGamesReviews.slice(review + 1),
            ];
            return updateReview;
        });
    }
    deleteReview(id) {
        const review = this.foundIndexReview(id);
        if (review === -1)
            return false;
        this.boardGamesReviews.splice(review, 1);
        return this.boardGamesReviews;
    }
    foundIndexReview(id) {
        return this.boardGamesReviews.findIndex((r) => r.id === id);
    }
}
exports.default = new BoardGame();
