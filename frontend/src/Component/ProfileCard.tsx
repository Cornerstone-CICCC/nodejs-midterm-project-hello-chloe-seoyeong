import styled from "styled-components";
import { IUserDetail } from "../atom";

const Card = styled.div`
  border: 2px solid #2d2d2d;
  background-color: rgba(249, 192, 58, 1);
  width: 300px;
  height: 500px;
  padding: 16px;
  margin: 0 auto;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
const CardInner = styled.div`
  border: 2px solid #2d2d2d;
  height: 100%;
  background-color: rgba(15, 101, 167, 1);
  font-family: "Prompt", sans-serif;
  display: flex;
  flex-direction: column;
  padding: 30px;
`;
const InfoBox = styled.div`
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.7);
`;

const InfoTitle = styled.div`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
`;

const InfoValue = styled.div`
  font-size: 20px;
  margin-top: 10px;
  color: #fff;
`;
function ProfileCard({
  username,
  firstname,
  lastname,
}: Omit<IUserDetail, "password">) {
  return (
    <Card>
      <CardInner>
        <InfoBox>
          <InfoTitle>Username</InfoTitle>
          <InfoValue>{username}</InfoValue>
        </InfoBox>
        <InfoBox>
          <InfoTitle>Firstname</InfoTitle>
          <InfoValue>{firstname}</InfoValue>
        </InfoBox>
        <InfoBox>
          <InfoTitle>Lastname</InfoTitle>
          <InfoValue>{lastname}</InfoValue>
        </InfoBox>
        <InfoBox>
          <InfoTitle>Favourite</InfoTitle>
          <InfoValue>{lastname}</InfoValue>
        </InfoBox>
      </CardInner>
    </Card>
  );
}

export default ProfileCard;
