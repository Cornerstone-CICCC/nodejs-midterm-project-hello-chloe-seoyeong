export interface IBoardGameReview {
  id: string;
  title: string;
  rate: number;
  category: string;
  detail: string;
}

export interface IBoardGameReviewHashTag {
  id: string;
  title: string;
  rate: number;
  category: string[];
  detail: string;
}

export interface IBoardGame {
  gameId: number;
  name: string;
  thumbnail: string;
  yearPublished: number;
}
