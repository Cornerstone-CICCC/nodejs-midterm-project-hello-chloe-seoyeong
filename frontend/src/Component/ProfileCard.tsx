import styled from "styled-components";
import { IUserDetail } from "../atom";

const Card = styled.div`
  border: 2px solid #2c2d2d;
  background-color: rgba(249, 192, 58, 1);
  width: 300px;
  height: 500px;
  padding: 16px;
  margin: 0 auto;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
const CardInner = styled.div`
  border: 2px solid #2c2d2d;
  height: 100%;
  background-color: rgba(15, 101, 167, 1);
  font-family: "Prompt", sans-serif;
  display: flex;
  flex-direction: column;
  padding: 30px;
`;
const Info = styled.p`
  font-size: 20px;
  color: #fff;
  margin-top: 16px;
`;

function ProfileCard({
  username,
  firstname,
  lastname,
}: Omit<IUserDetail, "password">) {
  return (
    <Card>
      <CardInner>
        <Info>{username}</Info>
        <Info>{firstname}</Info>
        <Info>{lastname}</Info>
      </CardInner>
    </Card>
  );
}

export default ProfileCard;
