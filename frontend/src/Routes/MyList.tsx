import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { IReviewList, isLoggedInState, reviewsState } from "../atom";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { useForm } from "react-hook-form";
import { Button, LinkButton, ReviewButton } from "../assets/styled/StyledForm";

const Mainwrap = styled.div``;

const Flexwrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const ReviewBox = styled(motion.div)``;

const Card = styled(motion.div)`
  font-family: "Prompt", sans-serif;
  width: 20%;
  height: 190px;
  border: 2px solid #2d2d2d;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  padding: 15px 10px;
  color: #191919;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (max-width: 900px) {
    width: calc(24% - 10px);
  }
  @media screen and (max-width: 700px) {
    width: calc(50% - 10px);
  }
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  text-align: center;
`;
const Emoji = styled(motion.div)`
  font-size: 80px;
  text-align: center;
`;

const SearchForm = styled.div`
  display: flex;
  margin-bottom: 20px;
  form {
    display: flex;
    flex: 1;
    button {
      border-right: 0;
    }
  }
  input {
    border: 2px solid #2d2d2d;
    border-left: 0;
    border-right: 0;
    padding: 8px;
    width: 100%;
  }
  .review-add-button {
    padding: 7px 12px;
    a {
      white-space: nowrap;
    }
  }
  @media screen and (max-width: 700px) {
    flex-direction: column;
    .review-add-button {
      width: 100%;
    }
    form {
      border-left: 2px solid #2d2d2d;
    }
    .search-form-inner {
      margin-top: 10px;
    }
  }
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ReviewButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`;

const DetailCard = styled(motion.div)`
  font-family: "Prompt", sans-serif;
  width: 60%;
  max-width: 400px;
  border: 2px solid #2d2d2d;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  padding: 15px;
  color: #191919;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: rgb(248, 174, 168);
`;

const Detail = styled.div`
  border: 2px solid #2d2d2d;
  background-color: rgb(249, 192, 60);
  padding: 20px;
  text-align: center;
  .review-hashtags {
    margin-top: 16px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
`;

const SearchFormInner = styled.div`
  display: flex;
  width: 100%;
`;

const Hashtag = styled.span`
  display: inline-block;
  padding: 4px;
  border: 2px solid #2d2d2d;
  background-color: rgb(15, 99, 166);
  color: #fff;
`;

interface ISearchForm {
  search: string;
}

