import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isLoggedInState, userDetailState } from "../atom";

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Menus = styled.ul`
  display: flex;
  align-items: center;
`;

const Menu = styled.li`
  font-size: 15px;
  padding: 8px;
`;

function Header() {
  let navigate = useNavigate();
  const [isLoggedIn, setLoggedIn] = useRecoilState(isLoggedInState);
  const setUserDetail = useSetRecoilState(userDetailState);
  const handleLogout = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const res = await fetch("http://localhost:3500/logout", {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) return false;
    setLoggedIn(false);
    setUserDetail({ username: "", firstname: "", lastname: "", password: "" });
    navigate("/");
  };
  return (
    <Nav>
      <Col>
        <Menus>
          <Menu>
            <Link to="/">Home</Link>
          </Menu>
          {isLoggedIn ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <Menu>
                <Link to="/join">Join</Link>
              </Menu>
              <Menu>
                <Link to="/login">Login</Link>
              </Menu>
            </>
          )}
        </Menus>
      </Col>
      <Col>{isLoggedIn && <Link to="/profile">Profile</Link>}</Col>
    </Nav>
  );
}

export default Header;
