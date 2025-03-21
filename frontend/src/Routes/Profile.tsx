import { useRecoilState, useRecoilValue } from "recoil";
import { isLoggedInState, userDetailState } from "../atom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { fetchGetUser } from "../fetcher";

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
interface IProfileForm {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
}

function Profile() {
  let navigate = useNavigate();
  const isLoggedIn = useRecoilValue(isLoggedInState);
  if (!isLoggedIn) {
    navigate("/");
  }
  const [isEdit, setEdit] = useState(false);
  const { register, handleSubmit, setValue, formState } =
    useForm<IProfileForm>();

  const [userDetail, setUserDetail] = useRecoilState(userDetailState);

  const onValid = async (data: IProfileForm) => {
    if (!isEdit) {
      return false;
    }
    const res = await fetch("http://localhost:3500/user/profile/edit", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    console.log(data);
    if (!res.ok) {
      console.log("oooo");
      return;
    }
    setUserDetail(data);
    navigate("/");
  };

  const onEdit = () => {
    if (!isEdit) {
      setEdit(true);
    } else {
      // edit profile fetch
    }
  };

  useEffect(() => {
    (async () => {
      const user = await fetchGetUser();
      setUserDetail(user.user);
    })();
  }, [isLoggedIn]);
  if (userDetail) {
    setValue("username", userDetail.username);
    setValue("firstname", userDetail.firstname);
    setValue("lastname", userDetail.lastname);
  }

  return (
    <FormCard>
      {isEdit ? (
        <Form method="PUT" onSubmit={handleSubmit(onValid)}>
          <Label>
            <span>Username</span>
            <Input
              {...register("username", {})}
              type="text"
              name="username"
              readOnly
            />
          </Label>
          <Label>
            <span>Password</span>
            <Input
              {...register("password", {})}
              type="password"
              name="password"
              readOnly={isEdit ? false : true}
            />
          </Label>
          <Label>
            <span>First name</span>
            <Input
              {...register("firstname", {})}
              type="text"
              name="firstname"
              readOnly={isEdit ? false : true}
            />
          </Label>
          <Label>
            <span>Second name</span>
            <Input
              {...register("lastname", {})}
              type="text"
              name="lastname"
              readOnly={isEdit ? false : true}
            />
          </Label>
          <Button>Save</Button>
        </Form>
      ) : (
        <div>
          <Button onClick={onEdit}>Edit</Button>
        </div>
      )}
    </FormCard>
  );
}

export default Profile;
