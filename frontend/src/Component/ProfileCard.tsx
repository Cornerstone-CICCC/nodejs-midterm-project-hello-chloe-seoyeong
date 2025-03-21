import styled from "styled-components";
import { IUserDetail } from "../atom";
import cardImage from "./../assets/images/img-card1.png";

const Card = styled.div`
  background-color: #fff;
  width: 300px;
  height: 500px;
  padding: 20px;
  margin: 0 auto;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  background: url(${cardImage}) no-repeat;
`;
const CardInner = styled.div`
  border: 1px solid #191919;
  font-family: "Sedgwick Ave";
  display: flex;
  flex-direction: column;
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
