import { atom } from "recoil";

interface IUserInfo {
  username: string | null;
}

interface IUserDetail {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
}

interface IWishList {
  id: number;
  name: string;
  thumbnail: string;
}

// export interface IGameList {
//   title: string;
//   description: string;
//   category: string;
// }

export interface IGameList {
  gameId: number;
  name: string;
  thumbnail: string;
  yearPublished: number;
}

export interface IReviewList {
  id: string;
  title: string;
  category: string;
}

export const userState = atom<IUserInfo>({
  key: "userState",
  default: undefined,
});

export const wishState = atom<IWishList[]>({
  key: "wishState",
  default: [],
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
  key: "userDtailState",
  default: undefined,
});
