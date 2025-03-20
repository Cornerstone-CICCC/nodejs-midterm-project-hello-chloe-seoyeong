import { useEffect, useState } from "react";
import styled from "styled-components";
import BoardBox from "./BoardBox";
import { motion } from "motion/react";
import { useRecoilState } from "recoil";
import { gamelistState, IGameList } from "../atom";

const BoardBase = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 1);
  display: grid;
  border-top: 1px solid #000;
  border-left: 1px solid #000;
  grid-template-columns: repeat(4, 1fr);
  color: #000;
`;

const BoardCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  grid-area: 2 / 2 / 4 / 4;
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
`;

const RandomBox = styled(motion.div)`
  width: 80px;
  height: 80px;
  background-color: #275ce2;
  border-radius: 50%;
`;

function GameList() {
  const onSuffleGame = () => {};

  const [games, setGames] = useRecoilState<IGameList[]>(gamelistState);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const gamesList = await (
        await fetch("http://localhost:3500/", {
          method: "GET",
          credentials: "include",
        })
      ).json();
      setGames(gamesList);
      setLoading(false);
    })();
  }, []);

  return (
    <>
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <BoardBase>
          {/* {games.map((game) => (
            <Game key={game.gameId} {...game}></Game>
          ))} */}
          {games?.slice(0, 11).map((game) => (
            <BoardBox key={game.gameId} {...game} />
          ))}
          <BoardCenter>
            <p>Play?</p>
            <RandomBox
              animate={{
                scale: [1, 2, 2, 1, 1],
                rotate: [0, 0, 180, 180, 0],
                borderRadius: ["0%", "0%", "50%", "50%", "0%"],
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                times: [0, 0.2, 0.5, 0.8, 1],
                repeatDelay: 1,
              }}
            />
            <button onClick={onSuffleGame}>Pick A Game</button>
          </BoardCenter>
        </BoardBase>
      )}
    </>
  );
}

export default GameList;
