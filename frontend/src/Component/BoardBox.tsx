import styled from "styled-components";
import { IGameList } from "../atom";
import { motion } from "motion/react";

const Board = styled(motion.div)`
  border-right: 2px solid #2d2d2d;
  border-bottom: 2px solid #2d2d2d;
  min-height: 200px;
  max-height: 220px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  &:first-child,
  &:nth-child(2) {
    padding-bottom: 20px;
    .mark {
      bottom: 0;
      border-top: 2px solid #2d2d2d;
    }
  }
  &:nth-child(3),
  &:nth-child(5) {
    padding-right: 20px;
    .mark {
      width: 20px;
      right: 0;
      height: 100%;
      background: rgb(54, 163, 119);
      border-left: 2px solid #2d2d2d;
    }
  }
  &:nth-child(4),
  &:nth-child(6) {
    padding-left: 20px;
    .mark {
      width: 20px;
      left: 0;
      height: 100%;
      background: rgb(15, 100, 166);
      padding-right: 2px solid #2d2d2d;
    }
  }
  &:nth-child(7),
  &:nth-child(8) {
    padding-top: 20px;
    .mark {
      top: 0;
      height: 20px;
      background: rgb(248, 143, 3);
      border-bottom: 2px solid #2d2d2d;
    }
  }
  @media screen and (max-width: 900px) {
    &:first-child,
    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(4),
    &:nth-child(5),
    &:nth-child(6),
    &:nth-child(7),
    &:nth-child(8) {
      width: 33.33%;
      padding: 0;
      padding-top: 20px;

      .mark {
        top: 0;
        bottom: unset;
        right: 0;
        left: 0;
        height: 20px;
        width: 100%;
        border-bottom: 2px solid #2d2d2d;
        /* display: none; */
      }
    }
    &:first-child,
    &:nth-child(2) {
      .mark {
        border-top: 0;
      }
    }
    &:nth-child(3),
    &:nth-child(4) {
      .mark {
        border-left: 0;
      }
    }
  }
  @media screen and (max-width: 600px) {
    &:first-child,
    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(4),
    &:nth-child(5),
    &:nth-child(6),
    &:nth-child(7),
    &:nth-child(8) {
      width: 50%;
    }
    &:first-child,
    &:nth-child(2) {
      .mark {
        border-top: 0;
      }
    }
  }
`;

const Mark = styled.div`
  width: 100%;
  height: 20px;
  background: rgb(238, 95, 60);
  /* background: linear-gradient(
    126deg,
    rgba(255, 133, 105, 1) 0%,
    rgba(235, 121, 27, 1) 46%,
    rgba(255, 51, 51, 1) 100%
  ); */
  position: absolute;
`;

const Title = styled.div`
  font-size: 24px;
  color: #2d2d2d;
  font-weight: 600;
  /* font-family: "Noto Serif Display", serif; */
  font-family: "Prompt", sans-serif;
  text-transform: uppercase;
  text-overflow: ellipsis;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-align: center;
  padding: 0 10px;
`;

const Year = styled.span`
  background-color: teal;
  color: #fff;
`;

const ALink = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Img = styled.div`
  width: 100px;
  img {
    width: 100%;
  }
  /* background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0; */
`;

function BoardBox({ gameId, name, thumbnail, yearPublished }: IGameList) {
  return (
    <Board
      initial={{ opacity: 0.5 }} // 초기값
      animate={{ opacity: 1 }}
      transition={{ type: "spring" }}
      whileHover={{ backgroundColor: "rgb(248, 174, 168)" }}
    >
      <Mark className="mark" />
      <ALink
        href={`https://boardgamegeek.com/boardgame/${gameId}`}
        target="_blank"
      >
        <Title>{name}</Title>
        <Img>
          <img src={thumbnail} alt="" />
        </Img>
        {/* <Year>{yearPublished}</Year> */}
      </ALink>
    </Board>
  );
}

export default BoardBox;
