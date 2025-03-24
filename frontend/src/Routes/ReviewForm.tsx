import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IReviewList, RateEmoji } from "../atom";
import {
  MainWrap,
  FormCard,
  Form,
  LabelWrap,
  Label,
  Input,
  Select,
  Button,
  ErrorMessage,
} from "../assets/styled/StyledForm";

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
          <LabelWrap>
            <Label>
              <span>Boardgame Name</span>
              <Input
                {...register("title", {
                  required: "Boardgame Name is required",
                })}
                type="text"
                name="title"
                placeholder="Write the game name you played."
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
                placeholder="Tell me more, how was it"
              />
            </Label>
            <ErrorMessage>{errors?.detail?.message}</ErrorMessage>
            <Label>
              <span>Category</span>
              <Input
                {...register("category")}
                type="text"
                name="category"
                placeholder="Separate by comma, , , "
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
          </LabelWrap>
          <Button>Add Review</Button>
        </Form>
      </FormCard>
    </MainWrap>
  );
}

export default ReviewForm;
