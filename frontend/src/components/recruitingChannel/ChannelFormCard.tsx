import React from "react";
import { UseFormRegister, FieldErrorsImpl } from "react-hook-form";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import { ChannelFormInitialType } from "@/types/channel/channelTypes";
import BaseIntputContainer from "@/components/hoc/BaseInputContainer";
import BaseValidateTextContainer from "../hoc/BaseValidateTextContainer";

interface CardImageProp {
  backgroundImg?: string;
}

interface ChannelFormCardProps {
  channelForm: UseFormRegister<ChannelFormInitialType>;
  distOptions: Array<string>;
  channelListData: { [key: string]: Array<string> };
  selectedCity: string;
  selectedDist: string;
  imagePreview: string | ArrayBuffer | FileReader | null | undefined;
  errors: Partial<FieldErrorsImpl<ChannelFormInitialType>>;

  onChannelImageUploadClickEvent: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onChangeSelectChangeEvent: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
      | string
  ) => void;
  onChannelFormCreateClickEvent: (e: React.FormEvent) => void;
}

const ChannelFormCard = ({
  channelForm,
  distOptions,
  channelListData,
  selectedCity,
  selectedDist,
  imagePreview,
  errors,
  onChannelImageUploadClickEvent,
  onChangeSelectChangeEvent,
  onChannelFormCreateClickEvent,
}: ChannelFormCardProps) => {
  return (
    <ChannelFormWrapper>
      <ChannelHeaderWrapper>
        <ChannelTitle>CREATE CHANNEL</ChannelTitle>
        <ChannelButtonContainer>
          <ChannelButton type="submit" onClick={onChannelFormCreateClickEvent}>
            채널생성
          </ChannelButton>
          <ChannelImageLabel>Image upload</ChannelImageLabel>
          <ChannelImageUploadInput
            type="file"
            onChange={onChannelImageUploadClickEvent}
          />
        </ChannelButtonContainer>
      </ChannelHeaderWrapper>
      <ChannelWrapper>
        <ChannelInputWrapper>
          <ChannelLabel>Title</ChannelLabel>
          <BaseIntputContainer>
            <ChannelInput
              type="text"
              placeholder="채널 제목"
              {...channelForm("title", {
                required: "제목은 필수 입니다.",
                minLength: {
                  value: 3,
                  message: "제목을 3글자 이상 입력해 주세요.",
                },
                maxLength: {
                  value: 15,
                  message: "제목을 15글자 이하로 입력해 주세요.",
                },
              })}
            />
            {errors.title && errors.title.message && (
              <BaseValidateTextContainer>
                {errors.title.message}
              </BaseValidateTextContainer>
            )}
          </BaseIntputContainer>
          <ChannelLabel>Member count</ChannelLabel>
          <BaseIntputContainer>
            <ChannelInput
              type="number"
              {...channelForm("memberNum", {
                min: {
                  value: 2,
                  message: "인원은 최소 2명 이상입니다.",
                },
                max: {
                  value: 25,
                  message: "인원은 최대 25명 이하입니다.",
                },
                required: "인원은 최소 2명 이상입니다.",
              })}
            />
            {errors.memberNum && (
              <BaseValidateTextContainer>
                {errors.memberNum.message}
              </BaseValidateTextContainer>
            )}
          </BaseIntputContainer>
          <ChannelLabel>Location</ChannelLabel>
          <BaseIntputContainer>
            <ChannelSelector {...channelForm("locationDist")}>
              {distOptions.map((dist) => (
                <ChannelOption key={dist} value={dist}>
                  {dist}
                </ChannelOption>
              ))}
            </ChannelSelector>
            <ChannelSelector
              value={selectedCity}
              onChange={onChangeSelectChangeEvent}
            >
              {channelListData[selectedDist].map((city) => (
                <ChannelOption key={city} value={city}>
                  {city}
                </ChannelOption>
              ))}
            </ChannelSelector>
          </BaseIntputContainer>
        </ChannelInputWrapper>
        <ChannelImageBox backgroundImg={imagePreview as string} />
      </ChannelWrapper>
      <ChannelTextArea
        placeholder="채널 설명을 입력해 주세요."
        {...channelForm("spec", {
          minLength: {
            value: 2,
            message: "상세 설명을 입력해 주세요.",
          },
          required: "상세 설명을 최소 2글자 이상 작성해 주세요.",
        })}
      />
      {errors.spec && (
        <BaseValidateTextContainer>
          {errors.spec.message}
        </BaseValidateTextContainer>
      )}
    </ChannelFormWrapper>
  );
};

const ChannelFormWrapper = styled.form`
  width: 90%;

  margin: 0 auto;
  margin-top: 2rem;
  padding: 1.725rem;
  background-color: ${GlobalTheme.colors.white};
  border-radius: 8px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const ChannelHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ChannelTitle = styled.p`
  font-size: ${GlobalTheme.fontSize.moreBig};
  font-family: ${GlobalTheme.fontStyle.bold};
  color: ${GlobalTheme.colors.black};
  padding-top: 2rem;
  padding-bottom: 2rem;
`;

const ChannelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const ChannelInputWrapper = styled.div`
  width: 50%;
`;

const ChannelImageUploadInput = styled.input`
  display: inline-block;
  padding: 1rem;
`;

const ChannelImageLabel = styled.label`
  display: inline-block;
`;

const ChannelLabel = styled.label`
  display: block;
  width: auto;
  padding-bottom: 1.25rem;
`;

const ChannelInput = styled.input`
  padding: ${GlobalTheme.input.padding};
  border-radius: ${GlobalTheme.input.borderRadius};
  border: ${GlobalTheme.input.border};
  outline: ${GlobalTheme.input.outline};
  width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const ChannelSelector = styled.select`
  cursor: pointer;
  margin-right: 1rem;
  padding: ${GlobalTheme.input.padding};
  border-radius: ${GlobalTheme.input.borderRadius};
  border: ${GlobalTheme.input.border};
  outline: ${GlobalTheme.input.outline};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const ChannelOption = styled.option`
  padding: 0.875rem;
`;

const ChannelImageBox = styled.div<CardImageProp>`
  background-image: url(${(props) => props.backgroundImg});
  background-size: cover;
  background-position: center;
  cursor: pointer;
  display: block;
  width: 45%;
  height: 25rem;
  text-align: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const ChannelTextArea = styled.textarea`
  width: 98%;
  height: 25rem;
  padding: ${GlobalTheme.input.padding};
  border-radius: ${GlobalTheme.input.borderRadius};
  border: ${GlobalTheme.input.border};
  outline: ${GlobalTheme.input.outline};
  font-size: ${GlobalTheme.fontSize.littleBig};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const ChannelButtonContainer = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "eBold";
`;

const ChannelButton = styled.button`
  ${GlobalTheme.buttons}
  width: 100%;
  line-height: 4rem;
  font-size: ${GlobalTheme.fontSize.littleBig};
  color: ${GlobalTheme.colors.white};
  background-color: ${GlobalTheme.colors.theme};
  padding: 0.975rem;
  text-align: center;
  cursor: pointer;
`;

export default ChannelFormCard;
