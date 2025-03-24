import Header from "./Component/Header";
import RoutesComp from "./Routes";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { isLoggedInState, userDetailState } from "./atom";
import { useEffect } from "react";
import { fetchGetUser } from "./fetcher";

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 24px;
  @media screen and (max-width: 700px) {
    padding: 16px;
  }
`;
const Main = styled.main`
  /* height: calc(100vh - 110px); */
  width: 100%;
  display: grid;
  @media screen and (max-width: 700px) {
    display: block;
  }
`;
function App() {
  const [isLoggedIn, setLoggedIn] = useRecoilState(isLoggedInState);
  const [userDetail, setUserDetail] = useRecoilState(userDetailState);

  useEffect(() => {
    (async () => {
      const user = await fetchGetUser();
      setLoggedIn(user.authCheck);
      setUserDetail(user.user);
    })();
  }, []);

  return (
    <Container>
      <Header />
      <Main>
        <RoutesComp />
      </Main>
    </Container>
  );
}

export default App;
