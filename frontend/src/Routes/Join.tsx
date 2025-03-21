import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface IJoinForm {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
}

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

function Register() {
  let navigate = useNavigate();
  const { register, handleSubmit } = useForm<IJoinForm>();
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
        <Label>
          <span>Password</span>
          <Input
            {...register("password", {
              required: "",
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
        <Button>Join</Button>
      </Form>
    </FormCard>
  );
}

export default Register;
