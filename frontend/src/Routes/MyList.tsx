import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { isLoggedInState, reviewsState } from "../atom";
import Review from "../Component/Review";
import { Link, useNavigate } from "react-router-dom";

const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const AddBox = styled.div`
  justify-self: center;
`;

function MyList() {
  let navigate = useNavigate();
  const isLoggedIn = useRecoilValue(isLoggedInState);

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
    <FlexWrap>
      <AddBox>
        <Link to="/review/create">Add Review</Link>
      </AddBox>
      {reviews.map((review) => (
        <Review key={review.id} {...review} />
      ))}
    </FlexWrap>
  );
}

export default MyList;
