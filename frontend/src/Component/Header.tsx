import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
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
  return (
    <Nav>
      <Col>
        <Menus>
          <Menu>
            <Link to="/">Home</Link>
          </Menu>
          <Menu>
            <Link to="/join">Join</Link>
          </Menu>
        </Menus>
      </Col>
      <Col>
        <button>Search</button>
      </Col>
    </Nav>
  );
}

export default Header;
