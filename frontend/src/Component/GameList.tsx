import { useEffect, useState } from "react";
import styled from "styled-components";
import BoardBox from "./BoardBox";
import { motion, useAnimationControls } from "motion/react";
import { useRecoilState, useRecoilValue } from "recoil";
import { gamelistState, IGameList, isLoggedInState } from "../atom";
import { Link } from "react-router-dom";
import imageAd from "../assets/images/img-ad.png";
import imageAd2 from "../assets/images/img-ad2.webp";
import { LinkButton, Button } from "../assets/styled/StyledForm";

const BoardBase = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 1);
  display: grid;
  border-top: 2px solid #2d2d2d;
  border-left: 2px solid #2d2d2d;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  color: #000;
  @media screen and (max-width: 900px) {
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
  border-right: 2px solid #2d2d2d;
  border-bottom: 2px solid #2d2d2d;
  width: 100%;
  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const RandomBox = styled(motion.div)`
  width: 80px;
  height: 80px;
  background-color: #275ce2;
  border-radius: 50%;
`;

const BoardCorner = styled.div`
  border-right: 2px solid #2d2d2d;
  border-bottom: 2px solid #2d2d2d;
  min-height: 200px;
  max-height: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const RightTop = styled(BoardCorner)`
  grid-area: 1 / 4 / 2 / 5;
  background-color: rgba(0, 0, 0, 0.3);
  position: relative;
  span {
    padding: 4px 8px;
    border: 2px solid #fff;
    color: #fff;
    font-size: 11px;
    position: absolute;
    right: 10px;
    top: 10px;
  }
  img {
    width: 100%;
  }
  @media screen and (max-width: 900px) {
    width: 30%;
  }
`;
const LeftTop = styled(BoardCorner)`
  grid-area: 1 / 1 / 2 / 2;
  text-align: center;
  @media screen and (max-width: 900px) {
    width: 30%;
  }
`;
const RightBottom = styled(BoardCorner)`
  grid-area: 4 / 4 / 5 / 5;
  flex-direction: column;
  gap: 20px;
  align-items: start;
  padding: 20px;
  @media screen and (max-width: 900px) {
    width: 33.33%;
  }
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;
const LeftBottom = styled(BoardCorner)`
  grid-area: 4 / 1 / 5 / 2;
  background-color: rgba(0, 0, 0, 0.3);
  position: relative;
  span {
    padding: 4px 8px;
    border: 2px solid #fff;
    color: #fff;
    font-size: 11px;
    position: absolute;
    right: 10px;
    top: 10px;
  }
  img {
    width: 100%;
  }
  @media screen and (max-width: 900px) {
    width: 40%;
  }
`;

const CornerInner = styled.div`
  p {
    margin-bottom: 8px;
  }
`;

const Welcome = styled(motion.p)`
  font-family: "Boldonse", system-ui;
  font-size: 36px;
`;

const controlVariants = {
  hidden: {
    opacity: 0,
    y: "200px",
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", delay: 0.1, damping: 3 },
  },
  exit: {
    x: "-100vh",
    transition: { ease: "easeInOut" },
  },
};
function GameList() {
  const controls = useAnimationControls();

  const isLoggedIn = useRecoilValue(isLoggedInState);
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
          {games?.slice(0, 8).map((game) => (
            <BoardBox key={game.gameId} {...game} />
          ))}
          <BoardCenter>
            <Welcome
              variants={controlVariants}
              initial="hidden"
              animate="visible"
            >
              ENJOYED IT?
            </Welcome>
          </BoardCenter>
          <RightBottom>
            {isLoggedIn ? (
              <>
                <CornerInner>
                  <p>What did you play?</p>
                  <LinkButton>
                    <Link to="/review/create">Write Review &rarr;</Link>
                  </LinkButton>
                </CornerInner>
                <CornerInner>
                  <p>Wanna see your reviews?</p>
                  <LinkButton>
                    <Link to="/review">View Revies &rarr;</Link>
                  </LinkButton>
                </CornerInner>
              </>
            ) : (
              <>
                <CornerInner>
                  <p>Not a member yet?</p>
                  <LinkButton>
                    <Link to="/join">Join &rarr;</Link>
                  </LinkButton>
                </CornerInner>
                <CornerInner>
                  <p>Are you a member?</p>
                  <LinkButton>
                    <Link to="/login">Login &rarr;</Link>
                  </LinkButton>
                </CornerInner>
              </>
            )}
          </RightBottom>
          <LeftTop>WELCOME TO BOARDGAME WORLD</LeftTop>
          <RightTop>
            <img src={imageAd} alt="" />
            <span>AD</span>
          </RightTop>
          <LeftBottom>
            <img src={imageAd2} alt="" />
            <span>AD</span>
          </LeftBottom>
        </BoardBase>
      )}
    </>
  );
}

export default GameList;
