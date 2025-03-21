import { useEffect, useState } from "react";
import styled from "styled-components";
import BoardBox from "./BoardBox";
import { motion } from "motion/react";
import { useRecoilState, useRecoilValue } from "recoil";
import { gamelistState, IGameList, isLoggedInState } from "../atom";
import { Link, useNavigate } from "react-router-dom";

const BoardBase = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 1);
  display: grid;
  border-top: 1px solid #000;
  border-left: 1px solid #000;
  grid-template-columns: repeat(4, 1fr);
  color: #000;
  @media screen and (max-width: 700px) {
    display: flex;
    flex-wrap: wrap;
  }
`;

const BoardCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  grid-area: 2 / 2 / 4 / 4;
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
  width: 100%;
`;

const RandomBox = styled(motion.div)`
  width: 80px;
  height: 80px;
  background-color: #275ce2;
  border-radius: 50%;
`;

const BoardCorner = styled.div`
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RightTop = styled(BoardCorner)`
  grid-area: 1 / 4 / 2 / 5;
  @media screen and (max-width: 700px) {
    width: 30%;
  }
`;
const LeftTop = styled(BoardCorner)`
  grid-area: 1 / 1 / 2 / 2;
  @media screen and (max-width: 700px) {
    width: 30%;
  }
`;
const RightBottom = styled(BoardCorner)`
  grid-area: 4 / 4 / 5 / 5;
  @media screen and (max-width: 700px) {
    width: 100%;
  }
`;
const LeftBottom = styled(BoardCorner)`
  grid-area: 4 / 1 / 5 / 2;
  @media screen and (max-width: 700px) {
    width: 40%;
  }
`;
function GameList() {
  const isLoggedIn = useRecoilValue(isLoggedInState);

  const onSuffleGame = () => {};

  const [games, setGames] = useRecoilState<IGameList[]>(gamelistState);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const gamesList = await (
        await fetch("http://localhost:3500/gamelist", {
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
          {games?.slice(0, 8).map((game) => (
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
          <RightBottom>
            {isLoggedIn ? (
              <>
                <div>
                  <p>What did you play?</p>
                  <Link to="/review/create">Write Review &rarr;</Link>
                </div>
                <div>
                  <p>Wanna see your reviews?</p>
                  <Link to="/review">View Revies &rarr;</Link>
                </div>
              </>
            ) : (
              <>
                <div>
                  <p>Not a member yet?</p>
                  <Link to="/join">Join &rarr;</Link>
                </div>
                <div>
                  <p>Are you a member?</p>
                  <Link to="/login">Login &rarr;</Link>
                </div>
              </>
            )}
          </RightBottom>
          <LeftTop>GREETING</LeftTop>
          <RightTop>AD</RightTop>
          <LeftBottom>Reccommand</LeftBottom>
        </BoardBase>
      )}
    </>
  );
}

export default GameList;
