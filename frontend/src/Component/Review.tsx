import styled from "styled-components";
import { IReviewList } from "../atom";

const Card = styled.div`
  width: 200px;
  height: 200px;
  border: 1px solid #000;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  padding: 20px;
  color: #191919;
`;

function Review({ id, title, category }: IReviewList) {
  return (
    <Card>
      <span>{title}</span>
      <span>{category}</span>
      <span>{id}</span>
    </Card>
  );
}

export default Review;
