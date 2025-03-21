import styled from "styled-components";
import GameList from "../Component/GameList";

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

function Home() {
  return (
    <Grid>
      <GameList />
    </Grid>
  );
}

export default Home;
