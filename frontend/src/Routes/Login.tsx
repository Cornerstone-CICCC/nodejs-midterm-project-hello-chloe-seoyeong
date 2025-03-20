import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isLoggedInState, userState } from "../atom";

interface ILoginForm {
  username: string;
  password: string;
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

function Login() {
  const setUserState = useSetRecoilState(userState);
  const [isLoggedIn, setLoggedIn] = useRecoilState(isLoggedInState);

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
    <Form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("username", { required: "User name is required." })}
        type="text"
        name="username"
      />
      <input
        {...register("password", { required: "Password is required." })}
        type="password"
        name="password"
      />
      <button>Log in</button>
    </Form>
  );
}

export default Login;
