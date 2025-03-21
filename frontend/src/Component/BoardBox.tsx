import styled from "styled-components";
import { IGameList } from "../atom";

const Board = styled.div`
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
  height: 200px;
  position: relative;
  overflow: hidden;
  &:first-child,
  &:nth-child(2) {
    padding-bottom: 30px;
    .mark {
      bottom: 0;
    }
  }
  &:nth-child(3),
  &:nth-child(5) {
    padding-right: 30px;
    .mark {
      width: 20px;
      right: 0;
      height: 100%;
      background: rgb(0, 172, 14);
    }
  }
  &:nth-child(4),
  &:nth-child(6) {
    padding-left: 30px;
    .mark {
      width: 20px;
      left: 0;
      height: 100%;
      background: rgb(172, 5, 255);
    }
  }
  &:nth-child(7),
  &:nth-child(8) {
    padding-top: 30px;
    .mark {
      top: 0;
      height: 20px;
      background: rgb(7, 65, 255);
    }
  }
  @media screen and (max-width: 700px) {
    &:first-child,
    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(4),
    &:nth-child(5),
    &:nth-child(6),
    &:nth-child(7),
    &:nth-child(8) {
      width: 50%;
      .mark {
        top: 0;
        bottom: unset;
        right: 0;
        left: 0;
        height: 20px;
        width: 100%;
      }
    }
  }
`;

const Mark = styled.div`
  width: 100%;
  height: 20px;
  background: rgb(255, 62, 19);
  /* background: linear-gradient(
    126deg,
    rgba(255, 133, 105, 1) 0%,
    rgba(235, 121, 27, 1) 46%,
    rgba(255, 51, 51, 1) 100%
  ); */
  position: absolute;
`;

const Title = styled.div`
  font-size: 20px;
`;

const Category = styled.span`
  background-color: teal;
  color: #fff;
`;

const Img = styled.div``;

function BoardBox({ gameId, name, thumbnail, yearPublished }: IGameList) {
  return (
    <Board>
      <Mark className="mark" />
      <Title>{name}</Title>
      <Img>
        <img src={thumbnail} alt="" />
      </Img>
      <Category>{yearPublished}</Category>
    </Board>
  );
}

export default BoardBox;
