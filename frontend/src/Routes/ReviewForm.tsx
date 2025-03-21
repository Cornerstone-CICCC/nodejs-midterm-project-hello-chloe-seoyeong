import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IReviewList, RateEmoji } from "../atom";

const FormCard = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.8);
  border-radius: 30px;
  padding: 30px;
  margin: 20px;
  background-color: #fff;
  max-width: 400px;
  margin: 0 auto;
  color: #191919;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Label = styled.label`
  margin-bottom: 10px;
  span {
    font-size: 12px;
    display: block;
  }
`;

const Input = styled.input`
  font-size: 16px;
  padding: 8px;
  width: 100%;
`;

const Button = styled.button`
  padding: 10px;
  width: 50%;
  font-weight: bold;
  background-color: #007ddd;
  color: #fff;
  border: 0;
`;

function ReviewForm() {
  let navigate = useNavigate();
  const { register, handleSubmit } = useForm<IReviewList>();
  const onSelect = (event: React.FormEvent<HTMLSelectElement>) => {
    console.log(event.currentTarget.value);
  };
  const onValid = async (data: IReviewList) => {
    console.log(data);
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
        <select {...register("rate")} name="rate" onChange={onSelect}>
          <option value={RateEmoji.EXCELLENT}>😆1</option>
          <option value={RateEmoji.GREAT}>😊2</option>
          <option value={RateEmoji.GOOD}>🙂3</option>
          <option value={RateEmoji.NOTBAD}>😐4</option>
          <option value={RateEmoji.WOOOOOOO}>😩5</option>
        </select>
        <Button>Add Review</Button>
      </Form>
    </FormCard>
  );
}

export default ReviewForm;
