import styled from "styled-components";
import GameList from "../Component/GameList";

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function Home() {
  return (
    <Grid>
      <GameList />
    </Grid>
  );
}

export default Home;
