import { useEffect, useState } from "react";
import styled from "styled-components";
import BoardBox from "./BoardBox";
import { motion, useAnimationControls } from "motion/react";
import { useRecoilState, useRecoilValue } from "recoil";
import { gamelistState, IGameList, isLoggedInState } from "../atom";
import { Link } from "react-router-dom";
import imageAd from "../assets/images/img-ad.png";

const BoardBase = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 1);
  display: grid;
  border-top: 2px solid #2c2d2d;
  border-left: 2px solid #2c2d2d;
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
  border-right: 2px solid #2c2d2d;
  border-bottom: 2px solid #2c2d2d;
  width: 100%;
`;

const RandomBox = styled(motion.div)`
  width: 80px;
  height: 80px;
  background-color: #275ce2;
  border-radius: 50%;
`;

const BoardCorner = styled.div`
  border-right: 2px solid #2c2d2d;
  border-bottom: 2px solid #2c2d2d;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  /* object-fit: contain;
  width: 100%;
  img {
    width: 100%;
  } */
`;

const RightTop = styled(BoardCorner)`
  grid-area: 1 / 4 / 2 / 5;
  /* background-color: rgba(0, 0, 0, 0.3);
  position: relative;
  span {
    padding: 4px 8px;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    font-size: 11px;
    border-radius: 8px;
    position: absolute;
    right: 10px;
    top: 10px;
  } */
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
  flex-direction: column;
  gap: 20px;
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

const controlVariants = {
  hidden: {
    opacity: 0,
    x: "100vw",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", delay: 0.1 },
  },
  exit: {
    x: "-100vh",
    transition: { ease: "easeInOut" },
  },
};
function GameList() {
  const isLoggedIn = useRecoilValue(isLoggedInState);

  const onSuffleGame = () => {};
  const controls = useAnimationControls();

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
              variants={controlVariants}
              initial="hidden"
              animate={controls}
              exit="exit"
            />
            <button onClick={() => controls.start("visible")}>
              Pick A Game
            </button>
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
          <RightTop>
            <img src={imageAd} alt="" />
            <span>AD</span>
          </RightTop>
          <LeftBottom>Reccommand</LeftBottom>
        </BoardBase>
      )}
    </>
  );
}

export default GameList;
