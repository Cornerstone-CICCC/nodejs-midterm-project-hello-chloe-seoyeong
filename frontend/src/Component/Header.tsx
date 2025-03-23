import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isLoggedInState, userDetailState } from "../atom";

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  border: 2px solid #2c2d2d;
  margin-bottom: 10px;
`;

const Col = styled.div`
  display: flex;
`;

const Menus = styled.ul`
  display: flex;
`;

const Menu = styled.li`
  font-size: 15px;
  padding: 8px;
  border-right: 2px solid #2c2d2d;
  color: #2c2d2d;
  font-weight: 700;
  font-size: 14px;
  a {
    display: block;
  }
  &:first-child {
    background-color: #fabe3c;
  }
  &:nth-child(2) {
    background-color: #0f64a6;
  }
  &:nth-child(3) {
    background-color: #39a375;
  }
`;

const Button = styled.button`
  border: 0;
  background-color: unset;
  font-weight: 700;
  font-size: 14px;
`;

const LinkBox = styled.div`
  font-size: 14px;
  background-color: rgb(238, 95, 60);
  font-weight: 700;
  padding: 8px;
  border-left: 2px solid #2c2d2d;
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
            <Link to="/">HOME</Link>
          </Menu>
          {isLoggedIn ? (
            <>
              <Menu>
                <Link to="/review">MY REVIEWS</Link>
              </Menu>
              <Menu>
                <Button onClick={handleLogout}>LOGOUT</Button>
              </Menu>
            </>
          ) : (
            <>
              <Menu>
                <Link to="/join">JOIN</Link>
              </Menu>
              <Menu>
                <Link to="/login">LOGIN</Link>
              </Menu>
            </>
          )}
        </Menus>
      </Col>
      <Col>
        {isLoggedIn && (
          <LinkBox>
            <Link to="/profile">PROFILE</Link>
          </LinkBox>
        )}
      </Col>
    </Nav>
  );
}

export default Header;
