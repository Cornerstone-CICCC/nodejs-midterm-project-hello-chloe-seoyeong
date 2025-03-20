import styled from "styled-components";
import { IGameList } from "../atom";

const Board = styled.div`
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
  height: 200px;
`;

const Mark = styled.div`
  width: 100%;
  height: 20px;
  background-color: tomato;
`;

const Title = styled.div`
  font-size: 20px;
`;

const Category = styled.span`
  background-color: teal;
  color: #fff;
`;

function BoardBox({ gameId, name, thumbnail, yearPublished }: IGameList) {
  return (
    <Board>
      <Mark />
      <Title>{name}</Title>
      <img src={thumbnail} alt="" />
      <Category>{yearPublished}</Category>
    </Board>
  );
}

export default BoardBox;
