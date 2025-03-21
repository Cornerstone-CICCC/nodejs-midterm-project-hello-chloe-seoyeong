import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isLoggedInState, userState } from "../atom";

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

interface ILoginForm {
  username: string;
  password: string;
}

function Login() {
  const setUserState = useSetRecoilState(userState);
  const setLoggedIn = useSetRecoilState(isLoggedInState);

  let navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm<ILoginForm>();
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
        <Label>
          <span>Password</span>
          <Input
            {...register("password", { required: "Password is required." })}
            type="password"
            name="password"
          />
        </Label>
        <Button>Log in</Button>
      </Form>
    </FormCard>
  );
}

export default Login;
