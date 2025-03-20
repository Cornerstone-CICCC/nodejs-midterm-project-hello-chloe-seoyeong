import { Request, Response } from "express";

interface IBoardGameList {
  title: string;
  description: string;
  category: string;
}

const boardGameList: IBoardGameList[] = [
  { title: "Azul", description: "blahdlkfajsdlkf", category: "party" },
  { title: "Dixic", description: "blahdlkfajsdlkf", category: "family" },
  { title: "Splender", description: "blahdlkfajsdlkf", category: "quiz" },
];

const getInMemoryGame = (req: Request, res: Response) => {
  const data = boardGameList;
  res.status(200).json(data);
};

const getGameList = async (req: Request, res: Response) => {
  const data = await fetch("https://bgg-json.azurewebsites.net/hot");
  const json = await data.json();
  res.status(200).json(json);
  return json;
};

export default {
  getInMemoryGame,
  getGameList,
};
