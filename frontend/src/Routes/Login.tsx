import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isLoggedInState, userState } from "../atom";

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

interface ILoginForm {
  username: string;
  password: string;
}

function Login() {
  const setUserState = useSetRecoilState(userState);
  const setLoggedIn = useSetRecoilState(isLoggedInState);

  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<ILoginForm>();
  const onValid = async (data: ILoginForm) => {
    const res = await fetch("http://localhost:3500/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      setValue("username", "");
      setValue("password", "");
      navigate("/login");
      return;
    }
    const username = data.username;
    setUserState({ username });
    setLoggedIn(true);
    navigate("/");
  };
  return (
    <MainWrap>
      <FormCard>
        <Form onSubmit={handleSubmit(onValid)}>
          <Label>
            <span>Username</span>
            <Input
              {...register("username", { required: "User name is required." })}
              type="text"
              name="username"
            />
          </Label>
          <ErrorMessage>{errors?.username?.message}</ErrorMessage>
          <Label>
            <span>Password</span>
            <Input
              {...register("password", {
                required: "Password is required.",
                minLength: {
                  value: 5,
                  message: "Your password is too short.",
                },
              })}
              type="password"
              name="password"
            />
          </Label>
          <ErrorMessage>{errors?.password?.message}</ErrorMessage>
          <Button>Log in</Button>
        </Form>
      </FormCard>
    </MainWrap>
  );
}

export default Login;
