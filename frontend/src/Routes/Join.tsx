import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface IJoinForm {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
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
    <Form method="POST" onSubmit={handleSubmit(onValid)}>
      <input
        {...register("username", {
          required: "Username is required",
          minLength: { value: 3, message: "Username need to be more than 3." },
        })}
        type="text"
        name="username"
        placeholder="Write a username more than 3 characters."
      />
      <input
        {...register("password", {
          required: "",
          minLength: { value: 8, message: "Password need to be more than 8" },
        })}
        type="password"
        name="password"
        placeholder="Write a password more than 8 characters and numbers"
      />
      <input
        {...register("firstname", {
          required: "Firstname is required",
        })}
        type="text"
        name="firstname"
        placeholder="Write a firstname"
      />
      <input
        {...register("lastname", {
          required: "Lastname is required",
        })}
        type="text"
        name="lastname"
        placeholder="Write a lastname"
      />
      <button>Join</button>
    </Form>
  );
}

export default Register;
