import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface IJoinForm {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
}

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

const Button = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-weight: bold;
  background-color: #007ddd;
  color: #fff;
  border: 0;
  place-self: end;
`;

const ErrorMessage = styled.p`
  font-size: 13px;
  color: tomato;
  height: 16px;
`;

function Register() {
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IJoinForm>();

  const onValid = async (data: IJoinForm) => {
    console.log(data);
    const res = await fetch("http://localhost:3500/join", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      navigate("/join");
      return;
    }
    navigate("/login");
  };
  return (
    <MainWrap>
      <FormCard>
        <Form method="POST" onSubmit={handleSubmit(onValid)}>
          <Label>
            <span>Username</span>
            <Input
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username need to be more than 3.",
                },
              })}
              type="text"
              name="username"
              placeholder="Write a username more than 3 characters."
            />
          </Label>
          <ErrorMessage>{errors?.username?.message}</ErrorMessage>
          <Label>
            <span>Password</span>
            <Input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password need to be more than 8",
                },
              })}
              type="password"
              name="password"
              placeholder="Write a password more than 8 characters and numbers"
            />
          </Label>
          <ErrorMessage>{errors?.password?.message}</ErrorMessage>
          <Label>
            <span>First name</span>
            <Input
              {...register("firstname", {
                required: "Firstname is required",
              })}
              type="text"
              name="firstname"
              placeholder="Write a firstname"
            />
          </Label>
          <ErrorMessage>{errors?.firstname?.message}</ErrorMessage>
          <Label>
            <span>Lastname</span>
            <Input
              {...register("lastname", {
                required: "Lastname is required",
              })}
              type="text"
              name="lastname"
              placeholder="Write a lastname"
            />
          </Label>
          <ErrorMessage>{errors?.lastname?.message}</ErrorMessage>
          <Button>Join</Button>
        </Form>
      </FormCard>
    </MainWrap>
  );
}

export default Register;
