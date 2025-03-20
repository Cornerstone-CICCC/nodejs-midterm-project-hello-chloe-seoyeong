import styled from "styled-components";
import { IBoardGame } from "../types/boardgame";
import { useRecoilState } from "recoil";
import { wishState } from "../atom";
const Card = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 0.7);
`;

const Img = styled.img`
  width: auto;
  height: 80px;
`;

function Game({ gameId, name, thumbnail, yearPublished }: IBoardGame) {
  const [wishList, setWishList] = useRecoilState(wishState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setWishList((prev) => [{ id: gameId, name, thumbnail }, ...prev]);
  };
  return (
    <Card>
      <span>{name}</span>
      <Img src={thumbnail} />
      <span>{yearPublished}</span>
      <button onClick={onClick}>Wish</button>
    </Card>
  );
}

export default Game;