function MyList() {
  let navigate = useNavigate();
  const isLoggedIn = useRecoilValue(isLoggedInState);
  if (!isLoggedIn) {
    navigate("/");
  }
  const constraintsRef = useRef<HTMLDivElement>(null);

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

  const deleteReview = async (id: number) => {
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

  const [reviewBoxId, setReviewBoxId] = useState<null | string>(null);
  const [selectedReview, setSelectedReview] = useState<IReviewList | null>(
    null
  );
  const [searchResults, setSearchResults] = useState<IReviewList[] | null>(
    null
  );
  const [isSearching, setIsSearching] = useState(false);
  const [noResult, setNoResult] = useState(false);

  const overlay = {
    hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
    visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
    exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
  };

  const setReviewItem = async (id: null | string) => {
    setReviewBoxId(id);
    const res = await fetch(`http://localhost:3500/review/${id}`, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) {
      return;
    }
    const data = await res.json();
    setSelectedReview(data);
  };

  const { register, handleSubmit, setValue } = useForm<ISearchForm>();

  const onValid = async (data: ISearchForm) => {
    const res = await fetch(
      `http://localhost:3500/review/search?search=${data.search}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    if (!res.ok) {
      setNoResult(true);
      return;
    }

    const json = await res.json();
    setNoResult(false);
    setIsSearching(true);
    setValue("search", "");
    setSearchResults(json);
  };

  const onReset = () => {
    setNoResult(false);
    setIsSearching(false);
    setValue("search", "");
    setSearchResults(null);
  };

  return (
    <Mainwrap ref={constraintsRef}>
      <SearchForm>
        <LinkButton className="review-add-button">
          <Link to="/review/create">LET ME KNOW WHAT YOU PLAYED &rarr;</Link>
        </LinkButton>
        <SearchFormInner className="search-form-inner">
          <form method="GET" onSubmit={handleSubmit(onValid)}>
            <input type="text" {...register("search")} name="search" />
            <Button buttonColor="#EE5D3F">SEARCH</Button>
          </form>
          <Button buttonColor="#F9C03C" onClick={onReset}>
            RESET
          </Button>
        </SearchFormInner>
      </SearchForm>

      <ReviewBox>
        {noResult && <p>No Result</p>}
        <Flexwrap
          style={{ display: isSearching && !noResult ? "flex" : "none" }}
        >
          {searchResults?.map((result) => (
            <Card
              key={result.id}
              whileHover={{ backgroundColor: "rgb(46, 204, 113)" }}
              // drag
              // dragSnapToOrigin={false}
              // dragConstraints={constraintsRef}
              layoutId={result.id + ""}
            >
              <Title>{result.title}</Title>
              <Emoji>
                {result.rate + "" === "0"
                  ? "😆"
                  : result.rate + "" === "1"
                  ? "😁"
                  : result.rate + "" === "2"
                  ? "🙂"
                  : result.rate + "" === "3"
                  ? "😐"
                  : result.rate + "" === "4"
                  ? "😤"
                  : "🤪"}
              </Emoji>
              <ReviewButtonWrap>
                <ReviewButton onClick={() => setReviewItem(result.id + "")}>
                  DETAIL
                </ReviewButton>
                <ReviewButton onClick={() => deleteReview(result.id)}>
                  DELETE
                </ReviewButton>
              </ReviewButtonWrap>
            </Card>
          ))}
        </Flexwrap>
        <Flexwrap
          style={{ display: isSearching && !noResult ? "none" : "flex" }}
        >
          {reviews.map((review) => (
            <Card
              key={review.id}
              whileHover={{ backgroundColor: "rgb(249, 192, 60)" }}
              // drag
              // dragSnapToOrigin={false}
              // dragConstraints={constraintsRef}
              layoutId={review.id + ""}
            >
              <Title>{review.title}</Title>
              <Emoji>
                {review.rate + "" === "0"
                  ? "😆"
                  : review.rate + "" === "1"
                  ? "😁"
                  : review.rate + "" === "2"
                  ? "🙂"
                  : review.rate + "" === "3"
                  ? "😐"
                  : review.rate + "" === "4"
                  ? "😤"
                  : "🤪"}
              </Emoji>
              <ReviewButtonWrap>
                <ReviewButton onClick={() => setReviewItem(review.id + "")}>
                  DETAIL
                </ReviewButton>
                <ReviewButton onClick={() => deleteReview(review.id)}>
                  DELETE
                </ReviewButton>
              </ReviewButtonWrap>
            </Card>
          ))}
        </Flexwrap>
      </ReviewBox>
      <AnimatePresence>
        {reviewBoxId ? (
          <Overlay
            variants={overlay}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setReviewBoxId(null)}
          >
            <DetailCard layoutId={reviewBoxId}>
              {selectedReview !== null ? (
                <Detail>
                  <Title>{selectedReview.title}</Title>
                  <Emoji>
                    {selectedReview.rate + "" === "0"
                      ? "😆"
                      : selectedReview.rate + "" === "1"
                      ? "😁"
                      : selectedReview.rate + "" === "2"
                      ? "🙂"
                      : selectedReview.rate + "" === "3"
                      ? "😐"
                      : selectedReview.rate + "" === "4"
                      ? "😤"
                      : "🤪"}
                  </Emoji>
                  <p>{selectedReview.detail}</p>
                  <div className="review-hashtags">
                    {selectedReview.category.map((tag) => (
                      <Hashtag>{tag}</Hashtag>
                    ))}
                  </div>
                </Detail>
              ) : (
                ""
              )}
            </DetailCard>
          </Overlay>
        ) : null}
      </AnimatePresence>
    </Mainwrap>
  );
}

export default MyList;
