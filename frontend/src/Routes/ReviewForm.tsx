import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IReviewList, RateEmoji } from "../atom";
import { error } from "console";

const MainWrap = styled.div`
  display: grid;
  place-items: center;
  height: calc(100vh - 100px);
`;
const FormCard = styled.div`
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  border-radius: 30px;
  padding: 10px;
  background-color: #fff;
  max-width: 400px;
  margin: 0 auto;
  margin-top: -100px;
  color: #191919;
  font-family: "Prompt", "sans-serif";
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  border-radius: 30px;
  border: 1px solid rgba(0, 0, 0, 0.6);
  padding: 30px 20px;
`;

const Label = styled.label`
  margin-bottom: 6px;
  margin-top: 16px;
  span {
    font-size: 12px;
    display: block;
  }
`;

const Input = styled.input`
  font-size: 16px;
  padding: 8px 8px 8px 0;
  width: 220px;
  border: 0;
  border-bottom: 1px solid #000;
  margin-top: 8px;
  font-family: "Prompt", "sans-serif";
`;

const Select = styled.select`
  margin-top: 8px;
  width: 100%;
  padding: 8px;
  border-radius: 8px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  background-image: linear-gradient(45deg, transparent 50%, gray 50%),
    linear-gradient(135deg, gray 50%, transparent 50%),
    linear-gradient(to right, #ccc, #ccc);
  background-position: calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px), calc(100% - 2.5em) 0.5em;
  background-size: 5px 5px, 5px 5px, 1px 1.5em;
  background-repeat: no-repeat;
`;

const Button = styled.button`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  font-weight: bold;
  background-color: #007ddd;
  color: #fff;
  border: 0;
  place-self: end;
  margin-top: 20px;
`;
const ErrorMessage = styled.p`
  font-size: 13px;
  color: tomato;
  height: 16px;
`;

function ReviewForm() {
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IReviewList>();
  const onSelect = (event: React.FormEvent<HTMLSelectElement>) => {
    console.log(event.currentTarget.value);
  };
  const onValid = async (data: IReviewList) => {
    const res = await fetch("http://localhost:3500/review/create", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      navigate("/");
      return;
    }
    navigate("/review");
  };
  return (
    <MainWrap>
      <FormCard>
        <Form method="POST" onSubmit={handleSubmit(onValid)}>
          <Label>
            <span>Boardgame Name</span>
            <Input
              {...register("title", {
                required: "Boardgame Name is required",
              })}
              type="text"
              name="title"
              placeholder="Write a username more than 3 characters."
            />
          </Label>
          <ErrorMessage>{errors?.title?.message}</ErrorMessage>
          <Label>
            <span>Detail</span>
            <Input
              {...register("detail", {
                required: "",
              })}
              type="text"
              name="detail"
              placeholder="Write a password more than 8 characters and numbers"
            />
          </Label>
          <ErrorMessage>{errors?.detail?.message}</ErrorMessage>
          <Label>
            <span>Category</span>
            <Input
              {...register("category", {
                required: "Firstname is required",
              })}
              type="text"
              name="category"
              placeholder="Write a firstname"
            />
          </Label>
          <ErrorMessage>{errors?.category?.message}</ErrorMessage>
          <Label>
            <span>Rate</span>
            <Select
              {...register("rate", { required: "How was it?" })}
              name="rate"
              onChange={onSelect}
            >
              <option>How was it the game?</option>
              <option value={RateEmoji.EXCELLENT}>😆 Excellent</option>
              <option value={RateEmoji.GREAT}>😊 Great</option>
              <option value={RateEmoji.GOOD}>🙂 Good</option>
              <option value={RateEmoji.NOTBAD}>😐 Not Bad</option>
              <option value={RateEmoji.WOOOOOOO}>😩 Never!</option>
            </Select>
          </Label>
          <ErrorMessage>{errors?.rate?.message}</ErrorMessage>
          <Button>Add Review</Button>
        </Form>
      </FormCard>
    </MainWrap>
  );
}

export default ReviewForm;
