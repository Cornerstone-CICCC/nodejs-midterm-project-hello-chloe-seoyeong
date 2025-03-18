import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

const Tabs = styled.ul`
  display: flex;
  align-items: center;
`;
const Tab = styled.li`
  width: 100px;
  padding: 10px;
`;

function Join() {
  return (
    <div>
      <Tabs>
        <Tab>
          <Link to={`/join/signup`}>Signup</Link>
        </Tab>
        <Tab>
          <Link to={`/join/login`}>Login</Link>
        </Tab>
      </Tabs>
      <Outlet />
    </div>
  );
}

export default Join;
