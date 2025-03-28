import { Request, Response } from "express";
import { IBoardGame } from "../types/game";

// In-memory Games
const boardGameList: IBoardGame[] = [
  {
    gameId: 414317,
    name: "Harmonies",
    thumbnail:
      "https://cf.geekdo-images.com/A_XP2_VN3ugyqPhezowB_w__thumb/img/ln5eKAzhse2PIHvWn7bu-jiW_uk=/fit-in/200x150/filters:strip_icc()/pic8026369.png",
    yearPublished: 2024,
  },
  {
    gameId: 373106,
    name: "Sky Team",
    thumbnail:
      "https://cf.geekdo-images.com/uXMeQzNenHb3zK7Hoa6b2w__thumb/img/WyPClajMWU9lV5BdCXiZnqdZgmU=/fit-in/200x150/filters:strip_icc()/pic7398904.jpg",
    yearPublished: 2023,
  },
  {
    gameId: 266192,
    name: "Wingspan",
    thumbnail:
      "https://cf.geekdo-images.com/yLZJCVLlIx4c7eJEWUNJ7w__thumb/img/VNToqgS2-pOGU6MuvIkMPKn_y-s=/fit-in/200x150/filters:strip_icc()/pic4458123.jpg",
    yearPublished: 2019,
  },
  {
    gameId: 431038,
    name: "Azul Duel",
    thumbnail:
      "https://cf.geekdo-images.com/wcYNm1g5mtv6LNZGok_PZw__thumb/img/gd_iP6kVCEuJQIPDtK3nMkb_yns=/fit-in/200x150/filters:strip_icc()/pic8491761.png",
    yearPublished: 2025,
  },
  {
    gameId: 295947,
    name: "Cascadia",
    thumbnail:
      "https://cf.geekdo-images.com/MjeJZfulbsM1DSV3DrGJYA__thumb/img/tVSFjSxYEcw7sKj3unIIQV8kxoc=/fit-in/200x150/filters:strip_icc()/pic5100691.jpg",
    yearPublished: 2021,
  },
  {
    gameId: 822,
    name: "carcassonne",
    thumbnail:
      "https://cf.geekdo-images.com/okM0dq_bEXnbyQTOvHfwRA__itemrep/img/_GLRhUoVx6Zp4kTE0rv_gi9cyOQ=/fit-in/246x300/filters:strip_icc()/pic6544250.png",
    yearPublished: 2000,
  },
  {
    gameId: 148228,
    name: "splendor",
    thumbnail:
      "https://cf.geekdo-images.com/vNFe4JkhKAERzi4T0Ntwpw__itemrep/img/OoBoVLPl4ZYiNioNIKlV_0HLEYQ=/fit-in/246x300/filters:strip_icc()/pic8234167.png",
    yearPublished: 2014,
  },
  {
    gameId: 377061,
    name: "coffee rush",
    thumbnail:
      "https://cf.geekdo-images.com/LdK5ItPPwIHKUITxh3vqxA__itemrep/img/ylYZHJVoRMcBbSwpEQq4uYOMxHA=/fit-in/246x300/filters:strip_icc()/pic7275386.jpg",
    yearPublished: 2023,
  },
];

const getInMemoryGame = (req: Request, res: Response) => {
  const data = boardGameList;
  res.status(200).json(data);
};

/**
 * Get all games list
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Return games list
 */
const getGameList = async (req: Request, res: Response) => {
  try {
    const data = await fetch("https://bgg-json.azurewebsites.net/hot");
    if (!data) {
      console.log("hrer");
    }
    const json = await data.json();
    res.status(200).json(json);
    return json;
  } catch (err) {
    console.log(err);
  }
};

export default {
  getInMemoryGame,
  getGameList,
};
