export interface IBoardGameReview {
  id: string;
  title: string;
  category: string;
}

export interface IBoardGame {
  gameId: number;
  name: string;
  thumbnail: string;
  yearPublished: number;
}
