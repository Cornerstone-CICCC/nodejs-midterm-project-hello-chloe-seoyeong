import { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { reviewsState } from "../atom";
import Review from "../Component/Review";

const Grid = styled.div`
  display: flex;
`;

const AddBox = styled.div`
  justify-self: center;
`;

const Button = styled.button`
  padding: 20px;
`;

function MyList() {
  const [reviews, setReviews] = useRecoilState(reviewsState);
  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:3500/review`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        return false;
      }
      const data = await res.json();
      setReviews(data);
    })();
  }, []);
  return (
    <Grid>
      <AddBox>
        <Button>Add Review</Button>
      </AddBox>
      {reviews.map((review) => (
        <Review key={review.id} {...review} />
      ))}
    </Grid>
  );
}

export default MyList;
