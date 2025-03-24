import { useRecoilState, useRecoilValue } from "recoil";
import { isLoggedInState, IUserDetail, userDetailState } from "../atom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ProfileCard from "../Component/ProfileCard";
import {
  MainWrap,
  FormCard,
  Form,
  LabelWrap,
  Label,
  Input,
  Button,
} from "../assets/styled/StyledForm";
import styled from "styled-components";

const ProfileCardWrap = styled.div`
  position: relative;
`;

const EditButton = styled(Button)`
  position: absolute;
  bottom: 40px;
  right: 40px;
`;

function Profile() {
  let navigate = useNavigate();
  const isLoggedIn = useRecoilValue(isLoggedInState);
  if (!isLoggedIn) {
    navigate("/");
  }
  const [isEdit, setEdit] = useState(false);
  const { register, handleSubmit, setValue } = useForm<IUserDetail>();

  const [userDetail, setUserDetail] = useRecoilState(userDetailState);

  const onValid = async (data: IUserDetail) => {
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

  // useEffect(() => {
  //   (async () => {
  //     const user = await fetchGetUser();
  //     setUserDetail(user.user);
  //   })();
  // }, [isLoggedIn]);
  if (userDetail) {
    setValue("username", userDetail.username);
    setValue("password", userDetail.password);
    setValue("firstname", userDetail.firstname);
    setValue("lastname", userDetail.lastname);
  }

  return (
    <MainWrap>
      {isEdit ? (
        <FormCard bgColor="#F88F03">
          <Form method="PUT" onSubmit={handleSubmit(onValid)} bgColor="#38A274">
            <LabelWrap>
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
            </LabelWrap>
            <Button buttonColor="#0F63A6">SAVE</Button>
          </Form>
        </FormCard>
      ) : (
        <ProfileCardWrap>
          <ProfileCard {...userDetail} />
          <EditButton onClick={onEdit}>Edit</EditButton>
        </ProfileCardWrap>
      )}
    </MainWrap>
  );
}

export default Profile;
