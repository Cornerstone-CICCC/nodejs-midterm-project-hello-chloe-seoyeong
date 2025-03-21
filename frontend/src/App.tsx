import Header from "./Component/Header";
import RoutesComp from "./Routes";
import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isLoggedInState, userDetailState } from "./atom";
import { useEffect } from "react";
import { fetchGetUser } from "./fetcher";

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 24px;
`;

function App() {
  const setLoggedIn = useSetRecoilState(isLoggedInState);
  const [userDetail, setUserDetail] = useRecoilState(userDetailState);

  useEffect(() => {
    // (async () => {
    //   const res = await fetch(`http://localhost:3500/user/profile`, {
    //     method: "GET",
    //     credentials: "include",
    //   });
    //   if (!res.ok) {
    //   }
    //   const user = await res.json();
    //   setLoggedIn(user.authCheck);
    //   setUserDetail(user.user);
    // })();
    (async () => {
      const user = await fetchGetUser();
      setLoggedIn(user.authCheck);
      setUserDetail(user.user);
    })();
  }, []);

  console.log(userDetail);

  return (
    <Container>
      <Header />
      <RoutesComp />
    </Container>
  );
}

export default App;
