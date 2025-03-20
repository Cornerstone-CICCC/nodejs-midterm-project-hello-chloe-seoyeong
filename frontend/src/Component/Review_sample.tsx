import { useEffect, useState } from "react";
import Review from "../Component/Review";
import { useRecoilState } from "recoil";
import { reviewsState } from "../atom";
import styled from "styled-components";
import Board from "../Component/Board";

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Center = styled.div``;

const Row = styled.div``;

function ReviewTmp() {
  const [isEmpty, setEmpty] = useState(true);
  const [reviews, setReviews] = useRecoilState(reviewsState);

  const getReviews = async () => {
    const res = await fetch(`http://localhost:3500/review`, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) {
      return false;
    }
    const data = await res.json();
    setEmpty(false);
    setReviews(data);
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <Grid>
      {!isEmpty ? (
        <>
          {reviews.map((review, index) => (
            <Row className="row">
              <Review key={review.id} {...review} />
            </Row>
          ))}
          <Center>PLAY</Center>
        </>
      ) : (
        <Board />
      )}
    </Grid>
  );
}

export default ReviewTmp;
