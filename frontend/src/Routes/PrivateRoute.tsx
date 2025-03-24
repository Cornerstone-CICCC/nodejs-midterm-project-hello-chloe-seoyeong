import { useRecoilState } from "recoil";
import { isLoggedInState, userDetailState } from "../atom";
import { useEffect } from "react";
import { fetchGetUser } from "../fetcher";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const [isLoggedIn, setLoggedIn] = useRecoilState(isLoggedInState);
  const [userDetail, setUserDetail] = useRecoilState(userDetailState);
  useEffect(() => {
    (async () => {
      const user = await fetchGetUser();
      setLoggedIn(user.authCheck);
      setUserDetail(user.user);
    })();

    if (!isLoggedIn) {
      setLoggedIn(false);
      setUserDetail({
        username: "",
        firstname: "",
        lastname: "",
        password: "",
      });
      <Navigate to="/" />;
    }
  }, [isLoggedIn]);

  return <Outlet />;
}

export default PrivateRoute;
