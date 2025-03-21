import styled from "styled-components";
import { IReviewList, RateEmoji, reviewsState } from "../atom";
import { useSetRecoilState } from "recoil";

const Card = styled.div`
  width: 200px;
  height: 200px;
  border: 1px solid #000;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  padding: 20px;
  color: #191919;
  @media screen and (max-width: 500px) {
    width: 100px;
  }
`;

const Title = styled.div`
  font-size: 20px;
`;

function Review({ id, title, category, rate, detail }: IReviewList) {
  const setReviews = useSetRecoilState(reviewsState);
  const deleteReview = async () => {
    const res = await fetch(`http://localhost:3500/review/${id}/delete`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) {
      return;
    }
    const data = await res.json();
    setReviews(data);
  };

  return (
    <Card>
      <Title>{title}</Title>
      <span>{category}</span>
      <span>{rate}</span>
      <span>{detail}</span>
      <button onClick={deleteReview}>Delete</button>
    </Card>
  );
}

export default Review;
