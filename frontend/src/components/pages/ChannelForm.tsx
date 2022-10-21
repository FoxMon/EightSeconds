import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import ChannelFormCard from "@/components/recruitingChannel/ChannelFormCard";
import BaseChannelComponent from "@/components/hoc/BaseChannelComponent";
import { createChannelRequest } from "@/api/channelFetcher";
import { imageResize } from "@/util/imageResizeUtil";
import { channelListData } from "@/components/recruitingChannel/channelListData";
import { sidebarChannelsState } from "@/recoil/atoms/channelState";
import { useSetRecoilState } from "recoil";
import { ChannelFormInitialType } from "@/types/channel/channelTypes";
import Storage from "@/storage/storage";

const ChannelForm = () => {
  const [image, setImage] = useState<Blob>();
  const [selectedCity, setSelectedCity] = useState<string>("가평군");
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    `${process.env.PUBLIC_URL}/images/preview-form-img.png`
  );
  const setSidebarChannels = useSetRecoilState(sidebarChannelsState);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ChannelFormInitialType>({
    mode: "onChange",
    defaultValues: {
      title: "",
      locationDist: "경기도",
      memberNum: 2,
      spec: "",
      image: "",
    },
  });
  const selectedDist = watch("locationDist");

  const navigate = useNavigate();
  useEffect(() => {
    if (!Storage.getToken()) navigate("/", { replace: true });
    setSelectedCity(sortedChannelListData[selectedDist][0]);
  }, [selectedDist]);

  const distOptions = Object.keys(channelListData).sort(
    (a: string, b: string) => (a < b ? -1 : 1)
  );

  const sortedChannelListData = distOptions.reduce<{ [key: string]: string[] }>(
    (acc, cur: string) => {
      return {
        ...acc,
        [cur]: channelListData[cur].sort((a: string, b: string) =>
          a < b ? -1 : 1
        ),
      };
    },
    {}
  );

  const handleImageUploadClick = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const compress = await imageResize(file);
      setImage(compress);
      const preview = new FileReader();
      preview.readAsDataURL(compress);
      preview.onload = () => {
        setImagePreview(preview.result);
      };
    }
  };

  const hanldeSelecCityChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
      | string
  ) => {
    if (typeof e === "string") {
      setSelectedCity(e);
    } else {
      setSelectedCity(e.target.value);
    }
  };

  const handleChannelFormCreateClick = async (data: ChannelFormInitialType) => {
    const { title, locationDist, memberNum, spec } = data;
    const { datas } = await createChannelRequest("/api/channels", {
      title,
      locationDist,
      selectedCity,
      memberNum,
      spec,
      image,
    });
    if (datas) {
      setSidebarChannels((prev) => {
        return [
          ...prev,
          {
            _id: datas._id,
            title: title,
            img: datas.location,
            position: 0,
          },
        ];
      });
      navigate("/channels");
    }
  };

  return (
    <BaseChannelComponent>
      <ChannelContainer>
        <ChannelFormCard
          channelForm={register}
          distOptions={distOptions}
          channelListData={sortedChannelListData}
          selectedCity={selectedCity}
          selectedDist={selectedDist}
          imagePreview={imagePreview}
          errors={errors}
          onChannelImageUploadClickEvent={handleImageUploadClick}
          onChangeSelectChangeEvent={hanldeSelecCityChange}
          onChannelFormCreateClickEvent={handleSubmit(
            handleChannelFormCreateClick
          )}
        />
      </ChannelContainer>
    </BaseChannelComponent>
  );
};

const ChannelContainer = styled.div`
  width: 90%;

  background-color: ${GlobalTheme.colors.lightThreeGray};
  padding: 3rem;
`;

export default ChannelForm;
