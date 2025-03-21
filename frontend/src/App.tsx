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
`;
const Main = styled.main`
  height: calc(100% - 100px);
  display: grid;
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

  if (!isLoggedIn) {
    // (async () => {
    //   await fetch("http://localhost:3500/logout", {
    //     method: "GET",
    //     credentials: "include",
    //   });
    // })();
  }

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
