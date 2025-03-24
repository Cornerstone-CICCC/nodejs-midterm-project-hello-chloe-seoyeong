import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isLoggedInState, userState } from "../atom";
import {
  MainWrap,
  FormCard,
  Form,
  LabelWrap,
  Label,
  Input,
  Button,
  ErrorMessage,
} from "../assets/styled/StyledForm";

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
          <LabelWrap>
            <Label>
              <span>Username</span>
              <Input
                {...register("username", {
                  required: "User name is required.",
                })}
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
          </LabelWrap>
          <Button>LOG IN</Button>
        </Form>
      </FormCard>
    </MainWrap>
  );
}

export default Login;
