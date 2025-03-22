import styled from "styled-components";
import { IReviewList, reviewsState } from "../atom";
import { useSetRecoilState } from "recoil";
import { motion } from "motion/react";
import { useRef } from "react";

const Card = styled(motion.div)`
  font-family: "Prompt", sans-serif;
  width: 170px;
  height: 200px;
  border: 1px solid #000;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  padding: 20px;
  color: #191919;
  position: relative;
  @media screen and (max-width: 500px) {
    width: 100px;
  }
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
`;
const Emoji = styled(motion.div)`
  font-size: 80px;
  text-align: center;
`;
const Button = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 20px;
  background-color: teal;
  border: 0;
  color: #fff;
  padding: 10px;
`;

function Review({ id, title, category, rate, detail }: IReviewList) {
  // const reviewBoxRef = useRef<HTMLDivElement>(null);
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
    <Card
      whileHover={{ backgroundColor: "rgb(46, 204, 113)" }}
      drag
      dragSnapToOrigin={false}
    >
      <Title>{title}</Title>
      <span>{category}</span>
      <Emoji>
        {rate + "" === "0"
          ? "😆"
          : rate + "" === "1"
          ? "😁"
          : rate + "" === "2"
          ? "🙂"
          : rate + "" === "3"
          ? "😐"
          : rate + "" === "4"
          ? "😤"
          : "🤪"}
      </Emoji>
      <span>{detail}</span>
      <Button onClick={deleteReview}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path
            fill="#ffffff"
            d="M170.5 51.6L151.5 80l145 0-19-28.4c-1.5-2.2-4-3.6-6.7-3.6l-93.7 0c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80 368 80l48 0 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-8 0 0 304c0 44.2-35.8 80-80 80l-224 0c-44.2 0-80-35.8-80-80l0-304-8 0c-13.3 0-24-10.7-24-24S10.7 80 24 80l8 0 48 0 13.8 0 36.7-55.1C140.9 9.4 158.4 0 177.1 0l93.7 0c18.7 0 36.2 9.4 46.6 24.9zM80 128l0 304c0 17.7 14.3 32 32 32l224 0c17.7 0 32-14.3 32-32l0-304L80 128zm80 64l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16z"
          />
        </svg>
      </Button>
    </Card>
  );
}

export default Review;
