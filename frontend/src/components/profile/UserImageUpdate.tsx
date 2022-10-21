import React, { useState, useEffect } from "react";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import { EditButton } from "@/styles/commonStyle";
import { useForm } from "react-hook-form";
import { imageResize } from "@/util/imageResizeUtil";

interface ProfileImageProp {
  backgroundImg?: string;
}

interface UploadImgType {
  uploadImg: File[];
}

interface UserImageUpdateProps {
  onProfileImageUploadSubmit: ({ uploadImg }: { uploadImg: File[] }) => void;
  curImage?: string;
}

const UserImageUpdate = ({
  onProfileImageUploadSubmit,
  curImage,
}: UserImageUpdateProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UploadImgType>({
    mode: "onChange",
  });
  const [profileimgPreview, setProfileImgPreview] = useState("");
  const profileImg = watch("uploadImg");

  useEffect(() => {
    (async () => {
      if (profileImg && profileImg.length > 0) {
        const file = profileImg[0];
        const copress = await imageResize(file);
        setProfileImgPreview(URL.createObjectURL(copress));
      }
    })();
  }, [profileImg]);
  return (
    <UserImageContainer onSubmit={handleSubmit(onProfileImageUploadSubmit)}>
      <UserImageUploadTitle>Profile upload</UserImageUploadTitle>
      <UserImageInputWrapper>
        <UserImageUploadInput type="file" {...register("uploadImg")} />
      </UserImageInputWrapper>
      <ProfileImageBox
        backgroundImg={profileimgPreview ? profileimgPreview : curImage}
      />
      <EditButton type="submit">CHANGE PROFILE IMAGE</EditButton>
    </UserImageContainer>
  );
};

const UserImageContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
  margin-top: 1rem;
  font-size: ${GlobalTheme.fontSize.default};
`;

const UserImageUploadTitle = styled.h1`
  font-size: ${GlobalTheme.fontSize.big2};
  line-height: 1rem;
  margin-bottom: 3rem;
`;

const UserImageInputWrapper = styled.div`
  height: auto;
  text-align: left;
  margin-bottom: 2rem;
`;

const UserImageUploadInput = styled.input`
  cursor: pointer;
`;

const ProfileImageBox = styled.div<ProfileImageProp>`
  background-image: url(${(props) => props.backgroundImg});
  background-size: cover;
  background-position: center;
  cursor: pointer;
  display: block;
  width: 25rem;
  height: 25rem;

  text-align: center;
  margin-bottom: 3rem;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

export default UserImageUpdate;
