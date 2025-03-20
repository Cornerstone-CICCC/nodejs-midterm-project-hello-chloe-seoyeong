import { useRecoilValue } from "recoil";
import { userDetailState, userState } from "../atom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

interface IProfileForm {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
}

function Profile() {
  let navigate = useNavigate();
  const [isEdit, setEdit] = useState(false);
  const { register, handleSubmit, setValue, formState } =
    useForm<IProfileForm>();
  const userInfo = useRecoilValue(userState);
  const [userDetail, setUserDetail] = useState({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
  });

  const onValid = async (data: IProfileForm) => {
    const res = await fetch("http://localhost:3500/user/profile/edit", {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        body: JSON.stringify(data),
      },
    });
    if (!res.ok) {
      return;
    }
    navigate("/profile");
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
      const res = await fetch(`http://localhost:3500/user/profile`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        navigate("/");
      }
      const data = await res.json();
      setUserDetail({
        username: data.username,
        password: data.password,
        firstname: data.firstname,
        lastname: data.lastname,
      });
    })();
  }, []);

  if (userDetail) {
    setValue("username", userDetail.username);
    setValue("firstname", userDetail.firstname);
    setValue("lastname", userDetail.lastname);
  }

  return (
    <Form method="PUT" onSubmit={handleSubmit(onValid)}>
      <input
        {...register("username", {})}
        type="text"
        name="username"
        readOnly={isEdit ? false : true}
      />
      <input
        {...register("password", {})}
        type="password"
        name="password"
        readOnly={isEdit ? false : true}
      />
      <input
        {...register("firstname", {})}
        type="text"
        name="firstname"
        readOnly={isEdit ? false : true}
      />
      <input
        {...register("lastname", {})}
        type="text"
        name="lastname"
        readOnly={isEdit ? false : true}
      />
      <button onClick={onEdit}>{isEdit ? "Save" : "Edit"}</button>
    </Form>
  );
}

export default Profile;
