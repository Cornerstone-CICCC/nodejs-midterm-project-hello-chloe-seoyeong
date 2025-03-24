import { atom } from "recoil";

interface IUserInfo {
  username: string | null;
}

export enum RateEmoji {
  "EXCELLENT",
  "GREAT",
  "GOOD",
  "NOTBAD",
  "WOOOOOOO",
}

export interface IUserDetail {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
}

export interface IGameList {
  gameId: number;
  name: string;
  thumbnail: string;
  yearPublished: number;
}

export interface IReviewList {
  id: number;
  title: string;
  category: string[];
  rate: RateEmoji;
  detail: string;
}

export const userState = atom<IUserInfo>({
  key: "userState",
  default: undefined,
});

export const reviewsState = atom<IReviewList[]>({
  key: "reviewsState",
  default: [],
});

export const isLoggedInState = atom<boolean>({
  key: "isLoggedInState",
  default: false,
});

export const gamelistState = atom<IGameList[]>({
  key: "gamelistState",
  default: [],
});

export const userDetailState = atom<IUserDetail>({
  key: "userDetailState",
  default: undefined,
});
