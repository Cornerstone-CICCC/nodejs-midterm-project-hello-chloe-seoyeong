import { IBoardGameReview } from "../types/game";
import { v4 as uuidv4 } from "uuid";

class BoardGame {
  private boardGamesReviews: IBoardGameReview[] = [];

  getAllReviews() {
    return this.boardGamesReviews;
  }
  getReviewById(id: string) {
    const review = this.boardGamesReviews.findIndex((r) => r.id === id);
    if (review === -1) return false;
    return review;
  }
  createReview(review: Omit<IBoardGameReview, "id">) {
    const { title, category } = review;
    const newReview = {
      id: uuidv4(),
      title,
      category,
    };
    this.boardGamesReviews.push(newReview);
    return newReview;
  }
  editReview() {}
  deleteReview() {}
}

export default new BoardGame();
