import { IBoardGameReview } from "../types/game";
import { v4 as uuidv4 } from "uuid";

class BoardGame {
  private boardGamesReviews: IBoardGameReview[] = [];

  getAllReviews() {
    if (this.boardGamesReviews.length === 0) return false;
    return this.boardGamesReviews;
  }
  getReviewById(id: string) {
    const reviewIndex = this.foundIndexReview(id);
    if (reviewIndex === -1) return false;
    const review = this.boardGamesReviews[reviewIndex];
    return review;
  }
  createReview(review: Omit<IBoardGameReview, "id">) {
    const { title, category, rate, detail } = review;
    const newReview = {
      id: uuidv4(),
      title,
      category,
      rate,
      detail,
    };
    this.boardGamesReviews.push(newReview);
    return newReview;
  }
  async editReview(id: string, updates: Partial<IBoardGameReview>) {
    const review = this.foundIndexReview(id);
    if (review === -1) return false;

    const updateReview = {
      ...this.boardGamesReviews[review],
      title: updates.title ?? this.boardGamesReviews[review].title,
      category: updates.category ?? this.boardGamesReviews[review].category,
    };
    this.boardGamesReviews = [
      ...this.boardGamesReviews.slice(0, review),
      updateReview,
      ...this.boardGamesReviews.slice(review + 1),
    ];
    return updateReview;
  }
  deleteReview(id: string) {
    const review = this.foundIndexReview(id);
    if (review === -1) return false;

    this.boardGamesReviews.splice(review, 1);
    return this.boardGamesReviews;
  }
  foundIndexReview(id: string) {
    return this.boardGamesReviews.findIndex((r) => r.id === id);
  }
}

export default new BoardGame();
