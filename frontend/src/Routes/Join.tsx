import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
interface IJoinForm {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
}

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
      <FormCard bgColor="#0F63A6">
        <Form method="POST" onSubmit={handleSubmit(onValid)} bgColor="#F9C03C">
          <LabelWrap>
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
                placeholder="Write a username..."
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
                placeholder="Write a password..."
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
          </LabelWrap>
          <Button buttonColor="#38A274">JOIN</Button>
        </Form>
      </FormCard>
    </MainWrap>
  );
}

export default Register;
