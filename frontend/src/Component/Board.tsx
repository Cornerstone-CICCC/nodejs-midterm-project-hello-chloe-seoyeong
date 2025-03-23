import styled from "styled-components";
import { motion, Variants } from "motion/react";
import { useEffect } from "react";
import BoardBox from "./BoardBox";
import { useRecoilState } from "recoil";
import { gamelistState } from "../atom";

const BoardBase = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 1);
  display: grid;
  border-top: 2px solid #2c2d2d;
  border-left: 2px solid #2c2d2d;
  grid-template-columns: repeat(4, 1fr);
  color: #000;
`;

const BoardCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  grid-area: 2 / 2 / 4 / 4;
  border-right: 2px solid #2c2d2d;
  border-bottom: 2px solid #2c2d2d;
`;

const RandomBox = styled(motion.div)`
  width: 80px;
  height: 80px;
  background-color: #275ce2;
  border-radius: 50%;
`;

const BoardBoxVariante: Variants = {
  start: { opacity: 0 },
  end: {
    opacity: 1,
    transition: {
      type: "spring",
      duration: 0.5,
      bounce: 0.5,
      delayChildren: 2, // 자식들의 애니메이션 시작 늦추기
      staggerChildren: 0.2, // 자식들이 여러개면 순서대로 딜레이
    },
  },
};
function Board() {
  const onSuffleGame = () => {};

  const [games, setGames] = useRecoilState(gamelistState);

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:3500/gamelist`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        return false;
      }
      const data = await res.json();
      setGames(data);
    })();
  }, []);

  return (
    <BoardBase variants={BoardBoxVariante} initial="start" animate="end">
      {games?.map((game, index) => (
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
  );
}

export default Board;
